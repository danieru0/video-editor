import React, { FC } from 'react';

import SceneStyle from './SceneStyle';
import SceneBlocks from './SceneBlocks';
import SceneMedia from './SceneMedia';

interface SceneConnectorProps {
    activeScene: number;
}

const SceneConnector: FC<SceneConnectorProps> = ({ activeScene }) => {
    /*switch(activeScene) {
        case 0:
            return <SceneBlocks />
        case 1:
            return <SceneMedia />
        case 2:
            return <SceneStyle />
        default: return null;
    }*/

    return (
        <>
            <SceneBlocks active={activeScene === 0} />
            <SceneMedia active={activeScene === 1} />
            <SceneStyle active={activeScene === 2} />
        </>
    )
}

export default SceneConnector;