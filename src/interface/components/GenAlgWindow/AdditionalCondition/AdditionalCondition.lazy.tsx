import React, {lazy, Suspense} from 'react';

const LazyAdditionalCondition = lazy(() => import('./AdditionalCondition'));

interface AdditionalConditionProps {
    content: JSX.Element,
    condition: () => boolean,
}

const AdditionalCondition = (
    props: JSX.IntrinsicAttributes & AdditionalConditionProps,
) => (
    <Suspense fallback={null}>
        <LazyAdditionalCondition {...props} />
    </Suspense>
);

export default AdditionalCondition;
