import {Action} from '../extensions/Action';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateUUID} from 'three/src/math/MathUtils';
import {dateDiffInSeconds} from '../../../geneticAlgorithm/functions/datehelper';

interface ActionsState {
    items: Array<Action>
}

const initialState: ActionsState = {
    items: [],
};

const actionsSlice = createSlice({
    name: 'actionsSlice',
    initialState,
    reducers: {
        addAction: (
            state,
            action: PayloadAction<
                Array<{ title: string, description?: string, startDate: Date }>
            >,
        ) => {
            action.payload.forEach((act) => {
                state.items.push({
                    id: generateUUID(),
                    title: act.title,
                    description: act.description,
                    time: dateDiffInSeconds(act.startDate, new Date()),
                });
            });
        },
        removeAction: (
            state,
            action: PayloadAction<Array<string>>,
        ) => {
            action.payload.forEach((id) => {
                const index = state.items.findIndex((el) => el.id === id);
                if (index > -1) {
                    state.items.splice(index, 1);
                }
            });
        },
        updateAction: (
            state,
            action: PayloadAction<Action>,
        ) => {
            const {id} = action.payload;
            const index = state.items.findIndex((el) => el.id === id);
            if (index > -1) {
                state.items.splice(index, 1, action.payload);
            }
        },
        clearActions: (state) => {
            state.items.splice(0, state.items.length);
        },
    },
});

export const actionsReducer = actionsSlice.reducer;
export const {
    addAction,
    updateAction,
    removeAction,
    clearActions,
} = actionsSlice.actions;
