import React from 'react';
import './geneticAlgorithm/operators/MutationOperators';
import './geneticAlgorithm/operators/RecombinationOperators';
import './geneticAlgorithm/operators/NewPopulationSelectionOperators';
import './geneticAlgorithm/operators/ParentsSelectionOperators';
import ActionsMenu from './interface/components/ActionsMenu/ActionsMenu.lazy';
import Graph from './interface/components/Graph';
import JoinNodesWindow from './interface/components/JoinNodesWindow/JoinNodesWindow.lazy';
import AllEntitiesInfo from './interface/components/AllEntitiesInfo/AllEntitiesInfo.lazy';
import {LinksViewMode} from "./interface/redux/extensions/enums/LinksViewMode";
import LinksViewModeChanger from "./interface/components/LinksViewModeChanger/LinksViewModeChanger.lazy";
import {useAppSelector} from "./interface/redux/hooks";

/**
 * The root component of the React application
 * @constructor
 */
function App() {
    const foundPath = useAppSelector((state) => state.graph.foundPath)
    const [isFullInfoOpen, setIsFullInfoOpen] = React.useState(false);
    const [linksViewMode, setLinksViewMode] = React.useState(LinksViewMode.ALL)

    return (
        <>
            <ActionsMenu setIsFullInfoOpen={setIsFullInfoOpen}/>
            <Graph linksViewMode={linksViewMode}/>
            {
                foundPath && (
                    <LinksViewModeChanger
                        linksViewMode={linksViewMode}
                        setLinksViewMode={setLinksViewMode}
                    />
                )
            }
            <JoinNodesWindow/>
            <AllEntitiesInfo isOpen={isFullInfoOpen}/>
        </>
    );
}

export default App;
