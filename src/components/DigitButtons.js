import React from 'react'
import "../style.css"
import { ACTIONS } from '../App'

export default function DigitButtons({ dispatch, digit }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ENTER_DIGIT, payload: { digit } })} >
            {digit}
        </button>
    )
}
