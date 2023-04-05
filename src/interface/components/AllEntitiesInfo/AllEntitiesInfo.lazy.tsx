import React, {lazy, Suspense} from 'react';

const LazyAllEntitiesInfo = lazy(() => import('./AllEntitiesInfo'));

interface AllEntitiesInfoProps {
    isOpen: boolean,
}

const AllEntitiesInfo = (
    props: JSX.IntrinsicAttributes & AllEntitiesInfoProps,
) => (
    <Suspense fallback={null}>
        <LazyAllEntitiesInfo {...props} />
    </Suspense>
);

export default AllEntitiesInfo;
