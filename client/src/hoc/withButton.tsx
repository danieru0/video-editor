import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
`

export const withButton = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: any) => {
        const { onClick } = props;
        return (
            <Button onClick={onClick}>
                <Component {...props} />
            </Button>
        )
    }
}


export default withButton;