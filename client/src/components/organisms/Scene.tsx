import React, { FC, useState } from 'react';
import styled from 'styled-components';

import SceneNavigation from '../molecules/SceneMolecules/SceneNavigation';
import SceneConnector from '../molecules/SceneMolecules/SceneConnector';

interface SceneProps {
    [x:string]: any;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    border-right: 15px solid ${({theme}) => theme.secondary};
    z-index: 2;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px;
`

const Scene: FC<SceneProps> = ({...props}) => {
    const [activeScene, setScene] = useState(0);

    const handleNavigationClick = (id: number) => {
        setScene(id);
    }

    return (
        <Container {...props}>
            <SceneNavigation activeScene={activeScene} onClick={handleNavigationClick}/>
            <Wrapper>
                <SceneConnector activeScene={activeScene} />
            </Wrapper>
        </Container>
    );
}

export default Scene;