import {ReduxNodeObject} from '../extensions/ReduxNodeObject';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateUUID} from 'three/src/math/MathUtils';

interface NodesState {
  selectedItems: Array<ReduxNodeObject>
  items: Array<ReduxNodeObject>
}

const initialState : NodesState = {
  selectedItems: [],
  items: [{id: generateUUID(), label: 'node-0'}],
};

const graphSlice = createSlice({
  name: 'nodesSlice',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<ReduxNodeObject>) => {
      const {id, label} = action.payload;
      if (!state.items.find((el) => el.id === id)) {
        return;
      }

      if (state.selectedItems.length === 2) {
        state.selectedItems.splice(0, state.selectedItems.length);
      }
      state.selectedItems.push({id, label});
    },
    setSelectedNodes: (
        state,
        action: PayloadAction<Array<ReduxNodeObject>>,
    ) => {
      state.selectedItems.splice(0, state.selectedItems.length);

      action.payload.forEach((el) => {
        const {id, label} = el;
        if (!state.selectedItems.find((el) => el.id === id)) {
          state.selectedItems.push({id, label});
        }
      });
    },
    setNodes: (state, action: PayloadAction<Array<ReduxNodeObject>>) => {
      state.items.splice(0, state.items.length);
      action.payload.forEach((node) => {
        const {id, label} = node;
        if (!state.items.find((el) => el.id === id)) {
          state.items.push({id, label});
        }
      });
    },
    addNode: (state, action: PayloadAction<ReduxNodeObject>) => {
      const {id, label} = action.payload;
      if (!state.items.find((el) => el.id === id)) {
        state.items.push({id, label});
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.items.findIndex((el) => el.id === id);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    updateNode: (
        state,
        action: PayloadAction<ReduxNodeObject>,
    ) => {
      const {id, label} = action.payload;
      const index = state.items.findIndex((el) => el.id === id);
      if (index > -1) {
        state.items.splice(index, 1, {id, label});
      }
    },
    dropNodes: (state) => {
      state.selectedItems.splice(0, state.selectedItems.length);
      state.items.splice(
          0, state.items.length,
          {id: generateUUID(), label: 'node-0'},
      );
    },
  },
});

export const nodesReducer = graphSlice.reducer;
export const {
  setNodes, addNode, removeNode, updateNode, dropNodes,
  setSelectedNodes, select,
} = graphSlice.actions;
