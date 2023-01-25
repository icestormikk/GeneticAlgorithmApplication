import {ReduxLinkObject} from '../extensions/ReduxLinkObject';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LinksState {
    items: Array<ReduxLinkObject>
}

const initialState: LinksState = {
  items: [],
};

const linksSlice = createSlice({
  name: 'linksSlice',
  initialState,
  reducers: {
    setLinks: (state, action: PayloadAction<Array<ReduxLinkObject>>) => {
      state.items.splice(0, state.items.length);
      action.payload.forEach((el) => {
        const {id, source, target, label, value} = el;
        if (!state.items.find((el) => el.id === id)) {
          state.items.push({id, source, target, label, value});
        }
      });
    },
    addLink: (state, action: PayloadAction<ReduxLinkObject>) => {
      if (state.items.find((el) => el.id === action.payload.id)) {
        return;
      }
      const {id, source, target, label, value} = action.payload;
      state.items.push({id, source, target, label, value});
    },
    removeLink: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.items.findIndex((el) => el.id === id);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    updateLink: (state, action: PayloadAction<ReduxLinkObject>) => {
      const {id, source, target, label, value} = action.payload;
      const index = state.items.findIndex((el) => el.id === id);
      if (index > -1) {
        state.items.splice(index, 1, {id, source, target, label, value});
      }
    },
    dropLinks: (state) => {
      state.items.splice(0, state.items.length);
    },
  },
});

export const linksReducer = linksSlice.reducer;
export const {
  setLinks, addLink, removeLink, updateLink, dropLinks,
} = linksSlice.actions;
