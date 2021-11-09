// For sgds-govtech header components

import { Link } from "react-router-dom";
import { Masthead } from "sgds-govtech-react/dist/standard";
import "sgds-govtech/css/sgds.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavItem,
  MainNavMenuStart,
} from "sgds-govtech-react/dist/standard";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [activeLink, setActiveLink] = useState("/");

  const handleChange = (activeTab) => {
    setActiveTab(activeTab);
    const activeLink = activeTab === "Add File" ? "add" : "files";
    setActiveLink("/" + activeLink);
    console.log(activeLink);
  };

  console.log(activeLink);

  return (
    <div>
      <MainNavComposable isFluid>
        <MainNavMenuStart>
          <MainNavBrand>
            <MainNavItem as={Link} to="/">
              <img src={logo} alt="lta logo" />
            </MainNavItem>
          </MainNavBrand>
          <MainNavItem
            isTab
            as={Link}
            to={"/files"}
            onClick={() => handleChange("Files")}
          >
            Files
          </MainNavItem>
          <MainNavItem
            isTab
            as={Link}
            to={"/add"}
            onClick={() => handleChange("Add File")}
          >
            Add File
          </MainNavItem>
        </MainNavMenuStart>
      </MainNavComposable>
      <section className="sgds-section is-small has-background-light">
        <nav className="sgds-breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href={activeLink}>{activeTab}</a>
            </li>
          </ul>
        </nav>
        <h2 className="title-name">LTA Fare System File Display Tool</h2>
      </section>
    </div>
  );
};

export default function Header() {
  return (
    <div>
      <Masthead />
      <NavBar />
    </div>
  );
}
