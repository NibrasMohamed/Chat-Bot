import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selected_vehicle:"not selected",
    current_chat_mode:"general",
    vehicles:['bike', 'car', 'van', 'truck', '3wheeler']
    
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
      setVehicle: (state, action) =>{
        state.selected_vehicle = action.payload
      },
      resetVehicle: (state, action) => {
        state.selected_vehicle = "";
      },
      setChatMode:(state, action) => { 
        state.current_chat_mode = action.payload
      }
  },
});

export const { setVehicle, resetVehicle, setChatMode } = agentSlice.actions;
export default agentSlice.reducer;
