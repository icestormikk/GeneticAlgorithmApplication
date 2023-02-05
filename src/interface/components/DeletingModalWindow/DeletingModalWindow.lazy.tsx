import React, {lazy, Suspense} from 'react';

const LazyDeletingModalWindow = lazy(() => import('./DeletingModalWindow'));

interface DeletingModalWindowProps {
  content: JSX.Element,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
}

const DeletingModalWindow = (
    props: JSX.IntrinsicAttributes & DeletingModalWindowProps,
) => (
  <Suspense fallback={null}>
    <LazyDeletingModalWindow {...props} />
  </Suspense>
);

export default DeletingModalWindow;
