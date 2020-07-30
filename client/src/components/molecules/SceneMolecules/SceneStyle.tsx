import React, { FC } from 'react';
import styled from 'styled-components';

interface SceneStyleProps {
    active: boolean;
}

const Container = styled.div<SceneStyleProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: inherit;
    visibility: ${({active}) => active ? 'visible': 'hidden'};
`

const SceneStyle: FC<SceneStyleProps> = ({active}) => {
    return (
        <Container active={active}>

        </Container>
    )
}

export default SceneStyle;