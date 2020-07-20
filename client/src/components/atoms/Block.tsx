import React, { FC } from 'react';
import styled from 'styled-components';

const handleBlockType = (type: string) => {
    switch(type) {
        case 'Triangle':
            return 'polygon(50% 0%, 0% 100%, 100% 100%);'
        case 'Trapezoid':
            return 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);'
        case 'Octagon':
            return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);'
        default: throw new Error('Wrong type!');
    }
}

type BlockTypes = 'Triangle'
    | 'Trapezoid'
    | 'Octagon'

interface ContainerProps {
    color?: string;
    type: BlockTypes | string;
}

interface BlockProps extends ContainerProps {
    [x: string]: any;
}

const Container = styled.div<ContainerProps>`
    clip-path: ${({type}) => handleBlockType(type)}
    background-color: ${({color}) => color};
    width: 100px;
    height: 100px;
`

const Block: FC<BlockProps> = ({color = '#fff', type, ...props}) => {
    return (
        <Container type={type} color={color} {...props}>

        </Container>
    )
}

export default Block;