import React, { FC, useRef, useEffect, useState } from 'react';
import styled, {css} from 'styled-components';

interface dropdownProps {
    name: string | null;
    clientX: number;
    clientY: number;
    type: string;
    index: number;
    onChangeNameClick: (name: string | null) => void;
    onDeleteItemClick: (name: string | null) => void;
    onMoveClick: (name: string | null, type: string, index: number) => void;
    onChangeItemColorClick: (name: string | null) => void;
    onItemEditClick: (name: string | null, type: string) => void;
}

interface ContainerProps {
    x: number;
    y: number;
    visibility: number;
}

interface ListItemProps {
    type?: string;
    visibleByType?: string[] | string;
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
        if (visibleByType) {
            if (visibleByType !== 'any') {
                if (type) {
                    if (type !== '') {
                        if (visibleByType?.includes(type)) {
                            return 'block';
                        } else {
                            return 'none';
                        }
                    } else {
                        return 'none';
                    }
                } else {
                    return 'none';
                }
            } else {
                if (needItem) {
                    return 'block;';
                } else {
                    return 'none;';
                }
            }
        } else {
            return 'block';
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

const SettingsDropdown: FC<dropdownProps> = ({ name, clientX, clientY, type, index, onChangeNameClick, onDeleteItemClick, onMoveClick, onChangeItemColorClick, onItemEditClick }) => {
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

    console.log(type);

    return (
        <Container visibility={yPosition ? 1 : 0} ref={dropdownRef} x={clientX} y={yPosition}>
            <List>
                <ListItem>
                    <ItemButton onClick={() => onChangeNameClick(name)}>change name</ItemButton>
                </ListItem>
                <ListItem visibleByType="any" needItem={type}>
                    <ItemButton onClick={() => onDeleteItemClick(name)}>delete item</ItemButton>
                </ListItem>
                <ListItem visibleByType={['drawtext']} type={type}>
                    <ItemButton onClick={() => onChangeItemColorClick(name)}>change item color</ItemButton>
                </ListItem>
                <ListItem visibleByType={['drawtext', 'overlay']} type={type}>
                    <ItemButton onClick={() => onItemEditClick(name, type)}>Edit item</ItemButton>
                </ListItem>
                <ListItem>
                    <ItemButton onClick={() => onMoveClick(name, 'up', index)}>move up</ItemButton>
                </ListItem>
                <ListItem>
                    <ItemButton onClick={() => onMoveClick(name, 'down', index)}>move down</ItemButton>
                </ListItem>
            </List>
        </Container>
    )
}

export default SettingsDropdown;