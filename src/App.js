import { useReducer } from "react"
import DigitButtons from "./DigitButtons";
import OperationsButtons from "./OperationsButtons";
import "./style.css"

export const ACTIONS = {
  ENTER_DIGIT: 'enter',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete',
  CHOOSE_OPERATION: 'chooseOperation',
  EVALUATE: 'evaluate'
};

function reducer(state, { type, payload }) {

  switch (type) {
    case ACTIONS.ENTER_DIGIT:
      if (payload.digit === '0' && state.curOperand === '0') {
        return state;  // if the current operand and the entrerd operand is 0 then we dont need to display 00 just 0 will do
      }
      if (payload.digit === '.' && state.curOperand.includes('.')) {
        return state; // no need for more than one . in a number
      }
      return {
        ...state,
        curOperand: `${state.curOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.curOperand === undefined && state.prevOperand === undefined) {
        return state   // if there is no operand selected then we cant select an operation
      }
      if (state.prevOperand === undefined) {
        return{
          ...state,
          operation: payload.operation,
          prevOperand: state.curOperand,
          curOperand: null
        }
      }
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

        <button className="purple-text spans" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button className="purple-text">DEL</button>
        <OperationsButtons operation="÷" dispatch={dispatch} myClass="purple-button"/>
        <DigitButtons digit="7" dispatch={dispatch} />
        <DigitButtons digit="8" dispatch={dispatch} />
        <DigitButtons digit="9" dispatch={dispatch} />
        <OperationsButtons operation="×" dispatch={dispatch} myClass="purple-button"/>
        <DigitButtons digit="4" dispatch={dispatch} />
        <DigitButtons digit="5" dispatch={dispatch} />
        <DigitButtons digit="6" dispatch={dispatch} />
        <OperationsButtons operation="-" dispatch={dispatch} myClass="purple-button"/>
        <DigitButtons digit="1" dispatch={dispatch} />
        <DigitButtons digit="2" dispatch={dispatch} />
        <DigitButtons digit="3" dispatch={dispatch} />
        <OperationsButtons operation="+" dispatch={dispatch} myClass="purple-button"/>
        <DigitButtons digit="." dispatch={dispatch} />
        <DigitButtons digit="0" dispatch={dispatch} />
        <button className="purple-button spans">=</button>
      </div>
    </>
  );
}

export default App;
