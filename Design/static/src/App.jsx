import React from 'react';
import Main from "./Components/index"
import Report from './Components/report';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const App = () => {
    return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route path="/report/">
                        <Report/>
                    </Route>
                </Switch>
            </Router>
        );
}
export default App;