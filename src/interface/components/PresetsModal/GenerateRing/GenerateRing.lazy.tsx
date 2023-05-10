import React, {lazy, Suspense} from 'react';

const LazyGenerateRing = lazy(() => import('./GenerateRing'));

const GenerateRing = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyGenerateRing {...props} />
    </Suspense>
);

export default GenerateRing;
