import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface BlocksValuesI {
    [x: string]: string;
}
export const BlocksArray = [
    'Triangle', 
    'Trapezoid', 
    'Octagon',
    'Parallelogram',
    'Rhombus',
    'Pentagon',
    'Hexagon',
    'Heptagon',
    'Nonagon',
    'Decagon',
    'Bevel',
    'Rabbet',
    'LeftArrow',
    'RightArrow',
    'LeftPoint',
    'RightPoint',
    'LeftChevron',
    'RightChevron',
    'Star',
    'Cross',
    'Message',
    'Close',
    'Frame',
    'Circle',
    'Ellipse'

] as const;
const Values = [
    'polygon(50% 0%, 0% 100%, 100% 100%);',
    'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);',
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);',
    'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);',
    'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);',
    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);',
    'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%);',
    'polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%);',
    'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);',
    'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);',
    'polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);',
    'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);',
    'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);',
    'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);',
    'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);',
    'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);',
    'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);',
    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);',
    'polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%);',
    'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);',
    'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);',
    'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%);',
    'circle(50% at 50% 50%);',
    'ellipse(25% 40% at 50% 50%);'
]
const BlocksValues = BlocksArray.reduce<BlocksValuesI>((current, item, index) => {
    current[item] = Values[index];
    return current;
}, {});

type BlockTypes = typeof BlocksArray[number];

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
    text?: string;
    imageSrc?: string;
    [x: string]: any;
}

const BlockType = styled.div<BlockTypeProps>`
    clip-path: ${({type}) => BlocksValues[type]};
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
    font-family: ${({fontFamily}) => fontFamily};
    overflow: hidden;
`

const TextElement = styled.span`
    white-space: pre-wrap;
`

const ImageWrapper = styled.div`
    width: 100px;
`

const ImageType = styled.img`
    width: 100%;
`

const Block = forwardRef(
    (props: BlockProps, ref?: React.Ref<HTMLDivElement | HTMLImageElement>) => {
        const { color = '#fff', type, textAlign, fontSize, justifyContent, fontFamily = 'Lato', textColor = '#fff', border, text, imageSrc, ...rest } = props;

        switch(type) {
            case 'text':
                return <TextType ref={ref} border={border} color={color} textAlign={textAlign} fontFamily={fontFamily} fontSize={fontSize} textColor={textColor} justifyContent={justifyContent} {...rest}>
                            <TextElement>
                                {text}
                            </TextElement>
                        </TextType>
            case 'image':
                return <ImageWrapper {...rest}>
                            <ImageType src={imageSrc} />
                        </ImageWrapper>
            default: return <BlockType ref={ref} type={type} color={color} {...rest} />
        }
    }
)

export default Block;