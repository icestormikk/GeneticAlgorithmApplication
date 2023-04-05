import React, {lazy, Suspense} from 'react';

const LazyLinkActions = lazy(() => import('./LinkActions'));

const LinkActions = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyLinkActions {...props} />
    </Suspense>
);

export default LinkActions;
