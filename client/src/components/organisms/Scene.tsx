import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';

import SceneNavigation from '../molecules/SceneMolecules/SceneNavigation';
import SceneConnector from '../molecules/SceneMolecules/SceneConnector';
import SceneItemEdit from '../molecules/SceneMolecules/SceneItemEdit';

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
    padding: 30px 10px 30px 30px;
`

const Scene: FC<SceneProps> = ({...props}) => {
    const clickedItem = useTypedSelector(state => state.timeline.clickedItem);
    const [activeScene, setScene] = useState(0);

    const handleNavigationClick = (id: number) => {
        setScene(id);
    }

    return (
        <Container {...props}>
            {
                clickedItem.name ? (
                    <SceneItemEdit name={clickedItem.name} type={clickedItem.type} />
                ) : (
                    <>
                        <SceneNavigation activeScene={activeScene} onClick={handleNavigationClick}/>
                        <Wrapper>
                            <SceneConnector activeScene={activeScene} />
                        </Wrapper>
                    </>
                )
            }
        </Container>
    );
}

export default Scene;