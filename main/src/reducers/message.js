import { SET_MESSAGE } from '../actions/index'

//const INITIAL_STATE = { all: [], student: null };

// state argument is not application state, only the state 
// this reducer is responsible for
export default function (state = null, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return action.payload
        default:
            return state;
    }

}
