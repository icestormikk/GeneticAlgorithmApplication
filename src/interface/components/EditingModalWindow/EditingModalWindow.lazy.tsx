import React, {lazy, Suspense} from 'react';

const LazyEditingModalWindow = lazy(() => import('./EditingModalWindow'));

interface EditingModalWindowProps {
    content: JSX.Element,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onEdit?: () => void,
}

const EditingModalWindow = (
    props: JSX.IntrinsicAttributes & EditingModalWindowProps,
) => (
    <Suspense fallback={null}>
        <LazyEditingModalWindow {...props} />
    </Suspense>
);

export default EditingModalWindow;
