import React, {lazy, Suspense} from 'react';

const LazyTemplateName = lazy(() => import('./TemplateName'));

interface TemplateNameProps {}

const TemplateName = (props: JSX.IntrinsicAttributes & TemplateNameProps) => (
  <Suspense fallback={null}>
    <LazyTemplateName {...props} />
  </Suspense>
);

export default TemplateName;
