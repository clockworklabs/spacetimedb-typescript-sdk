import { DBConnection } from './module_bindings';
import { useEffect, useState } from 'react';
import './App.css';
import { Identity } from '@clockworklabs/spacetimedb-sdk';

function App() {
  const [connection] = useState(() =>
    DBConnection.builder()
      .withUri('ws://localhost:3000')
      .withModuleName('game')
      .onDisconnect(() => {
        console.log('disconnected');
      })
      .onConnectError(() => {
        console.log('client_error');
      })
      .onConnect((conn, identity, _token) => {
        console.log(
          'Connected to SpacetimeDB with identity:',
          identity.toHexString()
        );

        conn.subscriptionBuilder().subscribe(['SELECT * FROM player']);
      })
      .withCredentials([
        Identity.fromString(
          'c200c4018ee1d21bb54b0379bedb68643ca1dd209710e504fac2a41d43567fb2'
        ),
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJoZXhfaWRlbnRpdHkiOiJjMjAwYzQwMThlZTFkMjFiYjU0YjAzNzliZWRiNjg2NDNjYTFkZDIwOTcxMGU1MDRmYWMyYTQxZDQzNTY3ZmIyIiwic3ViIjoiYjNhZWRmNDgtZDExNC00MmVjLWI0Y2EtNmY5MjAwNjk2OGJmIiwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjpbInNwYWNldGltZWRiIl0sImlhdCI6MTcyOTYyMTI2NiwiZXhwIjpudWxsfQ.TIJGisLeX3SuN8_9horfk2NifEGjCutq4wh7Fm5Qfp1-vhpKWmFCtAY0MRuYdalQtaWXT0bQ2seHlXA4PkOGbg',
      ])
      .build()
  );

  useEffect(() => {
    connection.db.player.onInsert(player => {
      console.log(player);
    });

    setTimeout(() => {
      console.log(Array.from(connection.db.player.iter()));
    }, 5000);
  }, [connection]);

  return (
    <div className="App">
      <h1>Typescript SDK Test!</h1>
      <p>{connection.identity?.toHexString()}</p>

      <button
        onClick={() =>
          connection.reducers.createPlayer('Hello', { x: 10, y: 40 })
        }
      >
        Update
      </button>
    </div>
  );
}

export default App;
