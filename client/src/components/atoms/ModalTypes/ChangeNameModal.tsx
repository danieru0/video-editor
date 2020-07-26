import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface ChangeNameModalProps {
    handleNameChange: (name: string) => void;
}

interface InputProps {
    error: boolean;
}

const Container = styled.div`
    width: 400px;
    height: 100px;
    background: #424242;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Input = styled.input<InputProps>`
    width: 80%;
    height: 60%;
    background: none;
    border: none;
    border-bottom: 1px solid ${({error}) => error ? 'red' : '#fff'};
    transition: border 0.3s;
    font-size: 24px;
    outline: none;
    color: #fff;
`

const ChangeNameModal: FC<ChangeNameModalProps> = ({handleNameChange}) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        handleNameChange(value);

        if (value.length < 3 || value.length > 12) {
            setError(true);
        } else {
            setError(false);
        }
    }

    return (
        <Container>
            <Input error={error} placeholder="New name" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} />
        </Container>

    )
}

export default ChangeNameModal;