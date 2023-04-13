import { SpacetimeDBClient } from '../src/spacetimedb';
import WebsocketTestAdapter from '../src/websocket_test_adapter';

describe('SpacetimeDBClient', () => {
  test('auto subscribe on connect', async () => {
    const client = new SpacetimeDBClient("ws://127.0.0.1:1234", "db");
    const wsAdapter = new WebsocketTestAdapter();
    client._setCreateWSFn((_url: string, _headers: {[key: string]: string}, _protocol: string) => {
      return wsAdapter;
    });

    client.subscribe("SELECT * FROM Player");
    client.subscribe(["SELECT * FROM Position", "SELECT * FROM Coin"]);

    client.connect();

    wsAdapter.acceptConnection();

    const messages = wsAdapter.messageQueue;
    expect(messages.length).toBe(1);

    const message: object = JSON.parse(messages[0]);
    expect(message).toHaveProperty('subscribe');

    const expected = ["SELECT * FROM Player","SELECT * FROM Position","SELECT * FROM Coin"];
    expect(message['subscribe']['query_strings']).toEqual(expected);
  });

  test('call onConnect callback after getting an identity', async () => {
    const client = new SpacetimeDBClient("ws://127.0.0.1:1234", "db");
    const wsAdapter = new WebsocketTestAdapter();
    client._setCreateWSFn((_url: string, _headers: {[key: string]: string}, _protocol: string) => {
      return wsAdapter;
    });

    let called = false;
    client.onConnect(() => { called = true });

    client.connect();

    wsAdapter.acceptConnection();
    const tokenMessage = {
      data: {
        IdentityToken: {
          identity:"an-identity",
          token:"a-token"
        }
      }
    };
    wsAdapter.sendToClient(tokenMessage);

    expect(called).toBeTruthy();
  });

});
