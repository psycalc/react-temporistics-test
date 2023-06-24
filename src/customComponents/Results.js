import Center from "./Center";
import { typenames } from "./letterPositions";
import { useNavigate, useLocation } from "react-router-dom";
import { calculateResult, calculateTypesWeights } from "./resultsLogic";
import './Results.css';

function Results() {
    const location = useLocation();
    const answers = location.state?.answers;
    const navigate = useNavigate(); // define the navigate function using useNavigate

    // check if answers is null or undefined
    if (!answers) {
        return <div>Error: Answers not found.</div>;
    }



    // calculation of results
    let result = calculateResult(answers);

    // adding calculation logic
    const { typesWeights, total_weight } = calculateTypesWeights(
        answers,
        typenames
    );

    // sorting results
    let sorted_result = [];

    for (let i = 0; i < typesWeights.length; i++)
        sorted_result.push({ weight: typesWeights[i], name: typenames[i] });

    sorted_result.sort((a, b) => b.weight - a.weight);

    const handleMoreClick = item => {
        console.log(item); // log the item to ensure it's not undefined or null
        navigate("/description-page", { state: { selectedItem: item } });
    };

    // result display
    return (
        <Center>
            <div className="result">Test result: {result}</div>
            <div className="types">Types and their weights:</div>
            <ul className="list">
                {sorted_result.map((item, index) => (
                    item && <li key={index} className="list-item">
                        <span className="type-name">{item.name}:</span> 
                        <span className="type-weight">{item.weight}</span>
                        <span className="percentage">
                            {total_weight !== 0
                                ? `(${Math.round((item.weight / total_weight) * 100)}%)`
                                : ""}
                        </span>
                        <button onClick={() => handleMoreClick(item)} className="more-button">More</button>
                    </li>
                ))}
            </ul>
            <div className="predicted-type">
                Predicted type:{" "}
                <span className="predicted-type-name">{sorted_result[0].name}</span>
            </div>
            <div className="typenames">Typenames: {typenames.join(", ")}</div>
            <div className="typesweights">TypesWeights: {typesWeights.join(", ")}</div>
            <div className="total-weight">Total weight: {total_weight}</div>
            <div className="selected-options">
                Selected options:
                <ul className="options-list">
                    {answers.map((answer, index) => (
                        <li key={index} className="option-item">
                            {answer.choice} ({answer.masks.join(", ")}) - {answer.weight}
                        </li>
                    ))}
                    {console.log(answers)}
                </ul>
            </div>
        </Center>
    );
}

export default Results;
