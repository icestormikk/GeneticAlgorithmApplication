import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PathInfo} from "../extensions/PathInfo";
import {AlgorithmStepInfo} from "../extensions/AlgorithmStepInfo";

interface GraphState<T> {
    algorithmStepsInfo: Array<AlgorithmStepInfo<T>>,
    foundPath: PathInfo<number> | undefined
}

const initialState: GraphState<any> = {
    algorithmStepsInfo: [],
    foundPath: undefined,
};

const graphSlice = createSlice({
    name: 'graphSlice',
    initialState,
    reducers: {
        addStepInfo: (state, action: PayloadAction<AlgorithmStepInfo<any>>) => {
            state.algorithmStepsInfo.push(action.payload)
        },
        clearStepsInfo: (state) => {
            state.algorithmStepsInfo.splice(0, state.algorithmStepsInfo.length)
        },
        setPath: (state, action: PayloadAction<PathInfo<number> | undefined>) => {
            if (!action.payload) {
                state.foundPath = undefined
                return
            }

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
    addStepInfo,
    clearStepsInfo,
    dropState,
    setPath,
} = graphSlice.actions;
