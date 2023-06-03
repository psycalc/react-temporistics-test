import Center from "./Center";
import { letterPositions, typenames } from "./letterPositions";
import { useNavigate } from 'react-router-dom';

function Results({ answers }) {
  // розрахунок результатів
  let result = 0;
  for (let i = 0; i < answers.length; i++) {
    result += answers[i].weight;
  }

  // додавання логіки розрахунку результатів

  let typesWeights = typenames.map(() => 0);
  let total_weight = 0;

  for (let i = 0; i < answers.length; i++) {
    let masks = answers[i].masks;
    let weight = answers[i].weight;
    let subResults = new Array(typenames.length).fill(0);

    for (let n = 0; n < masks.length; n++) {
      let types = mask_match(masks[n]);
      for (let j = 0; j < types.length; j++) subResults[types[j]] = 1;
    }

    for (let k = 0; k < subResults.length; k++) {
      typesWeights[k] += subResults[k] * weight;
      if (subResults[k] === 1) {
        total_weight += weight;
      }
    }
  }

  function mask_match(mask) {
    let inverse = false;

    if (mask[0] === "!") {
      inverse = true;
      mask = mask.substr(1);
    }

    let res = [];

    for (let i = 0; i < typenames.length; i++) {
      let matched = true;

      for (let j = 0; j < mask.length && matched; j++)
        matched = matched && (mask[j] === typenames[i][j] || mask[j] === "*");

      if (matched !== inverse) res.push(i);
    }

    return res;
  }

  // сортування результатів
  let sorted_result = [];

  for (let i = 0; i < typesWeights.length; i++)
    sorted_result.push({ weight: typesWeights[i], name: typenames[i] });

  sorted_result.sort((a, b) => b.weight - a.weight);

  const navigate = useNavigate();

  const handleMoreClick = (item) => {
    navigate('/description-page', { state: { selectedItem: item } });
  };

  // виведення результату
  return (
    <Center>
      <div>Результат тесту: {result}</div>
      <div>Типи та їх ваги:</div>
      <ul>
        {sorted_result.map((item, index) => (
          <li key={index}>
            {item.name}: {item.weight}
            <span style={{ fontSize: "80%", marginLeft: "10px" }}>
              {total_weight !== 0 ? `(${Math.round((item.weight / total_weight) * 100)}%)` : ''}
            </span>
            <button onClick={() => handleMoreClick(item)}>More</button>
          </li>
        ))}
      </ul>
      <div>
        Передбачуваний тип:{" "}
        <span style={{ fontWeight: "bold" }}>{sorted_result[0].name}</span>
      </div>
      <div>
        Typenames: {typenames.join(", ")}
      </div>
      <div>
        TypesWeights: {typesWeights.join(", ")}
      </div>
      <div>
        Total weight: {total_weight}
      </div>
      <div>
        Вибрані варіанти:
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