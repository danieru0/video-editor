import { useState } from 'react';

interface activeElementsState {
    [x: number]: boolean;
}

export const useDropDownMenu = (activeElementsList: activeElementsState) => {
    const [activeElements, setActiveElement] = useState<activeElementsState>({});

    const handleActiveElementChange = (id: number) => {
        setActiveElement({
            ...activeElements,
            [id]: activeElements[id] === true ? false : true
        })
    }

    return {
        activeElements: activeElements,
        changeActiveElement: (id: number) => handleActiveElementChange(id)
    }
}