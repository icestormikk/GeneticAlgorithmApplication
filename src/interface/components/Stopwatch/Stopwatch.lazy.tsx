import React, {lazy, Suspense} from 'react';

const LazyStopwatch = lazy(() => import('./Stopwatch'));


const Stopwatch = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyStopwatch {...props} />
    </Suspense>
);

export default Stopwatch;
