import React, { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/actions/types';

import WithButton from '../../../hoc/withButton';

import Icon from '../../atoms/Icon';
import BlockItemEdit from '../../atoms/BlockItemEdit';
import BlockTextEdit from '../../atoms/BlockTextEdit';

const ButtonIcon = WithButton(Icon);

interface SceneItemEditProps {
    type: string;
    name: string;
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

const Navigation = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.secondary};
    position: relative;
`

const StyledIcon = styled(ButtonIcon)`
    position: absolute;
    left: 10px;
    top: 11px;
`

const Text = styled.span`
    font-size: 22px;
    color: ${({theme}) => theme.white};
    font-family: ${({theme}) => theme.Lato};
    justify-self: center;
    text-transform: uppercase;
`

const SceneItemEdit: FC<SceneItemEditProps> = ({type, name}) => {
    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch({
            type: types.UPDATE_CLICKED_ITEM,
            payload: {
                name: '',
                type: ''
            }
        })
    }

    const handleColorChange = (color: string, type: string) => {
        switch(type) {
            case 'block':
                return dispatch({
                    type: types.UPDATE_ITEM_COLOR,
                    payload: {
                        name: name,
                        color: color
                    }
                })
            case 'text':
                return dispatch({
                    type: types.UPDATE_TEXT_OPTIONS,
                    payload: {
                        name: name,
                        textColor: color
                    }
                })
            default: return false;
        }
    }

    const handleAlignChange = (type: string) => {
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS,
            payload: {
                name: name,
                textAlign: type
            }
        })
    }

    const handleTextChange = (text: string) => {
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS,
            payload: {
                name: name,
                text: text
            }
        })
    }

    const handleFontChange = (size: string) => {
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS,
            payload: {
                name: name,
                fontSize: size
            }
        })
    }

    const handleFontTypeChange = (type: string) => {
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS,
            payload: {
                name: name,
                fontFamily: type
            }
        })
    }

    const EditComponent = () => {
        switch(type) {
            case 'text':
                return <BlockTextEdit name={name} onFontTypeChange={handleFontTypeChange} onFontChange={handleFontChange} onTextChange={handleTextChange} onAlignChange={handleAlignChange} onColorChange={(color: string) => handleColorChange(color, 'text')} />
            case 'image':
                return null;
            default:
                return <BlockItemEdit name={name} onColorChange={(color: string) => handleColorChange(color, 'block')} />
        }
    }

    return (
        <Container>
            <Navigation>
                <StyledIcon onClick={handleBackClick} size={24} color="#fff" name="arrow-left" />
                <Text>{name}</Text>
            </Navigation>
            <EditComponent />
        </Container>
    )
}

export default SceneItemEdit;