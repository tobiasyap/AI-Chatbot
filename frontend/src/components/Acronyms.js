import { Component } from "react";
import { Nav } from "react-bootstrap";

class Acronym extends Component {
    constructor(props) {
        super(props);    
        this.setActiveLetter = this.setActiveLetter.bind(this);
        this.state = {
            acronyms: {
                A: {
                    AFC: "Automated Fare Collection"
                },
                B: {
                    BR: "Business Requirement",
                },
                F: {
                    FS: "Fare System",
                },
                M: {
                    MSI: "",	
                },
                // QNX: "",
                // RFE: "Request For Enhancement",
                // ROAM: "",	
                // RSE: "Rail/ Road Systems Engineering",	
                // SKMS: "Security Key Management System",	
                // SOW: "Statement of Work",
                // SysArch: "",
                // TEL: "Thomson-East Coast Line"
            },
            currentLetter: ''
        }
    }

    // async componentDidMount() {
    //     await this.refreshData();
    // }

    setActiveLetter = async (letter) => {
        await this.setState({
            currentLetter: letter
        })
    }

    render() {
        const { acronyms, currentLetter } = this.state;

        return (
            <div>
                <div>
                    {/* <Nav variant="tabs" onSelect={this.setActiveLetter}>
                        {acronyms && Object.entries(acronyms).map(letter => (
                        <Nav.Item>
                            <Nav.Link eventKey={letter[0]}>
                                {letter[0]}
                                <div>
                                    {Object.entries(letter[1]).map(arr => (
                                        currentLetter === letter[0] ? (
                                        <ul>
                                            <li key={arr[0]}>
                                                {arr[0]}: {arr[1]}
                                            </li>
                                        </ul>
                                        ) : ( <br/> )
                                    ))}
                                </div>
                            </Nav.Link>          
                        </Nav.Item>
                        ))}                  
                    </Nav>              */}
                </div>
            </div>
        )
    }
}

// export { acronyms };
export default Acronym;
