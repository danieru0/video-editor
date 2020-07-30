import { useState, useEffect } from 'react';
import axios from 'axios';
import { PEXEL_API_KEY } from '../config/pexels_api';

interface imagesState {
    photographer: string;
    originalImage: string;
    landscapeImage: string;
}

export const usePexelApi = (query: string) => {
    const [images, setImages] = useState<imagesState[]>([]);
    const [nextPage, setNextPage] = useState('');
    const [prevQuery, setPrevQuery] = useState('');
    const [initNumber, setIinitNumber] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchImages() {
            const url = prevQuery === query 
                ? nextPage
                : `https://api.pexels.com/v1/search?query=${query}`; 
            
            try {
                const result = await axios.get(url, {
                    headers: {
                        'Authorization': PEXEL_API_KEY
                    }
                });

                let newImages: imagesState[] = [];

                for (let key in result.data.photos) {
                    const photo = result.data.photos[key];
                    const imageObject: imagesState = {
                        photographer: photo.photographer,
                        originalImage: photo.src.original,
                        landscapeImage: photo.src.medium
                    }
                    newImages.push(imageObject);
                }

                if (prevQuery === query) {
                    setImages(prev => [...prev, ...newImages]);
                } else {
                    setImages([...newImages]);
                    setPrevQuery(query);
                }

                setNextPage(result.data.next_page);

            } catch (err) {
                setError(err.message);
            }
        }

        fetchImages();
    }, [query, initNumber]); //eslint-disable-line

    const runEffect = () => {
        setIinitNumber(Math.random());
    }

    return {
        images: images,
        error: error,
        fetchNewImages: () => runEffect()
    }
}