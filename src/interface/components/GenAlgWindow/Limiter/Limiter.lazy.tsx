import React, {lazy, Suspense} from 'react';

const LazyLimiter = lazy(() => import('./Limiter'));

interface LimiterProps {
    source: any,
    limitations: Array<{ name: string, limit: number }>,
    setLimitations: React.Dispatch<React.SetStateAction<Array<{ name: string, limit: number }>>>
}

const Limiter = (props: JSX.IntrinsicAttributes & LimiterProps) => (
    <Suspense fallback={null}>
        <LazyLimiter {...props} />
    </Suspense>
);

export default Limiter;
