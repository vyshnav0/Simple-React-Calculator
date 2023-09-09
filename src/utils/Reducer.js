import { ACTIONS } from "../App";
import evaluate from "./CalculatorFunction";

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
      if (state.curOperand == null && state.prevOperand == null) {
        return state   // if there is no operand selected then we cant select an operation
      }
      if (state.prevOperand == null) {
        return {   // if we enter an operator after an operand the current operand should be displayed on the prev output screen
          ...state,
          operation: payload.operation,
          prevOperand: state.curOperand,
          curOperand: null
        }
      }
      if (state.curOperand == null) {
        return {     // if we enter an operator after another operator we just need to overwrite the previos operator (2 + then * should be 2 *)
          ...state,
          operation: payload.operation
        }
      }
      return {
        ...state,
        operation: payload.operation,
        prevOperand: evaluate(state), //finds the results of the current state (in case we type 2+2 and another operation * instead of =) 
        curOperand: null
      }

    case ACTIONS.EQUALS:
      if (state.curOperand == null || state.operation == null || state.prevOperand == null) {
        return state;     // either no operand or operators then do nothing but return current state
      }
      return{     // normal '=' use, find the result and display in current make others null
        ...state,
        prevOperand: null,
        operation: null,
        curOperand: evaluate(state)
      }

    default:
      return state;
  }
}

export default reducer
