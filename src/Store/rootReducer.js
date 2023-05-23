import { combineReducers } from '@reduxjs/toolkit';
import agentReducer from './agentReducer';

const rootReducer = combineReducers({
  agnet: agentReducer,
  // Add more reducers here
});

export default rootReducer;
