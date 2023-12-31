
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App'
import eruda from 'eruda'
import getBrowserFingerprint from "get-browser-fingerprint"

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'
import './styles/utils.css'

// Init browser console
eruda.init();

// Get Browser fingerprint
document.bfp = getBrowserFingerprint({
    hardwareOnly: true,
});

// Render aplication
const root = createRoot(document.getElementById('root'));
root.render(<App/>);
document.title = "Sabor Vital: Desayunos que cuidan, habitos que elevan"