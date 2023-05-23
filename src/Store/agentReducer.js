import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selected_vehicle:"not selected",
    current_chat_mode:"question",
    vehicles:['bike', 'car', 'van', 'truck', '3wheeler'],
    que_count: 0
    
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
      setVehicle: (state, action) =>{
        state.selected_vehicle = action.payload
      },
      resetVehicle: (state, action) => {
        state.selected_vehicle = "not selected";
      },
      setChatMode:(state, action) => { 
        state.current_chat_mode = action.payload
      },
      addQueCount:(state, action) => {
        state.que_count = ++state.que_count
      },
      resetQueCount:(state, action) => {
        state.que_count = 0;
      }
  },
});

export const { setVehicle, resetVehicle, setChatMode, addQueCount, resetQueCount } = agentSlice.actions;
export default agentSlice.reducer;
