import React, {lazy, Suspense} from 'react';
import {Config} from "./AlgorithmConfigPanel";

const LazyAlgorithmConfigPanel = lazy(() => import('./AlgorithmConfigPanel'));

interface AlgorithmConfigPanelProps {
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

const AlgorithmConfigPanel = (props: JSX.IntrinsicAttributes & AlgorithmConfigPanelProps) => (
    <Suspense fallback={null}>
        <LazyAlgorithmConfigPanel {...props} />
    </Suspense>
);

export default AlgorithmConfigPanel;
