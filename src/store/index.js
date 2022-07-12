import { combineReducers, createStore } from 'redux';
import { boardReduser } from './boardReduser';
import { taskReducer } from './taskReduser';

const rootReducer = combineReducers({
  board: boardReduser,
  task: taskReducer
});

export const store = createStore(rootReducer);
