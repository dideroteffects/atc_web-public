import { Grid } from "@material-ui/core";
import React from "react";
import {createRoot} from 'react-dom/client';

export default function App() {
    
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} align="center"
                    style={{ backgroundColor: '', height: 50 }}>
                    
                </Grid>
            </Grid>
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
