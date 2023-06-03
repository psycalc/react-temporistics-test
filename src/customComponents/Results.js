import Center from "./Center";
import { letterPositions, typenames } from "./letterPositions";
import { useNavigate } from "react-router-dom";
import { calculateResult, calculateTypesWeights } from "./resultsLogic";

function Results({ answers }) {

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

  const navigate = useNavigate();

  const handleMoreClick = item => {
    console.log(item); // log the item to ensure it's not undefined or null
    navigate("/description-page", { state: { selectedItem: item } });
  };

  // result display
  return (
    <Center>
      <div>Test result: {result}</div>
      <div>Types and their weights:</div>
      <ul>
        {sorted_result.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
            {item.name}: {item.weight}
            <span style={{ fontSize: "80%", marginLeft: "10px" }}>
              {total_weight !== 0
                ? `(${Math.round((item.weight / total_weight) * 100)}%)`
                : ""}
            </span>
            <button onClick={() => handleMoreClick(item)} style={{ marginLeft: "10px" }}>More</button>
          </li>
        ))}
      </ul>
      <div>
        Predicted type:{" "}
        <span style={{ fontWeight: "bold" }}>{sorted_result[0].name}</span>
      </div>
      <div>Typenames: {typenames.join(", ")}</div>
      <div>TypesWeights: {typesWeights.join(", ")}</div>
      <div>Total weight: {total_weight}</div>
      <div>
        Selected options:
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
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
