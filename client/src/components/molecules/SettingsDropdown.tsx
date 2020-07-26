import React, { FC, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

interface dropdownProps {
    name: string | null;
    clientX: number;
    clientY: number;
    type: string | undefined;
    onChangeNameClick: (name: string | null) => void;
}

interface ContainerProps {
    x: number;
    y: number;
    visibility: number;
}

interface ListItemProps {
    type?: string | undefined;
    visibleByType?: string;
    needItem?: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: auto;
    border: 2px solid #000;
    border-top: 1px solid #000;
    position: absolute;
    left: ${({x}) => `${x}px`};
    top: ${({y}) => `${y}px`};
    z-index: 99;
    visibility: ${({visibility}) => visibility ? 'visible' : 'hidden'};
`

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ListItem = styled.li<ListItemProps>`
    width: 100%;
    height: 40px;
    border-top: 1px solid #000;
    display: ${({visibleByType, type, needItem}) => {
        if (visibleByType !== 'any') {
            if (visibleByType === type) {
                return 'block;';
            } else {
                return 'none;';
            }
        } else {
            if (needItem) {
                return 'block';
            } else {
                return 'none';
            }
        }
    }}
`

const ItemButton = styled.button`
    width: 100%;
    height: 100%;
    border: none;
    cursor: pointer;
    background: #233142;
    color: #fff;
    font-family: Lato;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 16px;
    outline: none;

    &:hover {
        background: #344252;
    }
`

const SettingsDropdown: FC<dropdownProps> = ({ name, clientX, clientY, type, onChangeNameClick }) => {
    const [yPosition, setYPosition] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dropdownRef.current) {
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const dropdownPosition = dropdownHeight + clientY;
            
            if (dropdownPosition >= window.innerHeight) {
                setYPosition(clientY - dropdownHeight);
            } else {
                setYPosition(clientY);
            }
        }
    }, [dropdownRef, clientY, setYPosition]);

    return (
        <Container visibility={yPosition ? 1 : 0} ref={dropdownRef} x={clientX} y={yPosition}>
            <List>
                <ListItem>
                    <ItemButton onClick={() => onChangeNameClick(name)}>change name</ItemButton>
                </ListItem>
                <ListItem visibleByType="any" needItem={type}>
                    <ItemButton>delete item</ItemButton>
                </ListItem>
                <ListItem visibleByType="drawtext" type={type}>
                    <ItemButton>change item color</ItemButton>
                </ListItem>
                <ListItem>
                    <ItemButton>move up</ItemButton>
                </ListItem>
                <ListItem>
                    <ItemButton>move down</ItemButton>
                </ListItem>
            </List>
        </Container>
    )
}

export default SettingsDropdown;