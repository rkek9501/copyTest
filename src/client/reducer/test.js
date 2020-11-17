const ADD_CNT = 'ADD_CNT';

const initialTestState = {
  value: {
    cnt: 0
  }
};

function testReducer(state, action) {
  switch (action.type) {
    case ADD_CNT:
      return {
        ...state,
        value: {
          cnt: action.cnt
        }
      };
    default:
      return state;
  }
}

export {
  ADD_CNT,
  initialTestState,
  testReducer
}