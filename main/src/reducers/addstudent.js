import { ADD_STUDENT, CLEAR_STUDENT } from '../actions/index'

//const INITIAL_STATE = { all: [], student: null };

// state argument is not application state, only the state 
// this reducer is responsible for
export default function (state = false, action) {
    switch (action.type) {
        case ADD_STUDENT:
            return action.payload
        case CLEAR_STUDENT:
            return action.payload
        default:
            return state;
    }

}
