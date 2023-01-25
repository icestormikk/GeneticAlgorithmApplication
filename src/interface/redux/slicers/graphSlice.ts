import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateUUID} from 'three/src/math/MathUtils';
import {ReduxLinkObject} from '../extensions/ReduxLinkObject';
import {ReduxNodeObject} from '../extensions/ReduxNodeObject';

interface GraphState {
  path: Array<{id: string}>,
  selectedNodes: Array<{id: string}>,
  nodes: Array<{id: string}>,
  links: Array<ReduxLinkObject>,
  isAdditionalElementsShow: boolean
}

const initialState: GraphState = {
  path: [],
  selectedNodes: [],
  nodes: [{id: generateUUID()}],
  links: [],
  isAdditionalElementsShow: false,
};

const graphSlice = createSlice({
  name: 'graphSlice',
  initialState,
  reducers: {
    addLink: (state, action: PayloadAction<ReduxLinkObject>) => {
      state.links.push({
        id: action.payload.id,
        source: action.payload.source,
        target: action.payload.target,
        value: action.payload.value,
      });
      if (action.payload.value.isPath) {
        state.path.push({id: action.payload.id});
      }
    },
    addNode: (state, action: PayloadAction<ReduxNodeObject>) => {
      const {id} = action.payload;
      state.nodes.push({id});
    },
    backToInitialState: (state) => {
      state.selectedNodes.splice(0, state.selectedNodes.length);
      state.nodes.splice(
          0, state.nodes.length,
          {id: generateUUID()},
      );
      state.links.splice(0, state.links.length);
    },
    clearLinks: (state) => {
      state.links.splice(0, state.links.length);
    },
    clearSelectedNodes: (state) => {
      state.selectedNodes.splice(0, state.selectedNodes.length);
    },
    select: (state, action: PayloadAction<ReduxNodeObject>) => {
      const {id} = action.payload;
      if (state.selectedNodes.length === 2) {
        state.selectedNodes.splice(0, state.selectedNodes.length);
      }
      if (!state.selectedNodes.find((el) => el.id === id)) {
        state.selectedNodes.push({id});
      }
    },
    setLinks: (state, action: PayloadAction<Array<ReduxLinkObject>>) => {
      const updatedLinks = action.payload.map((el) => {
        return {
          id: el.id,
          source: el.source,
          target: el.target,
          value: el.value,
        };
      });
      state.links.splice(0, state.links.length, ...updatedLinks);
    },
    setNodes: (state, action: PayloadAction<Array<ReduxNodeObject>>) => {
      const updatedNodes = action.payload.map((el) => {
        return {id: el.id};
      });
      state.nodes.splice(0, state.nodes.length, ...updatedNodes);
    },
    switchElementsVisibility: (state) => {
      state.isAdditionalElementsShow = !state.isAdditionalElementsShow;
    },
  },
});

export const graphReducer = graphSlice.reducer;
export const {
  addNode,
  addLink,
  backToInitialState,
  switchElementsVisibility,
  clearLinks,
  clearSelectedNodes,
  select,
  setNodes,
  setLinks,
} = graphSlice.actions;