import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// load goolge font OpenSans with cyrillic extention
window.WebFontConfig = {
    google: { families: [ 'Open+Sans::cyrillic-ext' ] }
};
(function() {
    const wf = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    s.parentNode.insertBefore(wf, s);
})();

// Render react app
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
