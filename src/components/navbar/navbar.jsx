import React from "react";
import logo from "../../assets/imgs/desktop-computer.png";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
const Navbar = (props) => {
  const history = useHistory();

  const backToHome = () => {
    history.push("/doan/doan");
  }
  return (
    <div className="navbar">
      <p className="logo-container" onClick={backToHome}>
        <img className="logo" src={logo}   />
        <b>LAPCENTER</b>
      </p>
    <div className="options">
      <Link to="./" className="option">
        <span> <Icon name="home" /> TRANG CHỦ </span>
      </Link>
      <Link to="./introduct" className="option">
        <span> <Icon name="info circle" /> GIỚI THIỆU </span>
      </Link>
      <Link to="./contact" className="option">
        <span> <Icon name="phone" /> LIÊN HỆ </span>
      </Link>
      <Link to="./login" className="option">
        <span> <Icon name="user" /> LOGIN </span>
      </Link>
      </div>
    </div>
  )
  };

export default Navbar;
