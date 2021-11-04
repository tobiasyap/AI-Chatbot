import { Link } from "react-router-dom";
import { Masthead } from "sgds-govtech-react/dist/standard";
import "sgds-govtech/css/sgds.css";
import logo from "../assets/logo.png";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavItem,
  MainNavMenuStart,
  MainNavMenuEnd,
} from "sgds-govtech-react/dist/standard";

const NavBar = () => {
  return (
    <MainNavComposable isFluid>
      {/* <MainNavMenu expand={showNavMenu}> */}
      <MainNavMenuStart>
        <MainNavItem as={Link} to={"/files"}>
          Files
        </MainNavItem>
        <MainNavItem as={Link} to={"/add"}>
          Add File
        </MainNavItem>
      </MainNavMenuStart>
      <MainNavMenuEnd>
        <MainNavBrand>
          <MainNavItem as={Link} to="/">
            <img src={logo} alt="lta logo" />
          </MainNavItem>
        </MainNavBrand>
      </MainNavMenuEnd>
    </MainNavComposable>
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
