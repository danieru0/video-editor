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

interface BlockTypeProps {
    color?: string;
    type: BlockTypes | string;
}

interface TextTypeProps {
    color?: string;
    textAlign?: string;
    fontSize?: string;
    justifyContent?: string;
    fontFamily?: string;
    border?: boolean;
    textColor?: string;
}

interface BlockProps extends BlockTypeProps, TextTypeProps {
    [x: string]: any;
}

const BlockType = styled.div<BlockTypeProps>`
    clip-path: ${({type}) => handleBlockType(type)}
    background-color: ${({color}) => color};
    width: 100px;
    height: 100px;
`

const TextType = styled.div<TextTypeProps>`
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    color: ${({textColor}) => textColor};
    text-align: ${({textAlign}) => textAlign};
    font-size: ${({fontSize}) => fontSize};
    justify-content: ${({justifyContent}) => justifyContent};
    border: ${({border}) => border ? '1px solid #fff' : 'none'};
`

const Block: FC<BlockProps> = ({color = '#fff', type, textAlign, fontSize, justifyContent, fontFamily, textColor = '#fff', border, children, ...props}) => {
    switch(type) {
        case 'text':
            return <TextType border={border} color={color} textAlign="center" fontSize="20px" textColor={textColor} justifyContent="center" {...props}>{children}</TextType>
        default: return <BlockType type={type} color={color} {...props} />
    }
}

export default Block;