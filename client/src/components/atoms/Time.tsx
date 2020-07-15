import React, { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../themes/theme';

interface TimeProps {
    time: number;
}

const TimeSpan = styled.span`
    color: ${theme.time};
    font-family: ${theme.Lato};
    letter-spacing: 3px;
    font-size: 18px;
`

const Time: FC<TimeProps> = ({ time }) => {
    const date = new Date(0);
    date.setSeconds(time);
    const timeString = date.toISOString().substr(11, 8);
    return (
        <TimeSpan>
            {timeString}
        </TimeSpan>
    )
}

export default Time;