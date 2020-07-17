import React, { FC } from 'react';
import styled from 'styled-components';

import WithButton from '../../../hoc/withButton';

import Block from '../../atoms/Block';

const ButtonBlock = WithButton(Block);

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`

const StyledBlock = styled(ButtonBlock)`
    margin: 5px;
`

const SceneBlocks: FC = () => {

    const handleBlockClick = (e: any, type: string) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Container>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'triangle')} type="Triangle"/>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'Octagon')} type="Octagon"/>
            <StyledBlock onClick={(e: any) => handleBlockClick(e, 'Trapezoid')} type="Trapezoid"/>
        </Container>
    )
}

export default SceneBlocks;