import React, { FC, useState, SyntheticEvent } from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroll-component';

import {usePexelApi} from '../../../hooks/usePexelApi';

import WithButton from '../../../hoc/withButton';

import Icon from '../../atoms/Icon';
import Loader from '../../atoms/Loader/Loader';

interface ContainerProps {
    active: boolean;
}

interface SceneMediaProps extends ContainerProps {
    onItemClick: (e: SyntheticEvent<HTMLDivElement>, itemType: string, type: string, image?: string) => void;
}

const Container = styled.div<ContainerProps>`
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

const PexelsLink = styled.a`
    position: absolute;
    top: -16px;
    left: 26px;
    font-size: 12px;
    text-decoration: none;
    font-style: italic;
    color: grey;
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

const ImageButton = WithButton(Image);

const StyledImageButton = styled(ImageButton)`
    padding: 0;
`

const SceneMedia: FC<SceneMediaProps> = ({active, onItemClick}) => {
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
                <PexelsLink target="_blank" href="https://www.pexels.com/">pictures from - pexels.com</PexelsLink>
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
                                    return <StyledImageButton onClick={(e: SyntheticEvent<HTMLDivElement>) => onItemClick(e, 'image', 'image', item.originalImage)} key={key} src={item.landscapeImage} />
                                })
                            }
                        </Masonry>
                    </InfiniteScroll>
                </ImagesWrapper>
        </Container>
    )
}

export default SceneMedia;