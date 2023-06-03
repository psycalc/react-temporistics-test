import React from 'react';
import { letterPositions } from './letterPositions';
import { useLocation } from 'react-router-dom';

function DescriptionPage() {
    const location = useLocation();
    console.log(location.state); // log the state to check what's being received
    const selectedItem = location?.state?.selectedItem;

    if (!selectedItem) {
        return <div>Selected item not found</div>;
    }

    return (
        <div>
            <h1>Description Page</h1>
            <h2>
                {selectedItem.name}: {selectedItem.weight}
            </h2>
            <ul>
                {selectedItem.name.split("").map((letter, position) => {
                    const letterPosition = letterPositions.find(
                        (lp) => lp.letter === letter && lp.position === position + 1
                    );
                    return <li key={position}>{letterPosition ? letterPosition.description : ''}</li>;
                })}
            </ul>
        </div>
    );
}

export default DescriptionPage;
