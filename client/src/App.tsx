import React from 'react';
import { useTypedSelector } from './store/selector';
import { useDispatch } from 'react-redux';
import { types } from './store/actions/types';

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

  return (
    <div className="App">
      <input onChange={handleInput}></input>
    </div>
  );
}

export default App;
