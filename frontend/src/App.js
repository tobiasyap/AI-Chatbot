// Main Application Page

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Header";
import FooterPage from "./components/Footer";
import AddFile from "./components/AddFile";
import FileList from "./components/FileList";
import AIChatBot from "./components/AIChatBot";
import Acronyms from "./components/Acronyms";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path={["/", "/files"]} component={FileList} />
            <Route exact path={"/add"} component={AddFile} />
            {/* below can be extended for viewing file in another page */}
            {/* <Route exact path={"/files/:id"} component={File} /> */}
          </Switch>
        </div>
          <Acronyms />
          <AIChatBot />
        <FooterPage />
      </Router>
    );
  }
}

export default App;
