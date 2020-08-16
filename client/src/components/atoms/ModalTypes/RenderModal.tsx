import React, { FC } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '../../../store/selector';

import Loader from '../../atoms/LoaderRender/Loader';

interface RenderModalProps {
    onCloseClick: () => void;
}

const Container = styled.div`
    width: 600px;
    height: 500px;
    background: ${({theme}) => theme.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: ${({theme}) => theme.Lato};
`

const RenderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RenderMessage = styled.span`
    color: ${({theme}) => theme.white};
    font-size: 24px;
    padding-top: 30px;
`

const CloseButton = styled.button`
    font-family: ${({theme}) => theme.Lato};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 18px;
    color: #8fc8f6;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    padding: 8px 12px;
    border-radius: 5px;
    outline: none;

    &:hover {
        background: rgba(144, 202, 249, 0.08);
    }
`

const RenderError = styled.span`
    color: red;
    font-size: 24px;
    padding-bottom: 10px;
`

const RenderModal: FC<RenderModalProps> = ({onCloseClick}) => {
    const renderStatus = useTypedSelector(state => state.render.status);
    const renderMessage = useTypedSelector(state => state.render.message);
    const renderError = useTypedSelector(state => state.render.error);

    return (
        <Container>
            {
                renderStatus ? (
                    <RenderWrapper>
                        <Loader />
                        <RenderMessage>{renderMessage}</RenderMessage>
                    </RenderWrapper>
                ) : (
                    <RenderWrapper>
                        {renderError ? <RenderError>{renderError}</RenderError> : <RenderMessage>{renderMessage}</RenderMessage>}
                        <CloseButton onClick={onCloseClick}>Close</CloseButton>
                    </RenderWrapper>
                )
            }
        </Container>
    )
}

export default RenderModal;