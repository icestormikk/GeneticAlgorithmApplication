import React, {lazy, Suspense} from 'react';

const LazyAlgorithmActionStatus = lazy(() => import('./AlgorithmActionStatus'));
const AlgorithmActionStatus = (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={null}>
    <LazyAlgorithmActionStatus {...props} />
  </Suspense>
);

export default AlgorithmActionStatus;
