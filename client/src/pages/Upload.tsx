import React, { FC } from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { types } from '../store/actions/types';

import getRandomId from '../helpers/getRandomId';

import Icon from '../components/atoms/Icon';

const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#3E4047';
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    position: absolute;
    top: 30px;
    color: ${({theme}) => theme.white};
    font-family: ${({theme}) => theme.Lato};
`

const AppTitle = styled.h1`
    font-size: 30px;
    text-transform: uppercase;
`

const Dropzone = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    padding: 20px;
    width: 600px;
    height: 300px;
    color: ${({theme}) => theme.white};
    font-family: ${({theme}) => theme.Lato};
    background-color: ${({theme}) => theme.secondary};
    border-width: 2px;
    border-radius: 2px;
    border-style: dashed;
    border-color: ${props => getColor(props)};
    outline: none;
    cursor: pointer;
`

const StyledIcon = styled(Icon)`
    margin-bottom: 20px;
`

const Upload: FC = () => {
    const dispatch = useDispatch();

    const handleFileDrop = (file: File[]) => {
        if (file.length !== 0) {
            const newFile = new File([file[0]], getRandomId(), {type: file[0].type});

            dispatch({
                type: types.SET_VIDEO_FILE,
                payload: newFile
            })

        }
    }

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject
    } = useDropzone({accept: 'video/mp4', multiple: false, onDrop: (file) => handleFileDrop(file)});

    return (
        <Container>
            <Wrapper>
                <AppTitle>Video editor</AppTitle>
            </Wrapper>
            <Dropzone {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <input {...getInputProps()}/>
                <StyledIcon name="upload" size={60} color='#fff' />
                <p>Drag and drop mp4 file here, or click to select</p>
            </Dropzone>
        </Container>
    )
}

export default Upload;