import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GraphState {
    foundPath: Array<string> | undefined
}

const initialState: GraphState = {
    foundPath: undefined,
};

const graphSlice = createSlice({
    name: 'graphSlice',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<Array<string>>) => {
            if (!state.foundPath) {
                state.foundPath = action.payload;
            }

            state.foundPath.splice(0, state.foundPath.length, ...action.payload);
        },
        dropState: (state) => {
            state.foundPath = undefined;
        },
    },
});

export const graphReducer = graphSlice.reducer;
export const {
    dropState,
    setPath,
} = graphSlice.actions;
