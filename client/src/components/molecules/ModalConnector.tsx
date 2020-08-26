import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { types } from '../../store/actions/types';
import { useTypedSelector } from '../../store/selector';

import WithButton from '../../hoc/withButton';

import ChangeNameModal from '../atoms/ModalTypes/ChangeNameModal';
import ChangeItemColorModal from '../atoms/ModalTypes/ChangeItemColorModal';
import RenderModal from '../atoms/ModalTypes/RenderModal';
import Icon from '../atoms/Icon';

interface ModalConnectorProps {
    type: string | null;
    name: string | null;
}

const IconWithButton = WithButton(Icon);

const Container = styled.div`
    width: auto;
    height: auto;
    font-family: ${({theme}) => theme.Lato};
    box-shadow: 0px 0px 30px #000;
    border-radius: 5px;
`

const Navigation = styled.div`
    width: 100%;
    height: 55px;
    background: ${({theme}) => theme.primary};
    border-bottom: 1px solid ${({theme}) => theme.secondary};
    display: flex;
    padding-left: 15px;
    align-items: center;
    position: relative;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`

const Title = styled.span`
    font-size: 22px;
`

const StyledIcon = styled(IconWithButton)`
    position: absolute;
    right: 10px;
    top: 16px;
`

const ModalButtons = styled.div`
    width: 100%;
    height: 55px;
    background: ${({theme}) => theme.primary};
    border-top: 1px solid ${({theme}) => theme.secondary};
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 14px;
`

const Button = styled.button`
    font-family: ${({theme}) => theme.Lato};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    color: #8fc8f6;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    padding: 6px 8px;
    border-radius: 5px;
    outline: none;

    &:hover {
        background: rgba(144, 202, 249, 0.08);
    }
`

const ModalConnector: FC<ModalConnectorProps> = ({type, name}) => {
    const dispatch = useDispatch();
    const clickedItem = useTypedSelector(state => state.timeline.clickedItem);
    const [newName, setNewName] = useState('');
    const [newColor, setNewColor] = useState('');
    let ModalComponent;
    let navTitle = '';

    switch(type) {
        case 'change-name':
            ModalComponent = ChangeNameModal;
            navTitle = 'Change name';
            break;
        case 'item-color':
            ModalComponent = ChangeItemColorModal;
            navTitle = 'Change color';
            break;
        case 'rendering':
            ModalComponent = RenderModal;
            break;
        default: ModalComponent = null;
    }

    const closeModal = () => {
        dispatch({
            type: types.UPDATE_MODAL_DATA,
            payload: {
                type: null,
                name: null
            }
        })
    }

    const handleNameChange = (name: string) => {
        setNewName(name);
    }

    const handleSaveClick = () => {
        switch(type) {
            case 'change-name':
                return saveName();
            case 'item-color':
                return saveColor();
            default: return null;
        }
    }

    const saveName = () => {
        if (newName.length > 2 && newName.length < 13 && name) {
            dispatch({
                type: types.UPDATE_TRACK_NAME,
                payload: {
                    name: name,
                    newName: newName
                }
            });
            dispatch({
                type: types.UPDATE_CLICKED_ITEM,
                payload: {
                    name: newName,
                    type: clickedItem.type
                }
            })
            closeModal();
        } else {
            alert('Name should have from 3 to 12 characters!');
        }
    }

    const saveColor = () => {
        if (newColor) {
            dispatch({
                type: types.UPDATE_ITEM_COLOR,
                payload: {
                    name: name,
                    color: newColor
                }
            })
        }
    }

    const handleColorChange = (color: string) => {
        setNewColor(color);
    }

    return (
        <Container>
            {   type !== 'rendering' && (
                    <Navigation>
                        <Title>{navTitle}</Title>
                        <StyledIcon onClick={closeModal} color="#535863" name="times" size={26} />
                    </Navigation>
                )
            }
            {
                ModalComponent && <ModalComponent onEnterClick={handleSaveClick} onCloseClick={closeModal} handleColorChange={handleColorChange} handleNameChange={handleNameChange}/>
            }
            {
                type !== 'rendering' && (
                    <ModalButtons>
                        <Button onClick={handleSaveClick}>Save</Button>
                    </ModalButtons>
                )
            }
        </Container>
    )
}

export default ModalConnector;