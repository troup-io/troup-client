import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// const m = module as any;

// if (m.hot) {
//     m.hot.accept('./App', () => {
//         // eslint-disable-next-line @typescript-eslint/no-var-requires
//         const NextApp = require('./App').default;
//         render(NextApp);
//     });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
