import React, {lazy, Suspense} from 'react';
import {ReduxNodeObject} from '../../../redux/extensions/ReduxNodeObject';

const LazyChooseNodesMenu = lazy(() => import('./ChooseNodesMenu'));

interface ChooseNodesMenuProps {
    nodesCollector: Array<ReduxNodeObject>,
    setNodesCollector: React.Dispatch<React.SetStateAction<Array<ReduxNodeObject>>>
}

const ChooseNodesMenu = (
    props: JSX.IntrinsicAttributes & ChooseNodesMenuProps,
) => (
    <Suspense fallback={null}>
        <LazyChooseNodesMenu {...props} />
    </Suspense>
);

export default ChooseNodesMenu;
