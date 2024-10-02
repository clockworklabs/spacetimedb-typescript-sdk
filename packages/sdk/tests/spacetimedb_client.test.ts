import { beforeEach, describe, expect, test } from 'vitest';
import { Address } from '../src/address';
import { AlgebraicType } from '../src/algebraic_type';
import { parseValue } from '../src/algebraic_value';
import * as ws from '../src/client_api';
import { Identity } from '../src/identity';
import { ReducerEvent } from '../src/db_connection_impl';
import WebsocketTestAdapter from '../src/websocket_test_adapter';
import CreatePlayerReducer from './test-app/module_bindings/create_player_reducer';
import BinaryWriter from '../src/binary_writer';
import { Event } from '../src/event';
import {
  User,
  Player,
  Point,
  DBConnection,
  CreatePlayer,
} from '@clockworklabs/test-app/src/module_bindings';

beforeEach(() => {
  (CreatePlayerReducer as any).reducer = undefined;
  (Player as any).db = undefined;
  (User as any).db = undefined;
});

function encodePlayer(value: Player): Uint8Array {
  const writer = new BinaryWriter(1024);
  Player.serialize(writer, value);
  return writer.getBuffer();
}

function encodeUser(value: User): Uint8Array {
  const writer = new BinaryWriter(1024);
  User.serialize(writer, value);
  return writer.getBuffer();
}

function encodeCreatePlayerArgs(name: string, location: Point): Uint8Array {
  const writer = new BinaryWriter(1024);
  AlgebraicType.createStringType().serialize(writer, name);
  Point.serialize(writer, location);
  return writer.getBuffer();
}

