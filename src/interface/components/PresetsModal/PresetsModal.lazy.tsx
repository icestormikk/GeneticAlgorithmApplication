import React, {lazy, Suspense} from 'react';

const LazyPresetsModal = lazy(() => import('./PresetsModal'));

interface PresetsModalProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PresetsModal = (props: JSX.IntrinsicAttributes & PresetsModalProps) => (
    <Suspense fallback={null}>
        <LazyPresetsModal {...props} />
    </Suspense>
);

export default PresetsModal;
