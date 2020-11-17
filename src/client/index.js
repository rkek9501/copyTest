import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
const path = require('path');

ReactDOM.render(<App />, document.getElementById('app'));

console.log("IS_TEST",process.env.IS_TEST);
if (process.env.IS_TEST && module.hot) {
  console.log("test mode!");
  module.hot.accept(path.resolve(__dirname, './public/js')  , function() {

    console.log('Accepting the updated printMe module!');
  })
}
