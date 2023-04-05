import React, {lazy, Suspense} from 'react';

const LazyModalHeader = lazy(() => import('./ModalHeader'));

interface ModalHeaderProps {
    content: JSX.Element,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalHeader = (props: JSX.IntrinsicAttributes & ModalHeaderProps) => (
    <Suspense fallback={null}>
        <LazyModalHeader {...props} />
    </Suspense>
);

export default ModalHeader;
