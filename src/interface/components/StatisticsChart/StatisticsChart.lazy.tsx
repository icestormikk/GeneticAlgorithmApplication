import React, {lazy, Suspense} from 'react';

const LazyStatisticsChart = lazy(() => import('./StatisticsChart'));

interface StatisticsChartProps {
    data: Array<{generationNumber: number, distance: number}>
}

const StatisticsChart = (props: JSX.IntrinsicAttributes & StatisticsChartProps) => (
    <Suspense fallback={null}>
        <LazyStatisticsChart {...props} />
    </Suspense>
);

export default StatisticsChart;
