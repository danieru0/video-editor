import React, { FC } from 'react';
import styled from 'styled-components';

import Scene from '../../components/organisms/Scene';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.primary};
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    height: 600px;
`

const StyledScene = styled(Scene)`
    flex: 1.2;
`

const Dummy = styled.div`
    height: 100%;
    flex: 2;
`

const Editor: FC = () => {
    return (
        <Container>
            <Wrapper>
                <StyledScene />
                <Dummy />
            </Wrapper>
        </Container>
    );
}

export default Editor;
