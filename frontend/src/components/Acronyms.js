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
// import { Slide, Fade } from "react-awesome-reveal";
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
        {/* <div class="side-nav"> */}
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
              {/* // <Nav variant="tabs" onSelect=s{this.setActiveLetter} className="side-drawer"> */}
              <div className="col">
                <h4>List of Acronyms</h4>
                {/* </div> */}
                {acronyms &&
                  Object.entries(acronyms).map((letter) => (
                    <Nav.Item>
                      <Nav.Link eventKey={letter[0]}>
                        {letter[1]["open"] ? (
                          <div>
                            <Dropdown.Divider />
                            {/* <div className="letter-acr"> */}
                            <strong className="letter">
                              {" "}
                              {letter[0]}{" "}
                            </strong>{" "}
                            <FaChevronUp />
                            {/* </div> */}
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
                            {/* <Dropdown.Divider /> */}
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
          {/* <Button className='float-btn-open' onClick={this.drawerClick}>
                            <FaChevronLeft/>
                        </Button> */}
          {/* </Fade> */}
          {/* </Slide> */}
          <div>
            {drawerOpen ? (
              <div className="backdrop" onClick={this.backdropClick} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* <div className="backdrop" onClick={this.backdropClick}/> </div> ) : ( <div/>) } */}
        {/* {backdrop} </div> ) : (<div/>) } */}
      </div>
    );
  }
}

export default Acronym;
