import React, {lazy, Suspense} from 'react';
import {AlgorithmType} from "../../../redux/extensions/enums/AlgorithmType";

const LazyChooseAlgorithmPanel = lazy(() => import('./ChooseAlgorithmPanel'));

interface ChooseAlgorithmPanelProps {
    setMode: React.Dispatch<React.SetStateAction<AlgorithmType>>
}

const ChooseAlgorithmPanel = (props: JSX.IntrinsicAttributes & ChooseAlgorithmPanelProps) => (
    <Suspense fallback={null}>
        <LazyChooseAlgorithmPanel {...props} />
    </Suspense>
);

export default ChooseAlgorithmPanel;
