import {createSlice} from '@reduxjs/toolkit';
import {generateUUID} from 'three/src/math/MathUtils';

const graphSlice = createSlice({
  name: 'graphSlice',
  initialState: {
    selectedNodes: [],
    nodes: [{
      id: generateUUID(),
      selected: false,
    }],
    links: [],
  },
  reducers: {
    select: (state, action) => {
      const {id} = action.payload;
      if (state.selectedNodes.length >= 2) {
        state.selectedNodes.pop();
      }
      state.selectedNodes = [id].concat(state.selectedNodes);

      state.nodes = state.nodes.map((el) => {
        el.selected = state.selectedNodes.includes(el.id);
        return el;
      });
    },
    setNodes: (state, action) => {
      state.nodes = action.payload.map((el) => {
        return {id: el.id, selected: el.selected};
      });
      // deleting non existing nodes from selectedNodes
      state.selectedNodes.forEach((el, index) => {
        if (!state.nodes.map((el) => el.id).includes(el.id)) {
          state.selectedNodes.splice(index, 1);
        }
      });
    },
    setLinks: (state, action) => {
      state.links = action.payload.map((el) => {
        return {
          id: el.id,
          source: el.source.id || el.source,
          target: el.target.id || el.target,
          value: el.value,
        };
      });
    },
    addNode: (state, action) => {
      const {id, selected} = action.payload;
      state.nodes.push({id, selected});
    },
    addLink: (state, action) => {
      const {id, source, target, value} = action.payload;
      state.links.push({id, source, target, value});
    },
    clearLinks: (state) => {
      state.links = [];
    },
    clearSelectedNodes: (state) => {
      state.selectedNodes = [];
      state.nodes = state.nodes.map((el) => {
        el.selected = false; return el;
      });
    },
    backToInitialState: (state) => {
      state.selectedNodes = [];
      state.nodes = [{id: generateUUID(), selected: false}];
      state.links = [];
    },
  },
});

export const graphReducer = graphSlice.reducer;
export const {
  addNode,
  addLink,
  backToInitialState,
  clearLinks,
  clearSelectedNodes,
  select,
  setNodes,
  setLinks,
} = graphSlice.actions;
