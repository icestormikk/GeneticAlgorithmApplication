import React, {lazy, Suspense} from 'react';

const LazyJoinNodesWindow = lazy(() => import('./JoinNodesWindow'));

const JoinNodesWindow = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyJoinNodesWindow {...props} />
    </Suspense>
);

export default JoinNodesWindow;
