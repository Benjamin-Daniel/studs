import { DELETE_SELECTED, SELECTED_POST } from '../actions/index'

//const INITIAL_STATE = { all: [], student: null };

// state argument is not application state, only the state 
// this reducer is responsible for
export default function (state = null, action) {
	switch (action.type) {
		case SELECTED_POST:
			return action.payload
		case DELETE_SELECTED:
			return action.payload;
		default:
			return state;
	}

}
