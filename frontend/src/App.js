// import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import File from "./components/file.component";
import Header from "./components/Header";
import FooterPage from "./components/Footer";
import AddFile from "./components/add-file.component";
import FileList from "./components/FileList";
import AIChatBot from "./components/AIChatBot";
import Acronyms from "./components/Acronyms";

class App extends Component {
  render() {
    return (
      <Router>
        <Header/>
        {/* <nav className="navbar navbar-expand navbar-dark">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/files"} className="nav-link">
              Files
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
        </nav> */}

        <div>
          <Switch>
          <Route exact path={["/", "/files"]} component={FileList} />
          <Route exact path={"/add"} component={AddFile} />
          <Route exact path={"/files/:id"} component={File} />
          </Switch>
        </div>

        <div>
          <Acronyms/>
        </div>

        <div>
          <AIChatBot/>
        </div>
        <FooterPage/>
      </Router>
    );
  }
}

export default App;
