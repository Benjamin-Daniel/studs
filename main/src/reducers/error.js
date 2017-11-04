import { SET_ERROR, CLEAR_ERROR } from '../actions/index'

//const INITIAL_STATE = { all: [], student: null };

// state argument is not application state, only the state 
// this reducer is responsible for
export default function (state = null, action) {
    switch (action.type) {
        case SET_ERROR:
            return action.payload
        case CLEAR_ERROR:
            return action.payload
        default:
            return state;
    }

}
