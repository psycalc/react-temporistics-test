import Center from "./Center";

function Results({ answers }) {
  // розрахунок результатів
  let result = 0;
  for (let i = 0; i < answers.length; i++) {
    result += answers[i].weight;
  }

  // додавання логіки розрахунку результатів
  let typenames = [
    "ПНБВ",
    "ПНВБ",
    "ПВНБ",
    "ПВБН",
    "ПБВН",
    "ПБНВ",
    "НПБВ",
    "НПВБ",
    "НВПБ",
    "НВБП",
    "НБПВ",
    "НБВП",
    "БПНВ",
    "БПВН",
    "БВНП",
    "БВПН",
    "БНВП",
    "БНПВ",
    "ВПНБ",
    "ВПБН",
    "ВНПБ",
    "ВНБП",
    "ВБПН",
    "ВБНП"
  ];
  let typesWeights = new Array(typenames.length).fill(0);

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

  // виведення результату
  return (
    <Center>
      <div>Результат тесту: {result}</div>
      <div>Типи та їх ваги:</div>
      <ul>
        {sorted_result.map((item, index) => (
          <li key={index}>
            {item.name}: {item.weight}
          </li>
        ))}
      </ul>
      <div>
        Передбачуваний тип:{" "}
        <span style={{ fontWeight: "bold" }}>{sorted_result[0].name}</span>
      </div>
      <div style={{ fontSize: "80%" }}>
        Набрана кількість балів за типами: (чим більше значення, тим більше шансів,
        що тип виявиться правильним):
        <ul style={{ listStyle: "none" }}>
          {sorted_result.map((item, index) => (
            <li key={index}>
              Тип {item.name} —{" "}
              {Math.round(item.weight * 100) / 100}
            </li>
          ))}
        </ul>
      </div>
    </Center>
  );
}

export default Results;
