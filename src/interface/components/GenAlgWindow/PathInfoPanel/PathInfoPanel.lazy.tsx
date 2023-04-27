import React, {lazy, Suspense} from 'react';
import {PathInfo} from "../../../redux/extensions/PathInfo";

const LazyPathInfoPanel = lazy(() => import('./PathInfoPanel'));

interface PathInfoPanelProps {
    pathInfo: PathInfo<any>
}

const PathInfoPanel = (props: JSX.IntrinsicAttributes & PathInfoPanelProps) => (
    <Suspense fallback={null}>
        <LazyPathInfoPanel {...props} />
    </Suspense>
);

export default PathInfoPanel;
