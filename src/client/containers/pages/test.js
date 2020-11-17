import React, { useContext } from 'react';
import { useHistory } from "react-router";
import { AppContext } from '../../context';
import { ADD_CNT } from '../../reducer/test';

const Test = props => {
  const history = useHistory();
  const { test, dispatchTest } = useContext(AppContext);

  return (
    <div>
      Test!!
      <br/>
      <button onClick={() => {
        dispatchTest({
          type: ADD_CNT,
          cnt: test?.value?.cnt + 1
        });
      }}>확인</button>
      <button onClick={() => {
        history.push('/');
      }}>go to home</button>
      <br/>
      testVal: {test?.value?.cnt}
    </div>
  )
}

export default Test;