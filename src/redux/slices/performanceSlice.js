import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],  // tutaj będą dane o wydajności
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    setPerformanceData: (state, action) => {
      state.data = action.payload;
    },
    addMachine: (state, action) => {
      state.data.push(action.payload);
    },
    deleteMachine: (state, action) => {
      state.data = state.data.filter(machine => machine.id !== action.payload);
    },
  },
});

export const { setPerformanceData, addMachine, deleteMachine } = performanceSlice.actions;
export default performanceSlice.reducer;
