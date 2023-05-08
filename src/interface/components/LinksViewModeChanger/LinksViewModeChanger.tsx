import React from 'react';
import {LinksViewMode} from "../../redux/extensions/enums/LinksViewMode";

interface LinksViewModeChangerProps {
    linksViewMode: LinksViewMode
    setLinksViewMode: React.Dispatch<React.SetStateAction<LinksViewMode>>
}

/**
 * LinksViewModeChanger
 * @constructor
 */
function LinksViewModeChanger({linksViewMode, setLinksViewMode}: LinksViewModeChangerProps) {
    return (
        <div className="links-view-mode-changer">
            <b>Режим отображения рёбер</b>
            <div className="centered">
                <button
                    type="button"
                    className={linksViewMode === LinksViewMode.ALL ? "selected" : ""}
                    onClick={
                        () => {setLinksViewMode(LinksViewMode.ALL)}
                    }
                >
                    Все рёбра
                </button>
                <button
                    type="button"
                    className={linksViewMode === LinksViewMode.ONLY_PATH ? "selected" : ""}
                    onClick={
                        () => {setLinksViewMode(LinksViewMode.ONLY_PATH)}
                    }
                >
                    Только путь
                </button>
            </div>
        </div>
    );
}

export default LinksViewModeChanger;
