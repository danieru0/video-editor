import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../store/selector';

import ModalConnector from '../molecules/ModalConnector';

interface ContainerProps {
    visible: boolean;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.3);
    z-index: 9999999;
    display: ${({visible}) => visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
`

const Modal: FC = () => {
    const modalData = useTypedSelector(state => state.modal.modalData);

    return (
        <Container visible={modalData.name ? true : false}>
            <ModalConnector name={modalData.name} type={modalData.type} />
        </Container>
    )
}

export default Modal;