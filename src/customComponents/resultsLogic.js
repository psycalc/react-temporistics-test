export function calculateResult(answers) {
  if (!answers) {
    console.error('Answers is undefined');
    return 0;
  }
    let result = 0;
    for (let i = 0; i < answers.length; i++) {
      result += answers[i].weight;
    }
    return result;
  }
  
  export function calculateTypesWeights(answers, typenames) {
    if (!answers) {
      console.error('Answers is undefined');
      return { typesWeights: [], total_weight: 0 };
    }
    let typesWeights = typenames.map(() => 0);
    let total_weight = 0;
    
    for (let i = 0; i < answers.length; i++) {
      let masks = answers[i].masks;
      let weight = answers[i].weight;
      let subResults = new Array(typenames.length).fill(0);
    
      for (let n = 0; n < masks.length; n++) {
        let types = mask_match(masks[n], typenames);
        for (let j = 0; j < types.length; j++) subResults[types[j]] = 1;
      }
    
      for (let k = 0; k < subResults.length; k++) {
        typesWeights[k] += subResults[k] * weight;
        if (subResults[k] === 1) {
          total_weight += weight;
        }
      }
    }
    
    return { typesWeights, total_weight };
  }
  
  
  function mask_match(mask, typenames) {
    let inverse = false;
  
    if (mask[0] === "!") {
      inverse = true;
      mask = mask.substr(1);
    }
  
    let res = [];
  
    for (let i = 0; i < typenames.length; i++) {
      let matched = true;
  
      for (let j = 0; j < mask.length && matched; j++)
        matched =
          matched && (mask[j] === typenames[i][j] || mask[j] === "*");
  
      if (matched !== inverse) res.push(i);
    }
  
    return res;
  }
  