import React, { FC } from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';

const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: ${({theme}) => theme.secondary};
    margin: 10px 0px;
`

const Track: FC = () => {
    return (
        <Container>
            <Rnd
                style={{
                    position: 'relative',
                    display: 'block',
                    background: 'red'
                }}
                position={{
                    x: 0,
                    y: 0,
                }}
                bounds="parent"
                dragAxis="x"
                size={{
                    width: 134,
                    height: 60
                }}
                enableResizing={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: true,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                  }}
            >

            </Rnd>
        </Container>
    )
}

export default Track;