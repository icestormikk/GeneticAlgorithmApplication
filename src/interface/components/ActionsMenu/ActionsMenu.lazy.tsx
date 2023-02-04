import React, {lazy, Suspense} from 'react';

const LazyActionsMenu = lazy(() => import('./ActionsMenu'));

interface ActionsMenuProps {
  setIsFullInfoOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionsMenu = (
    props: JSX.IntrinsicAttributes & ActionsMenuProps,
) => (
  <Suspense fallback={null}>
    <LazyActionsMenu {...props} />
  </Suspense>
);

export default ActionsMenu;
