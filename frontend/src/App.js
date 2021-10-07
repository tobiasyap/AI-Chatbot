// import logo from './logo.svg';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import File from "./components/file.component";
import AddFile from "./components/add-file.component";
import FileList from "./components/file-list.component"

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
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
        </nav>

        <div className="container mt-3">
          <Switch>
          <Route exact path={["/", "/files"]} component={FileList} />
          <Route exact path={"/add"} component={AddFile} />
          <Route exact path={"/files/:id"} component={File} />
          </Switch>
        </div>
      </Router>

      // insert chatbot component
    );
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
