import React, { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/actions/types';

import WithButton from '../../../hoc/withButton';

import Icon from '../../atoms/Icon';
import BlockItemEdit from '../../atoms/BlockItemEdit';

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
    top: 10px;
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

    const handleColorChange = (color: string) => {
        dispatch({
            type: types.UPDATE_ITEM_COLOR,
            payload: {
                name: name,
                color: color
            }
        })
    }

    const EditComponent = () => {
        switch(type) {
            case 'text':
                return <p>siema</p>
            default:
                return <BlockItemEdit name={name} onColorChange={handleColorChange} />
        }
    }

    return (
        <Container>
            <Navigation>
                <StyledIcon onClick={handleBackClick} size={30} color="#fff" name="IoIosArrowBack" />
                <Text>{name}</Text>
            </Navigation>
            <EditComponent />
        </Container>
    )
}

export default SceneItemEdit;