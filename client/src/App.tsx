import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { types } from './store/actions/types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faVolumeUp, faPause, faForward, faBackward, faPlus, faTrash, faSlidersH, faChevronLeft, faChevronDown, faArrowLeft, faAlignLeft, faAlignCenter, faAlignRight, faTimes, faSearch, faExpand } from '@fortawesome/free-solid-svg-icons'

import Editor from './pages/Editor/Editor';
import { base64 } from './testVideoBase64';

library.add(faPlay, faVolumeUp, faPause, faForward, faBackward, faPlus, faTrash, faSlidersH, faChevronLeft, faChevronDown, faArrowLeft, faAlignLeft, faAlignCenter, faAlignRight, faTimes, faSearch, faExpand);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(base64)
      .then(resp => resp.blob())
      .then(blob => {
        const file = new File([blob], "test video.mp4",{ type: "video/mp4" });

        dispatch({
          type: types.SET_VIDEO_FILE,
          payload: file
        })
      })
  }, [dispatch])

  return (
    <Editor />
  );
}

export default App;
