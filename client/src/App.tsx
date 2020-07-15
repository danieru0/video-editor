import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { types } from './store/actions/types'

import Editor from './pages/Editor/Editor';
import { base64 } from './testVideoBase64';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(base64)
      .then(resp => resp.blob())
      .then(blob => {
        const file = new File([blob], "test video",{ type: "video/mp4" });

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
