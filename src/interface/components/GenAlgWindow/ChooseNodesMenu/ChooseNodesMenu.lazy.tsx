import React, {lazy, Suspense} from 'react';
import {ReduxNodeObject} from '../../../redux/extensions/ReduxNodeObject';

const LazyChooseNodesMenu = lazy(() => import('./ChooseNodesMenu'));


const ChooseNodesMenu = (
    props: JSX.IntrinsicAttributes,
) => (
    <Suspense fallback={null}>
        <LazyChooseNodesMenu {...props} />
    </Suspense>
);

export default ChooseNodesMenu;
