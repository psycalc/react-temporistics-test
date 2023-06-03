import React from 'react';
import { letterPositions } from './letterPositions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function DescriptionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state); // log the state to check what's being received
    const selectedItem = location?.state?.selectedItem;

    const goBack = () => {
        navigate('/'); // navigates back to the main page
    };

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
            <Button onClick={goBack}>Back to Main Page</Button>
        </div>
    );
}

export default DescriptionPage;
