import { combineReducers } from 'redux';
import StudentReducer from './reducer_students';
import { reducer as formReducer } from 'redux-form';
import ActiveStudent from './activeStudent';
import AddStudent from './addstudent';
import SetMessage from './message';
import SetError from './error';

const rootReducer = combineReducers({
  students: StudentReducer,
  form : formReducer,
  activeStudent: ActiveStudent,
  addStudent: AddStudent,
  message: SetMessage,
  error: SetError
});

export default rootReducer;