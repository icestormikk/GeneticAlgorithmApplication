import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PathInfo} from "../extensions/PathInfo";
import {Population} from "../../../geneticAlgorithm/domain/Population";

interface GraphState<T> {
    algorithmStepsInfo: {
        items: Array<Population<number>>,
        onResult?: (population: Population<number>) => number
    },
    foundPath: PathInfo<number> | undefined,
    executionTimeInMS: number
}

const initialState: GraphState<any> = {
    algorithmStepsInfo: {
        items: [],
        onResult: undefined
    },
    foundPath: undefined,
    executionTimeInMS: 0
};

const graphSlice = createSlice({
    name: 'graphSlice',
    initialState,
    reducers: {
        addStepInfo: (state, action: PayloadAction<Population<number>>) => {
            state.algorithmStepsInfo.items.push(action.payload)
        },
        clearStepsInfo: (state) => {
            state.algorithmStepsInfo.items.splice(0, state.algorithmStepsInfo.items.length)
        },
        setResultFunction: (
            state,
            action: PayloadAction<(population: Population<number>) => number>
        ) => {
            state.algorithmStepsInfo.onResult = action.payload
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
        setExecutionTime: (state, action: PayloadAction<number>) => {
            state.executionTimeInMS = action.payload
        }
    },
});

export const graphReducer = graphSlice.reducer;
export const {
    addStepInfo,
    setResultFunction,
    clearStepsInfo,
    dropState,
    setPath,
    setExecutionTime
} = graphSlice.actions;
