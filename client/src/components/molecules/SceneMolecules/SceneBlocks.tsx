import React, { FC } from 'react';
import styled from 'styled-components';

import WithButton from '../../../hoc/withButton';

import Block, { BlocksArray } from '../../atoms/Block';

interface ContainerProps {
    active: boolean;
}

interface SceneBlocksProps extends ContainerProps {
    onItemClick: (e: any, type: string) => void;
}

const ButtonBlock = WithButton(Block);

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
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

const StyledBlock = styled(ButtonBlock)`
    margin: 5px;
`

const SceneBlocks: FC<SceneBlocksProps> = ({active, onItemClick}) => {
    return (
        <Container active={active}>
            <StyledBlock onClick={(e: any) => onItemClick(e, 'text')} type="text" textAlign="center" fontSize="24px" border justifyContent="center" text="TEXT" />
            {
                BlocksArray.map((item, key) => {
                    return <StyledBlock key={key} onClick={(e: any) => onItemClick(e, item)} type={item} />
                })
            }
        </Container>
    )
}

export default SceneBlocks;