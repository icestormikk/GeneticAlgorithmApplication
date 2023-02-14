import React, {lazy, Suspense} from 'react';

const LazyAlgorithmActionsController = lazy(() =>
  import('./AlgorithmActionsController'),
);

const AlgorithmActionsController = (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={null}>
    <LazyAlgorithmActionsController {...props} />
  </Suspense>
);

export default AlgorithmActionsController;
