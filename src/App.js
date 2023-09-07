import { useReducer } from "react"
import DigitButtons from "./DigitButtons";
import "./style.css"

export const ACTIONS = {
  ENTER_DIGIT: 'enter',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete',
  CHOOSE_OPERATION: 'chooseOperation',
  EVALUATE: 'evaluate'
};  

function reducer(state, { type, payload }){
  switch (type) {
    case ACTIONS.ENTER_DIGIT:
      return {
         ...state,
         curOperand: `${state.curOperand || ""}${payload.digit}`,
      }
    default:
      return state;
  }
}
function App() {
  // state = {currentop, prevop and operation}
  const [{ curOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <>
      <div className="calc-text">History</div>
      <div className="calculator-grid">  {/*  the outermost  */}
        <div className="output-screen">  {/* the display screen */}
          <div className="prev-operand">{prevOperand} {operation}</div>  {/* the prev output that is gets pushed up when we enter another operand */}
          <div className="curr-operand"> {curOperand} </div>  {/* the operand we enter after prev-operand */}
        </div>

        <button className="purple-text spans">AC</button>
        <button className="purple-text">DEL</button>
        <button className="purple-button" >÷</button>
        <DigitButtons digit= "7" dispatch={dispatch} />
        <DigitButtons digit= "8" dispatch={dispatch} />
        <DigitButtons digit= "9" dispatch={dispatch} />
        <button className="purple-button">×</button>
        <DigitButtons digit= "4" dispatch={dispatch} />
        <DigitButtons digit= "5" dispatch={dispatch} />
        <DigitButtons digit= "6" dispatch={dispatch} />
        <button className="purple-button">-</button>
        <DigitButtons digit= "1" dispatch={dispatch} />
        <DigitButtons digit= "2" dispatch={dispatch} />
        <DigitButtons digit= "3" dispatch={dispatch} />
        <button className="purple-button">+</button>
        <DigitButtons digit= "." dispatch={dispatch} />
        <DigitButtons digit= "0" dispatch={dispatch} />
        <button className="purple-button spans">=</button>
      </div>
    </>
  );
}

export default App;
