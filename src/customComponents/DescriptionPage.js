import React from 'react';
import { letterPositions } from './letterPositions';

function DescriptionPage({ location }) {
  const selectedItem = location?.state?.selectedItem;

  return (
    <div>
      <h1>Description Page</h1>
      <h2>{selectedItem.name}: {selectedItem.weight}</h2>
      <ul>
        {selectedItem.name.split('').map((letter, position) => {
          const letterPosition = letterPositions.find(lp => lp.letter === letter && lp.position === position + 1);
          return <li key={position}>{letterPosition.description}</li>;
        })}
      </ul>
    </div>
  );
}

export default DescriptionPage;
