import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroll-component';

import {usePexelApi} from '../../../hooks/usePexelApi';

import Icon from '../../atoms/Icon';
import Loader from '../../atoms/Loader/Loader';

interface SceneMediaProps {
    active: boolean;
}

const Container = styled.div<SceneMediaProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: inherit;
    visibility: ${({active}) => active ? 'visible': 'hidden'};
`

const SearchWrapper = styled.div`
    width: 90%;
    height: 50px;
    margin: 0px auto;
    position: relative;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: 30px;
    background-color: #353947;
    border: 2px solid ${({theme}) => theme.secondary};
    padding-left: 45px;
    font-family: ${({theme}) => theme.Lato};
    font-size: 18px;
    color: ${({theme}) => theme.white};
`

const StyledIcon = styled(Icon)`
    position: absolute;
    top: 13px;
    left: 15px;
`

const ImagesWrapper = styled.div`
    margin-top: 15px;
    overflow-y: auto;
`

const Image = styled.img`
    width: 290px;
    margin: 10px;
`

const LoaderWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const ErrorMsg = styled.span`
    color: red;
    font-family: ${({theme}) => theme.Lato};
`

const SceneMedia: FC<SceneMediaProps> = ({active}) => {
    const [searchValue, setSearchValue] = useState('city night');
    const {images, error, fetchNewImages} = usePexelApi(searchValue);

    const handleSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.value !== '' ? setSearchValue(e.currentTarget.value) : setSearchValue('city night');
        }
    }

    return (
        <Container active={active}>
            <SearchWrapper>
                <StyledIcon name="search" size={24} color="#4f565f" />
                <SearchInput onKeyDown={handleSearchInput} placeholder="Search image..." />
            </SearchWrapper>
                <ImagesWrapper id="masonry-wrapper">
                    <InfiniteScroll
                        dataLength={images.length}
                        next={fetchNewImages}
                        hasMore={true}
                        loader={
                            <LoaderWrapper>
                                {
                                    error ? <ErrorMsg>Something went wrong!</ErrorMsg> : <Loader />
                                }
                            </LoaderWrapper>
                        }
                        scrollableTarget="masonry-wrapper"
                        style={{
                            overflow: 'hidden'
                        }}
                    >
                        <Masonry
                            style={{
                                width: '100%',
                                marginTop: '15px'
                            }}
                        >
                            {
                                images.map((item, key) => {
                                    return <Image key={key} src={item.landscapeImage} />
                                })
                            }
                        </Masonry>
                    </InfiniteScroll>
                </ImagesWrapper>
        </Container>
    )
}

export default SceneMedia;