import React, { FC } from 'react';
import styled from 'styled-components';

import VolumeInput from '../molecules/VolumeInput';
import ControlsPlay from '../molecules/ControlsPlay';
import ExportButton from '../atoms/ExportButton';

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: ${({theme}) => theme.secondary};
    display: flex;
    align-items: center;
    padding: 0px 20px;
    justify-content: space-between;
`

const Controls: FC = () => {
    return (
        <Container>
            <VolumeInput />
            <ControlsPlay />
            <ExportButton onClick={() => console.log('export')}/>
        </Container>
    )
}

export default Controls;