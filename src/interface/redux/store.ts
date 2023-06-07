import {configureStore} from '@reduxjs/toolkit';
import {graphReducer} from './slicers/graphSlice';
import {linksReducer} from './slicers/linkSlice';
import {nodesReducer} from './slicers/nodeSlice';
import {actionsReducer} from './slicers/actionsSlice';

const store = configureStore({
    reducer: {
        graph: graphReducer,
        links: linksReducer,
        nodes: nodesReducer,
        actions: actionsReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false
        }),
    ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