describe('SpacetimeDBClient', () => {
  test('auto subscribe on connect', async () => {
    const wsAdapter = new WebsocketTestAdapter();
    const client = DBConnection.builder()
      .withUri('ws://127.0.0.1:1234')
      .withModuleName('db')
      .withWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter))
      .build();

    client.subscribe('SELECT * FROM Player');
    client.subscribe(['SELECT * FROM Position', 'SELECT * FROM Coin']);

    wsAdapter.acceptConnection();

    const messages = wsAdapter.messageQueue;
    expect(messages.length).toBe(1);

    const message: ws.ClientMessage = parseValue(ws.ClientMessage, messages[0]);
    expect(message).toHaveProperty('tag', 'Subscribe');

    const subscribeMessage = message.value as ws.Subscribe;

    const expected = [
      'SELECT * FROM Player',
      'SELECT * FROM Position',
      'SELECT * FROM Coin',
    ];
    expect(subscribeMessage.queryStrings).toEqual(expected);
  });

  test('call onConnect callback after getting an identity', async () => {
    const wsAdapter = new WebsocketTestAdapter();
    const client = DBConnection.builder()
      .withUri('ws://127.0.0.1:1234')
      .withModuleName('db')
      .withWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter))
      .build();

    let called = false;
    client.on('connect', () => {
      called = true;
    });

    wsAdapter.acceptConnection();

    const tokenMessage = ws.ServerMessage.IdentityToken({
      identity: new Identity('an-identity'),
      token: 'a-token',
      address: Address.random(),
    });
    wsAdapter.sendToClient(tokenMessage);

    expect(called).toBeTruthy();
  });

  test('it calls onInsert callback when a record is added with a subscription update and then with a transaction update', async () => {
    const wsAdapter = new WebsocketTestAdapter();
    const client = DBConnection.builder()
      .withUri('ws://127.0.0.1:1234')
      .withModuleName('db')
      .withWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter))
      .build();

    let called = false;
    client.on('connect', () => {
      called = true;
    });

    wsAdapter.acceptConnection();

    const tokenMessage = ws.ServerMessage.IdentityToken({
      identity: new Identity('an-identity'),
      token: 'a-token',
      address: Address.random(),
    });
    wsAdapter.sendToClient(tokenMessage);

    const inserts: {
      reducerEvent: Event<{ name: 'CreatePlayer'; args: CreatePlayer }>;
      player: Player;
    }[] = [];
    client.db.player.onInsert((ctx, player) => {
      const reducerEvent = ctx.event;
      inserts.push({ reducerEvent, player });
    });

    let reducerCallbackLog: {
      reducerEvent: Event<{ name: 'CreatePlayer'; args: CreatePlayer }>;
      reducerArgs: any[];
    }[] = [];
    client.reducers.onCreatePlayer((ctx, name: string, location: Point) => {
      const reducerEvent = ctx.event;
      reducerCallbackLog.push({
        reducerEvent,
        reducerArgs: [name, location],
      });
    });

    const subscriptionMessage: ws.ServerMessage =
      ws.ServerMessage.InitialSubscription({
        databaseUpdate: {
          tables: [
            {
              tableId: 35,
              tableName: 'Player',
              numRows: BigInt(1),
              updates: [
                ws.CompressableQueryUpdate.Uncompressed({
                  deletes: {
                    sizeHint: ws.RowSizeHint.FixedSize(0), // not used
                    rowsData: new Uint8Array(),
                  },
                  inserts: {
                    sizeHint: ws.RowSizeHint.FixedSize(0), // not used
                    rowsData: encodePlayer({
                      ownerId: 'player-1',
                      name: 'drogus',
                      location: { x: 0, y: 0 },
                    }),
                  },
                }),
              ],
            },
          ],
        },
        requestId: 0,
        totalHostExecutionDurationMicros: BigInt(0),
      });

    wsAdapter.sendToClient(subscriptionMessage);

    expect(inserts).toHaveLength(1);
    expect(inserts[0].player.ownerId).toBe('player-1');
    expect(inserts[0].reducerEvent).toBe(undefined);

    const transactionUpdate = ws.ServerMessage.TransactionUpdate({
      status: ws.UpdateStatus.Committed({
        databaseUpdate: {
          tables: [
            {
              tableId: 35,
              tableName: 'Player',
              numRows: BigInt(2),
              updates: [
                ws.CompressableQueryUpdate.Uncompressed({
                  deletes: {
                    sizeHint: ws.RowSizeHint.FixedSize(0), // not used
                    rowsData: new Uint8Array(),
                  },
                  inserts: {
                    sizeHint: ws.RowSizeHint.FixedSize(0), // not used
                    rowsData: encodePlayer({
                      ownerId: 'player-2',
                      name: 'drogus',
                      location: { x: 2, y: 3 },
                    }),
                  },
                }),
              ],
            },
          ],
        },
      }),
      timestamp: new ws.Timestamp(BigInt(1681391805281203)),
      callerIdentity: new Identity('00ff01'),
      callerAddress: Address.random(),
      reducerCall: new ws.ReducerCallInfo(
        'create_player',
        0,
        encodeCreatePlayerArgs('A Player', { x: 2, y: 3 }),
        0
      ),
      energyQuantaUsed: new ws.EnergyQuanta(BigInt(33841000)),
      hostExecutionDurationMicros: BigInt(1234567890),
    });
    wsAdapter.sendToClient(transactionUpdate);

    expect(inserts).toHaveLength(2);
    expect(inserts[1].player.ownerId).toBe('player-2');
    expect(inserts[1].reducerEvent?.reducerName).toBe('create_player');
    expect(inserts[1].reducerEvent?.status).toBe('committed');
    expect(inserts[1].reducerEvent?.message).toBe('');
    expect(inserts[1].reducerEvent?.callerIdentity).toEqual(
      Identity.fromString('00ff01')
    );
    expect(inserts[1].reducerEvent?.args).toEqual([
      'A Player',
      new Point(2, 3),
    ]);

    expect(reducerCallbackLog).toHaveLength(1);

    expect(reducerCallbackLog[0]['reducerEvent']['callerIdentity']).toEqual(
      Identity.fromString('00ff01')
    );
  });

  test('it calls onUpdate callback when a record is added with a subscription update and then with a transaction update', async () => {
    const client = new DBConnection('ws://127.0.0.1:1234', 'db', undefined);
    const wsAdapter = new WebsocketTestAdapter();
    client._setCreateWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter));

    let called = false;
    client.onConnect(() => {
      called = true;
    });

    await client.connect();
    wsAdapter.acceptConnection();

    const tokenMessage = ws.ServerMessage.IdentityToken(
      new ws.IdentityToken(
        new Identity('an-identity'),
        'a-token',
        Address.random()
      )
    );
    wsAdapter.sendToClient(tokenMessage);

    const updates: { oldPlayer: Player; newPlayer: Player }[] = [];
    Player.onUpdate((oldPlayer: Player, newPlayer: Player) => {
      updates.push({
        oldPlayer,
        newPlayer,
      });
    });

    const subscriptionMessage = ws.ServerMessage.InitialSubscription(
      new ws.InitialSubscription(
        new ws.DatabaseUpdate([
          new ws.TableUpdate(
            35,
            'Player',
            // FIXME: this test is evil: an initial subscription can never contain deletes or updates.
            [encodePlayer(new Player('player-1', 'drogus', new Point(0, 0)))],
            [encodePlayer(new Player('player-1', 'mr.drogus', new Point(0, 0)))]
          ),
        ]),
        0,
        BigInt(1234567890)
      )
    );
    wsAdapter.sendToClient(subscriptionMessage);

    expect(updates).toHaveLength(1);
    expect(updates[0]['oldPlayer'].name).toBe('drogus');
    expect(updates[0]['newPlayer'].name).toBe('mr.drogus');

    const transactionUpdate = ws.ServerMessage.TransactionUpdate(
      new ws.TransactionUpdate(
        ws.UpdateStatus.Committed(
          new ws.DatabaseUpdate([
            new ws.TableUpdate(
              35,
              'Player',
              [encodePlayer(new Player('player-2', 'Jaime', new Point(0, 0)))],
              [
                encodePlayer(
                  new Player('player-2', 'Kingslayer', new Point(0, 0))
                ),
              ]
            ),
          ])
        ),
        new ws.Timestamp(BigInt(1681391805281203)),
        new Identity('00ff01'),
        Address.random(),
        new ws.ReducerCallInfo(
          'create_player',
          0,
          encodeCreatePlayerArgs('A Player', new Point(2, 3)),
          0
        ),
        new ws.EnergyQuanta(BigInt(33841000)),
        BigInt(1234567890)
      )
    );
    wsAdapter.sendToClient(transactionUpdate);

    expect(updates).toHaveLength(2);
    expect(updates[1]['oldPlayer'].name).toBe('Jaime');
    expect(updates[1]['newPlayer'].name).toBe('Kingslayer');
  });

  test('a reducer callback should be called after the database callbacks', async () => {
    const client = new DBConnection('ws://127.0.0.1:1234', 'db', undefined);
    const wsAdapter = new WebsocketTestAdapter();
    client._setCreateWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter));

    await client.connect();
    wsAdapter.acceptConnection();

    let callbackLog: string[] = [];

    Player.onInsert(
      (player: Player, reducerEvent: ReducerEvent | undefined) => {
        callbackLog.push('Player');
      }
    );

    CreatePlayerReducer.on(() => {
      callbackLog.push('CreatePlayerReducer');
    });

    const transactionUpdate = ws.ServerMessage.TransactionUpdate(
      new ws.TransactionUpdate(
        ws.UpdateStatus.Committed(
          new ws.DatabaseUpdate([
            new ws.TableUpdate(
              35,
              'Player',
              [],
              [encodePlayer(new Player('player-2', 'foo', new Point(0, 0)))]
            ),
          ])
        ),
        new ws.Timestamp(BigInt(1681391805281203)),
        new Identity('00ff01'),
        Address.random(),
        new ws.ReducerCallInfo(
          'create_player',
          0,
          encodeCreatePlayerArgs('A Player', new Point(2, 3)),
          0
        ),
        new ws.EnergyQuanta(BigInt(33841000)),
        BigInt(1234567890)
      )
    );
    wsAdapter.sendToClient(transactionUpdate);

    expect(callbackLog).toEqual(['Player', 'CreatePlayerReducer']);
  });

  test('it calls onUpdate callback when a record is added with a subscription update and then with a transaction update when the PK is of type Identity', async () => {
    const client = new DBConnection('ws://127.0.0.1:1234', 'db', undefined);
    const wsAdapter = new WebsocketTestAdapter();
    client._setCreateWSFn(wsAdapter.createWebSocketFn.bind(wsAdapter));

    let called = false;
    client.onConnect(() => {
      called = true;
    });

    await client.connect();
    wsAdapter.acceptConnection();

    const tokenMessage = ws.ServerMessage.IdentityToken(
      new ws.IdentityToken(
        new Identity('an-identity'),
        'a-token',
        Address.random()
      )
    );
    wsAdapter.sendToClient(tokenMessage);

    const updates: { oldUser: User; newUser: User }[] = [];
    User.onUpdate((oldUser: User, newUser: User) => {
      updates.push({
        oldUser,
        newUser,
      });
    });

    const subscriptionMessage = ws.ServerMessage.InitialSubscription(
      new ws.InitialSubscription(
        new ws.DatabaseUpdate([
          new ws.TableUpdate(
            35,
            'User',
            // pgoldman 2024-06-25: This is weird, `InitialSubscription`s aren't supposed to contain deletes or updates.
            [
              encodeUser(
                new User(
                  new Identity(
                    '41db74c20cdda916dd2637e5a11b9f31eb1672249aa7172f7e22b4043a6a9008'
                  ),
                  'drogus'
                )
              ),
            ],
            [
              encodeUser(
                new User(
                  new Identity(
                    '41db74c20cdda916dd2637e5a11b9f31eb1672249aa7172f7e22b4043a6a9008'
                  ),
                  'mr.drogus'
                )
              ),
            ]
          ),
        ]),
        0,
        BigInt(1234567890)
      )
    );

    wsAdapter.sendToClient(subscriptionMessage);

    expect(updates).toHaveLength(1);
    expect(updates[0]['oldUser'].username).toBe('drogus');
    expect(updates[0]['newUser'].username).toBe('mr.drogus');

    const transactionUpdate = ws.ServerMessage.TransactionUpdate(
      new ws.TransactionUpdate(
        ws.UpdateStatus.Committed(
          new ws.DatabaseUpdate([
            new ws.TableUpdate(
              35,
              'User',
              [
                encodeUser(
                  new User(
                    new Identity(
                      '11db74c20cdda916dd2637e5a11b9f31eb1672249aa7172f7e22b4043a6a9008'
                    ),
                    'jaime'
                  )
                ),
              ],
              [
                encodeUser(
                  new User(
                    new Identity(
                      '11db74c20cdda916dd2637e5a11b9f31eb1672249aa7172f7e22b4043a6a9008'
                    ),
                    'kingslayer'
                  )
                ),
              ]
            ),
          ])
        ),
        new ws.Timestamp(BigInt(1681391805281203)),
        new Identity('00ff01'),
        Address.random(),
        new ws.ReducerCallInfo(
          'create_player',
          0,
          encodeCreatePlayerArgs('A Player', new Point(2, 3)),
          0
        ),
        new ws.EnergyQuanta(BigInt(33841000)),
        BigInt(1234567890)
      )
    );

    wsAdapter.sendToClient(transactionUpdate);

    expect(updates).toHaveLength(2);
    expect(updates[1]['oldUser'].username).toBe('jaime');
    expect(updates[1]['newUser'].username).toBe('kingslayer');
  });

  test('Filtering works', async () => {
    const client = new DBConnection('ws://127.0.0.1:1234', 'db', undefined);
    const db = client.db;
    const user1 = new User(new Identity('bobs-idenitty'), 'bob');
    const user2 = new User(new Identity('sallys-identity'), 'sally');
    const users = db.getTable('User').instances;
    users.set('abc123', user1);
    users.set('def456', user2);

    const filteredUsers = User.with(client).filterByUsername('sally');
    expect(filteredUsers).toHaveLength(1);
    expect(filteredUsers[0].username).toBe('sally');
  });
});
