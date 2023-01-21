import {configureStore} from '@reduxjs/toolkit';
import {graphReducer} from './slicers/graphSlice';

const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'graphSlice/setNodes',
          'graphSlice/setLinks',
          'graphSlice/select',
        ],
      },
    }),
  ],
});

export default store;
