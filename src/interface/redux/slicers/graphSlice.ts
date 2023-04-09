import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PathInfo} from "../extensions/PathInfo";

interface GraphState {
    foundPath: PathInfo<number> | undefined
}

const initialState: GraphState = {
    foundPath: undefined,
};

const graphSlice = createSlice({
    name: 'graphSlice',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<PathInfo<number>>) => {
            if (!state.foundPath) {
                state.foundPath = action.payload;
            }

            const {nodes, totalLength} = action.payload
            state.foundPath.nodes.splice(0, state.foundPath.nodes.length, ...nodes);
            state.foundPath.totalLength = totalLength
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
