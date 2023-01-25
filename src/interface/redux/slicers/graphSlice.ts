import {createSlice} from '@reduxjs/toolkit';

interface GraphState {
  isAdditionalElementsShow: boolean
}

const initialState: GraphState = {
  isAdditionalElementsShow: false,
};

const graphSlice = createSlice({
  name: 'graphSlice',
  initialState,
  reducers: {
    switchElementsVisibility: (state) => {
      state.isAdditionalElementsShow = !state.isAdditionalElementsShow;
    },
    dropState: (state) => {
      state.isAdditionalElementsShow = false;
    },
  },
});

export const graphReducer = graphSlice.reducer;
export const {
  switchElementsVisibility, dropState,
} = graphSlice.actions;
