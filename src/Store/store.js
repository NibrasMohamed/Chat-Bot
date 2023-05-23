import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./agentReducer";

const  store = configureStore({
    reducer: {
        agent: agentReducer
    }
});

export default store;