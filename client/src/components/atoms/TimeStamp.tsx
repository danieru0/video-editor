import React, { FC } from 'react';
import styled from 'styled-components';

interface TimeStampProps {
    onTimeClick: (time: number) => void;
    videoLength: number;
}

const Container = styled.div`
    width: 100%;
    height: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`

const Block = styled.span`
    width: 10px;
    height: 100%;
    background-color: #515663;
`

const TimeStamp: FC<TimeStampProps> = ({onTimeClick, videoLength}) => {
    const handleTimeStampClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let node = e.target as HTMLElement;

        if (node.nodeName === 'SPAN') {
            const parent = node.parentElement;
            if (parent) {
                node = parent;
            }
        }

        const rect = node.getBoundingClientRect();
        const mouseX = e.pageX - rect.x;
        const progress = mouseX * videoLength / node.offsetWidth;
        onTimeClick(progress);
    }
    return (
        <Container onClick={handleTimeStampClick}>
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
        </Container>
    )
}

export default TimeStamp;