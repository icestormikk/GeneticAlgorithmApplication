import React, {lazy, Suspense} from 'react';

const LazyNodeEntity = lazy(() => import('./NodeEntity'));

interface NodeEntityProps {
    id: string
}

const NodeEntity = (props: JSX.IntrinsicAttributes & NodeEntityProps) => (
    <Suspense fallback={null}>
        <LazyNodeEntity {...props} />
    </Suspense>
);

export default NodeEntity;
