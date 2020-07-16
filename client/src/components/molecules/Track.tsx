import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: ${({theme}) => theme.secondary};
    margin: 10px 0px;
`

const Track: FC = () => {
    return (
        <Container>

        </Container>
    )
}

export default Track;