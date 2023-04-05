import React, {lazy, Suspense} from 'react';

const LazyModalWindow = lazy(() => import('./ModalWindow'));

interface ModalWindowProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: JSX.Element,
    content: JSX.Element,
}

const ModalWindow = (props: JSX.IntrinsicAttributes & ModalWindowProps) => (
    <Suspense fallback={null}>
        <LazyModalWindow {...props} />
    </Suspense>
);

export default ModalWindow;
