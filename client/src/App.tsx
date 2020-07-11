import React from 'react';
import { useTypedSelector } from './store/selector';
import { useDispatch } from 'react-redux';
import { types } from './store/actions/types';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const text = useTypedSelector(state => state.test);

  console.log(text);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: types.SET_TEST_VALUE,
      payload: {text: e.target.value}
    })
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const videoFile: any = e.target.files;
    formData.append('video', videoFile[0]);
    
    try {
      const result = await axios({
        url: 'upload-video',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(result);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className="App">
      <input onChange={handleInput}></input>
      <input onChange={handleFile} type="file" accept="video/mp4"></input>
    </div>
  );
}

export default App;
