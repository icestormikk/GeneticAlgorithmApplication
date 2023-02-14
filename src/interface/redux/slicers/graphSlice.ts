import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GraphState {
  isAdditionalElementsShow: boolean,
  foundPath: Array<string>|undefined
}

const initialState: GraphState = {
  isAdditionalElementsShow: false,
  foundPath: undefined,
};

const graphSlice = createSlice({
  name: 'graphSlice',
  initialState,
  reducers: {
    switchElementsVisibility: (state) => {
      state.isAdditionalElementsShow = !state.isAdditionalElementsShow;
    },
    setPath: (state, action: PayloadAction<Array<string>>) => {
      if (!state.foundPath) {
        state.foundPath = action.payload;
      }

      state.foundPath.splice(0, state.foundPath.length, ...action.payload);
    },
    dropState: (state) => {
      state.isAdditionalElementsShow = false;
    },
  },
});

export const graphReducer = graphSlice.reducer;
export const {
  dropState,
  setPath,
  switchElementsVisibility,
} = graphSlice.actions;
