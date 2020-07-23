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
    left: 5px;
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
                    type: types.UPDATE_TEXT_OPTIONS_COLOR,
                    payload: {
                        name: name,
                        color: color
                    }
                })
            default: return false;
        }
    }

    const handleAlignChange = (type: string) => {
        dispatch({
            type: types.UPDATE_TEXT_OPTIONS_ALIGN,
            payload: {
                name: name,
                align: type
            }
        })
    }

    const EditComponent = () => {
        switch(type) {
            case 'text':
                return <BlockTextEdit name={name} onAlignChange={handleAlignChange} onColorChange={(color: string) => handleColorChange(color, 'text')} />
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