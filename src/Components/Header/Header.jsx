import Titlebar from "./Titlebar";
import Navbar from "./Navbar";

import "./Header.modules.css"

function Header({ user }) {
  return (
    <>
      <Titlebar user={user}/>
      <Navbar user={user}/>
    </>
  );
}

export default Header;
