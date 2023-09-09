import React from 'react'
import "./style.css"
import { ACTIONS } from './App'

export default function OperationsButtons({ dispatch, operation, myClass }) {
    return (
        <button onClick={() => dispatch({
             type: ACTIONS.CHOOSE_OPERATION,
             payload: { operation }
        })} className= { myClass } >
            {operation}
        </button>
    )
}
