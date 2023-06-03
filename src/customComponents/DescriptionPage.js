import React from 'react';
import { letterPositions } from './letterPositions';

function DescriptionPage({ location }) {
  const sortedResult = location?.state?.sortedResult;

  return (
    <div>
      <h1>Description Page</h1>
      <ul>
        {sortedResult?.map((item, index) => (
          <li key={index}>
            {item.name}: {item.weight}
            <ul>
              {item.name.split('').map((letter, position) => {
                const letterPosition = letterPositions.find(lp => lp.letter === letter && lp.position === position + 1);
                return <li key={position}>{letterPosition.description}</li>;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DescriptionPage;
