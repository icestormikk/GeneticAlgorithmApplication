import React, {lazy, Suspense} from 'react';

const LazyGenerateRandomFullGraph = lazy(() => import('./GenerateRandomFullGraph'));

const GenerateRandomFullGraph = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyGenerateRandomFullGraph {...props} />
    </Suspense>
);

export default GenerateRandomFullGraph;
