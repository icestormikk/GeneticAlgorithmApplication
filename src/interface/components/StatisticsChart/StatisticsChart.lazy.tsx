import React, {lazy, Suspense} from 'react';

const LazyStatisticsChart = lazy(() => import('./StatisticsChart'));

const StatisticsChart = (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={null}>
        <LazyStatisticsChart {...props} />
    </Suspense>
);

export default StatisticsChart;
