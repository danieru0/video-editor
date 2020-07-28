import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { useTypedSelector } from '../../store/selector';

import { useDropDownMenu } from '../../hooks/useDropdownMenu';

import WithButton from '../../hoc/withButton';

import Line from './Line';
import Icon from './Icon';

const AlignButton = WithButton(Icon);

interface WrapperProps {
    active: boolean;
}

interface BlockTextEditProps {
    onColorChange: (color: string) => void;
    onAlignChange: (type: string) => void;
    onTextChange: (text: string) => void;
    onFontChange: (size: string) => void;
    onFontTypeChange: (type: string) => void;
    name: string;
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    padding: 20px;
`

const TextArea = styled.textarea`
    resize: none;
    width: 50%;
    height: 100px;
    margin-bottom: 10px;
    margin-left: 18px;
    font-size: 18px;
    padding: 5px;
`

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    transform: ${({active}) => active ? 'scaleY(1)' : 'scaleY(0)'};
    max-height: ${({active}) => active ? '500px' : '0px'};
    transform-origin: top;
    transition: transform 0.3s, max-height 0.3s;
    padding-left: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
`

const AlignButtons = styled.div`
    width: 100%;
    display: flex;
`

const FontSettingsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    font-family: ${({theme}) => theme.Lato};
    color: #fff;
    font-size: 20px;
    margin-left: 10px;
    padding: 5px 0px;
`

const FontInput = styled.input`
    margin-left: 10px;
    font-size: 16px;
    width: 50px;
`

const Select = styled.select`
    font-size: 16px;
    font-family: ${({theme}) => theme.Lato};
    margin-left: 10px;
`

const Option = styled.option`
    font-size: 16px;
    font-family: ${({theme}) => theme.Lato};
`

const BlockEditText: FC<BlockTextEditProps> = ({onColorChange, onAlignChange, onTextChange, onFontChange, onFontTypeChange, name}) => {
    const timelineList = useTypedSelector(state => state.timeline.timeline);
    const {activeElements, changeActiveElement} = useDropDownMenu({
        0: false,
        1: false,
        2: false
    });
    const [color, setColor] = useState('');
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(0);
    const [fontType, setFontType] = useState('Lato');

    useEffect(() => {
        const currentItem = timelineList.filter(item => item.name === name);

        if (currentItem.length !== 0) {
            if (currentItem[0].item && currentItem[0].item.textOptions) {
                setColor(currentItem[0].item.textOptions.textColor);
                setText(currentItem[0].item.textOptions.text);
                setFontSize(Number(currentItem[0].item.textOptions.fontSize.replace('px', '')));
                setFontType(currentItem[0].item.textOptions.fontFamily);
            }
        }

    }, [name, timelineList]);

    useEffect(() => {
        const editingTimeout = setTimeout(() => {
            onTextChange(text);
        }, 500);

        return () => clearTimeout(editingTimeout);
    }, [text, onTextChange]);

    useEffect(() => {
        const editingTimeout = setTimeout(() => {
            if (fontSize > 72) {
                setFontSize(72);
            } else if (fontSize < 8) {
                setFontSize(8);
            } else {
                onFontChange(`${fontSize}px`);
            }
        }, 500)

        return () => clearTimeout(editingTimeout);
    }, [fontSize, onFontChange]);

    const handleColorChange = (color: string) => {
        setColor(color);
        onColorChange(color);
    }

    const handleTextChange = (value: string) => {
        setText(value);
    }

    const handleFontChange = (value: string) => {
        const font = Number(value);
        if (!isNaN(font)) {
            setFontSize(font);
        }
    }

    const handleTypeChange = (value: string) => {
        setFontType(value);
        onFontTypeChange(value);
    }

    return (
        <Container>
            <TextArea onChange={(e) => handleTextChange(e.target.value)} value={text}/>
            <Line onClick={() => changeActiveElement(0)} text="Font color" active={activeElements[0]} />
            <Wrapper active={activeElements[0]}>
                <ChromePicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/>
            </Wrapper>
            <Line onClick={() => changeActiveElement(1)} text="Text alignment" active={activeElements[1]} />
            <Wrapper active={activeElements[1]}>
                <AlignButtons>
                    <AlignButton onClick={() => onAlignChange('flex-start')} square name="align-left" size={26} color="#fff" />
                    <AlignButton onClick={() => onAlignChange('center')} square name="align-center" size={26} color="#fff" />
                    <AlignButton onClick={() => onAlignChange('flex-end')} square name="align-right" size={26} color="#fff" />
                </AlignButtons>
            </Wrapper>
            <Line onClick={() => changeActiveElement(2)} text="Font settings" active={activeElements[2]} />
            <Wrapper active={activeElements[2]}>
                <FontSettingsWrapper>
                    <Label>
                        Font size:
                        <FontInput onChange={(e) => handleFontChange(e.target.value)} value={fontSize} max="72" min="8" type="number" />
                    </Label>
                    <Label>
                        Font type:
                        <Select value={fontType} onChange={(e) => handleTypeChange(e.target.value)}>
                            <Option value="Lato">Lato</Option>
                            <Option value="Roboto">Roboto</Option>
                        </Select>
                    </Label>
                </FontSettingsWrapper>
            </Wrapper>
        </Container>
    )
}

export default BlockEditText;