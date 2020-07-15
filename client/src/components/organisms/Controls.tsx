import React, { FC } from 'react';
import styled from 'styled-components';

import VolumeInput from '../molecules/VolumeInput';

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${({theme}) => theme.secondary};
    display: flex;
    align-items: center;
    padding: 0px 20px;
`

const Controls: FC = () => {
    return (
        <Container>
            <VolumeInput />
        </Container>
    )
}

export default Controls;