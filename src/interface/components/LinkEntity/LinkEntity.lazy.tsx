import React, {lazy, Suspense} from 'react';

const LazyLinkEntity = lazy(() => import('./LinkEntity'));

interface LinkEntityProps {
    id: string
}

const LinkEntity = (props: JSX.IntrinsicAttributes & LinkEntityProps) => (
    <Suspense fallback={null}>
        <LazyLinkEntity {...props} />
    </Suspense>
);

export default LinkEntity;
