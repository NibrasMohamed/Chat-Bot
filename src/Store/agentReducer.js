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
      }
  },
});

export const { setVehicle, resetVehicle } = agentSlice.actions;
export default agentSlice.reducer;
