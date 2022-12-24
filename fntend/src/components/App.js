import React from "react";
import {createRoot} from 'react-dom/client';

export default function App() {
    
    return(
    <div>
        app.js
    </div>
    );

}

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<App />);

// ReactDOMClient.createRoot(document.getElementById("app")).render(
//     <App />
// );
