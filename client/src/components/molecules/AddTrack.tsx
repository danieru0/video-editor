import React, { FC } from 'react';
import styled from 'styled-components';

import Icon from '../atoms/Icon';

interface AddTrackProps {
    onClick: () => void;
}

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
`

const Span = styled.span`
    font-family: ${({theme}) => theme.Lato};
    font-size: 16px;
    margin-left: 8px;
    text-transform: uppercase;
    color: ${({theme}) => theme.addTrack};
    font-weight: bold;
    letter-spacing: 1px;
`

const StyledIcon = styled(Icon)`
    margin-top: 4px;
`

const AddTrack: FC<AddTrackProps> = ({onClick}) => {
    return (
        <Button onClick={onClick}>
            <StyledIcon name="IoIosAdd" size={20} color="#5DA3D0" />
            <Span>Add track</Span>
        </Button>
    )
}

export default AddTrack;