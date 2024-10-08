import { DBConnection } from './module_bindings';
import { useState } from 'react';
import './App.css';
import { Identity } from '@clockworklabs/spacetimedb-sdk';

function App() {
  const [connection] = useState<DBConnection>(
    DBConnection.builder()
      .withUri('ws://localhost:3000')
      .withModuleName('game')
      .onDisconnect(() => {
        console.log('disconnected');
      })
      .onConnectError(() => {
        console.log('client_error');
      })
      .onConnect((_, identity, _token) => {
        console.log(
          'Connected to SpacetimeDB with identity:',
          identity.toHexString()
        );
      })
      .withCredentials([
        Identity.fromString(
          '93dda09db9a56d8fa6c024d843e805d8262191db3b4ba84c5efcd1ad451fed4e'
        ),
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJoZXhfaWRlbnRpdHkiOiI5M2RkYTA5ZGI5YTU2ZDhmYTZjMDI0ZDg0M2U4MDVkODI2MjE5MWRiM2I0YmE4NGM1ZWZjZDFhZDQ1MWZlZDRlIiwiaWF0IjoxNzI4MzY1Mzk3LCJleHAiOm51bGx9.G4_fYi_br_AV8tphopfsRxgZbdy0lLbnDl-yW8IelgFDXsg3ipGbcukniiBuZHPf_8ebAuRG2O_ZfL5w-fWN_A',
      ])
      .build()
  );

  return (
    <div className="App">
      <h1>Typescript SDK Test!</h1>
      <p>{connection.identity?.toHexString()}</p>
    </div>
  );
}

export default App;
