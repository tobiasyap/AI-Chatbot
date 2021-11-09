import { Masthead } from "sgds-govtech-react/dist/standard";
import "sgds-govtech/css/sgds.css";
import logo from "../assets/logo.png";
import {
  MainNav as MainNavComposable,
  MainNavBrand,
  MainNavItem,
} from "sgds-govtech-react/dist/standard";

const NavBar = () => {
  return (
    <div>
      <MainNavComposable isFluid>
        <MainNavBrand>
          <MainNavItem>
            <img src={logo} alt="lta logo" />
          </MainNavItem>
        </MainNavBrand>
      </MainNavComposable>
      <section className="sgds-section is-small has-background-light">
        <div className="title-name">LTA Chatbot Dashboard</div>
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
