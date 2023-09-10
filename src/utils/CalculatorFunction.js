    
function evaluate({ curOperand, prevOperand, operation }) {
    const prev = parseFloat(prevOperand);
    const current = parseFloat(curOperand);
  
    if (isNaN(current) || isNaN(prev)) {
      console.log("not a number");
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
