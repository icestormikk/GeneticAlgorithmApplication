import React, {lazy, Suspense} from 'react';
import {LinksViewMode} from "../../redux/extensions/enums/LinksViewMode";

const LazyLinksViewModeChanger = lazy(() => import('./LinksViewModeChanger'));

interface LinksViewModeChangerProps {
    linksViewMode: LinksViewMode
    setLinksViewMode: React.Dispatch<React.SetStateAction<LinksViewMode>>
}

const LinksViewModeChanger = (props: JSX.IntrinsicAttributes & LinksViewModeChangerProps) => (
    <Suspense fallback={null}>
        <LazyLinksViewModeChanger {...props} />
    </Suspense>
);

export default LinksViewModeChanger;
