import React, { FC } from 'react';
import styled from 'styled-components';

import Scene from '../../components/organisms/Scene';
import Video from '../../components/organisms/Video';
import Controls from '../../components/organisms/Controls';
import TimeLine from '../../components/organisms/TimeLine';
import Modal from '../../components/organisms/Modal';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 872px;
    height: 100vh;
    min-height: 755px;
    background-color: ${({theme}) => theme.primary};
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    height: 500px;
`

const StyledScene = styled(Scene)`
    flex: 1.2;
`

const StyledVideo = styled(Video)`
    flex: 2;
`

const Editor: FC = () => {
    return (
        <Container>
            <Wrapper>
                <StyledScene />
                <StyledVideo />
            </Wrapper>
            <Controls />
            <TimeLine />
            <Modal />
        </Container>
    );
}

export default Editor;
