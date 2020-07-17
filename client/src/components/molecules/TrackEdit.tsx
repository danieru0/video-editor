import React, { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../../themes/theme';

import WithButton from '../../hoc/withButton';

import TrackText from '../atoms/TrackText';
import Icon from '../atoms/Icon';

interface TrackEditProps {
    name: string;
}

const Container = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
`

const Wrapper = styled.div`
    display: flex;
    width: 80px;
    justify-content: space-between;
`

const WithButtonIcon = WithButton(Icon);

const TrackEdit: FC<TrackEditProps> = ({name}) => {
    return (
        <Container>
            <TrackText text={name} color={theme.trackText} />
            <Wrapper>
                <WithButtonIcon onClick={() => console.log('ye')} square name="IoIosSettings" color="#fff" size={26} />
                <WithButtonIcon onClick={() => console.log('ye')} square name="IoIosTrash" color="#fff" size={26} />
            </Wrapper>
        </Container>
    )
}

export default TrackEdit;