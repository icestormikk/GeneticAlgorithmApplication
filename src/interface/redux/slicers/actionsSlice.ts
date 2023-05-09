import {Action} from '../extensions/Action';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateUUID} from 'three/src/math/MathUtils';
import {ActionType} from "../extensions/enums/ActionType";

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
                Array<{ title: string, description?: string, type?: ActionType }>
            >,
        ) => {
            action.payload.forEach((act) => {
                state.items.push({
                    id: generateUUID(),
                    type: act.type || ActionType.DEFAULT,
                    title: act.title,
                    description: act.description,
                    timestamp: new Date().getTime(),
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
