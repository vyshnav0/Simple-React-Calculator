import { ACTIONS } from "../App";
import evaluate from "./CalculatorFunction";

const initialState = {
  curOperand: 0,
  prevOperand: null,
  operation: '',
  overwrite: false
};
function reducer(state, { type, payload }) {

  switch (type) {
    case ACTIONS.ENTER_DIGIT:
      console.log("enter digit");
      if (state.overwrite) {   // if we need to overwrite the current result to the operand we are typing now
        return{
          ...state,
          curOperand: payload.digit,
          overwrite: false
        }
      }
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

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {   // after we perform a normal calculation (i.e press '=' after 2+3, we get results on current-output)
        return {
          ...state,
          curOperand: null,
          overwrite: false
        };
      }
      if (state.curOperand == null) {
        if (state.prevOperand != null) { 
          return{    // when (9 + ) and we press DEL the current operator should be  prev operand by removing operator
            ...state,
            curOperand: state.prevOperand,
            operation: null,
            prevOperand: null     // this one may cause some errors. keep an eye out
          }
        }
        return state;
      }
      if (state.curOperand.length === 1){  
        return{     // there is only one digit 
          ...state,
          curOperand: null
        }
      }
      return {
        ...state, 
        curOperand: state.curOperand.slice(0, -1)
      };
   
    case ACTIONS.CLEAR:
      return initialState;

    case ACTIONS.CHOOSE_OPERATION:
      console.log("choose operation");
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
      const computed = evaluate(state);
      return{     // normal '=' use, find the result and display in current make others null
        ...state,
        overwrite: true,    // we need to overwrite the current operaand when we type something instead of appending it at the end of the result
        prevOperand: null,
        operation: null,    
        curOperand: computed
      }


    default:
      return state;
  }
}

export default reducer
