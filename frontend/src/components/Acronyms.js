// For displaying Acronyms at the side tab

import { Component } from "react";
import { Button } from "react-bootstrap";
import {
  FaChevronRight,
  FaChevronLeft,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { Nav, Dropdown } from "react-bootstrap";
import { acronymData } from "./AcronymData";
import "./Acronyms.css";

class Acronym extends Component {
  constructor(props) {
    super(props);
    this.setActiveLetter = this.setActiveLetter.bind(this);
    this.drawerClick = this.drawerClick.bind(this);
    this.backdropClick = this.backdropClick.bind(this);
    this.state = {
      acronyms: acronymData,
      currentLetter: "",
      drawerOpen: false,
    };
  }

  drawerClick = async () => {
    await this.setState((prevState) => {
      return {
        drawerOpen: !prevState.drawerOpen,
      };
    });
  };

  backdropClick = async () => {
    await this.setState({
      drawerOpen: false,
    });
  };

  setActiveLetter = async (letter) => {
    var updateAcronyms = { ...this.state.acronyms };
    updateAcronyms[letter].open = !updateAcronyms[letter].open;
    await this.setState({
      currentLetter: letter,
      acronyms: updateAcronyms,
    });
  };

  render() {
    const { acronyms, drawerOpen } = this.state;

    return (
      <div>
        {drawerOpen ? (
          <Button className="float-btn-open" onClick={this.drawerClick}>
            <FaChevronLeft />
          </Button>
        ) : (
          <Button className="float-btn" onClick={this.drawerClick}>
            Acronyms <FaChevronRight />
          </Button>
        )}
        <div>
          <div>
            <Nav
              variant="tabs"
              onSelect={this.setActiveLetter}
              className={drawerOpen ? "side-drawer open" : "side-drawer"}
            >
              <div className="col">
                <strong className="title-name">List of Acronyms</strong>
                {acronyms &&
                  Object.entries(acronyms).map((letter) => (
                    <Nav.Item>
                      <Nav.Link eventKey={letter[0]}>
                        {letter[1]["open"] ? (
                          <div>
                            <Dropdown.Divider />
                            <strong className="letter">
                              {" "}
                              {letter[0]}{" "}
                            </strong>{" "}
                            <FaChevronUp />
                            <ul className="list-group">
                              {Object.entries(letter[1]["names"]).map((acr) => (
                                <div>
                                  <li className="list-item" key={acr[0]}>
                                    <Dropdown.Divider />
                                    {acr[0]}: {acr[1]}
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <strong className="letter">
                              {" "}
                              {letter[0]}{" "}
                            </strong>{" "}
                            <FaChevronDown />{" "}
                          </div>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
              </div>
            </Nav>
          </div>
          <div>
            {drawerOpen ? (
              <div className="backdrop" onClick={this.backdropClick} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Acronym;
