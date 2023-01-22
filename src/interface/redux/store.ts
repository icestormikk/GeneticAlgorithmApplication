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
          'graphSlice/addLink',
          'graphSlice/setLinks',
          'graphSlice/select',
        ],
      },
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
