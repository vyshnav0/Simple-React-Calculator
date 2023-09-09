    
function evaluate({ curOperand, prevOperand, operation }) {
    const prev = parseFloat(prevOperand);
    const current = parseFloat(curOperand);
  
    if (isNaN(current) || isNaN(prev)) {
      return "";
    }
    let result = "";
    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        break;
    }
    return result;
}

export default evaluate
