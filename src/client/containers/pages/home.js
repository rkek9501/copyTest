import React, { useContext } from 'react';
import { useHistory } from "react-router";
import { AppContext } from '../../context';
import { ADD_CNT } from '../../reducer/test';
import _ from 'lodash';
import moment from 'moment';

const Main = props => {
  const history = useHistory();
  const { test, dispatchTest } = useContext(AppContext);
  let data = ['aa','bb'];
  data = _.concat(data, ['cc']);
  console.log(data, moment().format('YYYYMMDD HH:mm:ss'));
  return (
    <div>
      App!!
      <br/>
      <button onClick={() => {
        dispatchTest({
          type: ADD_CNT,
          cnt: test?.value?.cnt + 1
        });
      }}>확인</button>
      <button onClick={() => {
        history.push('/test');
      }}>go to test</button>
      <br/>
      testVal: {test?.value?.cnt}
    </div>
  )
}

export default Main;