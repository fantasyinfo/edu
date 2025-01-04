import React, { useEffect, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const TopHeader = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('isLightTheme');
    return savedTheme !== null ? JSON.parse(savedTheme) : true;
  });

  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem('isLightTheme', JSON.stringify(newTheme));
      return newTheme;
    });
  };


  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.add("dark-mode");
    }
  }, [isLightTheme]);

  const logout = () => {
    localStorage.removeItem("studentToken");
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <a className="navbar-brand brand-logo-mini" href="../../index.html">
            <img src="../../assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="mdi mdi-menu"></span>
          </button>

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item dropdown d-none d-lg-block">
              <button
                onClick={logout}
                className="btn btn-danger create-new-button"
                id="createbuttonDropdown"
                data-toggle="dropdown"
                aria-expanded="false"
                href="#"
              >
                Logout
              </button>
            </li>
            <li className="nav-item dropdown d-none d-lg-block ml-4">
              <button title='change theme color' onClick={toggleTheme} className="btn btn-dark">
                {isLightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default TopHeader;
