import React, {lazy, Suspense} from 'react';

const LazyObjectInfo = lazy(() => import('./ObjectInfo'));

interface ObjectInfoProps {
  obj: any
}

const ObjectInfo = (props: JSX.IntrinsicAttributes & ObjectInfoProps) => (
  <Suspense fallback={null}>
    <LazyObjectInfo {...props} />
  </Suspense>
);

export default ObjectInfo;
