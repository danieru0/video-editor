import React, { FC } from 'react';
import styled from 'styled-components';

import SceneButton from '../../atoms/SceneButton';

interface SceneNavigationProps {
    onClick: (id: number) => void;
    activeScene: number;
}

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
`

const SceneNavigation: FC<SceneNavigationProps> = ({ onClick, activeScene }) => {
    return (
        <Container>
            <SceneButton text="shapes" selected={activeScene === 0} id={0} handleClick={onClick} />
            <SceneButton text="media" selected={activeScene === 1} id={1} handleClick={onClick} />
            <SceneButton text="style" selected={activeScene === 2} id={2} handleClick={onClick} />
        </Container>
    );
}

export default SceneNavigation;