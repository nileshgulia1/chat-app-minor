import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from "../registerServiceWorker";

import Root from './Root';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line
    const NextRoot = require('./Root').default
    ReactDOM.render(
      <NextRoot />,
      document.getElementById('root')
    )
  })
}
registerServiceWorker();
