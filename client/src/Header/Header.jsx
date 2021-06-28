/**
 * Header.jsx
 * Creates menu that displays on each page, except the landing page, and allows
 * user to navigate the website. The authentification object is passed through
 * props from App.js, which is used to check if the user is currently logged in
 * and to sign in (links in header depend on status).
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

class Submenu extends Component {
  /**
   * Creates popup menu for when webpage is sufficiently thin.
   * @return JSX code for popup menu
   */
  render() {
    return (
      <nav
        className="uk-navbar uk-navbar-container uk-navbar-transparent
          uk-margin-bottom-small uk-dropdown-nav"
      >
        <div className="uk-navbar-left">
          <ul className="nav__submenu uk-nav uk-dropdown-nav ">

            <li className="nav__submenu-item ">
              <Link to="/home">Home</Link>
            </li>

            {this.props.auth.isAuthenticated()
              ? (
                <>
                  <li className="nav__submenu-item ">
                    <Link to='/survey'>Add Survey</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to='/survey/basic'>Basic Survey</Link>
                  </li>
                </>
              ) : null
            }

            <li className="nav__submenu-item ">
              <Link to="/protocol">Protocol</Link>
            </li>
            <li className="nav__submenu-item ">
              <Link to="/about">About</Link>
            </li>

            {this.props.auth.isAuthenticated()
              ?
              <li className="nav__submenu-item ">
                <Link to='/profile'>Profile</Link>
              </li>
              : null
            }
          </ul>
        </div>
      </nav>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      showAboutMenu: false,
      //superAdmin
      sa: false,
      checked: false
    };
  }

  /**
   * Called when user hovers over "Menu", and allows submenu to show.
   */
  handleHover = () => {
    this.setState({ showAboutMenu: true });
  };

  /**
   * Called when user is no longer hovering over "Menu", and removes submenu.
   */
  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };

  /**
   * JSX code for header for pages. Shows menu and submenu when user hovers
   * over "Menu", which only shows up when webpage is thin.
   * @return JSX code
   */
  render() {
    if (!this.state.checked) {
      this.props.auth.containsRole('Super Admin')
        .then(res => {
          console.log(res);
          this.setState({ sa: res, checked: true });
        })
    }
    
    return (
      <div className="uk-padding-small uk-padding-remove-top">
        <nav
          className="uk-navbar uk-navbar-container uk-navbar-transparent
            uk-margin-bottom-small"
        >
          <div className="uk-navbar-left uk-visible">
            <ul className="uk-navbar-nav">
              <li className="uk-logo">
                <Link to="/home" >
                  <h1 className="uk-text-large uk-margin-remove-bottom">
                    Marine Plastics Monitor
                </h1>
                </Link>
              </li>
              <li><Link to="/home">Home</Link></li>

              {this.props.auth.isAuthenticated()
                ? (
                  <>
                    <li><Link to='/survey'>Add Survey</Link></li>
                    <li><Link to='/basic-survey'>Basic Survey</Link></li>
                  </>
                ) : null
              }

              <li><Link to="/protocol">Protocol</Link></li>
              <li><Link to="/about">About</Link></li>

              {this.props.auth.isAuthenticated() && this.state.sa
                ? <li><Link to='/adminPage'>Admin Page</Link></li>
                : null
              }
            </ul>
          </div>

          <div className="uk-navbar-right uk-visible@m">
            <ul className="uk-navbar-nav">
              { this.props.auth.isAuthenticated() ?
                <li>
                  <button
                    onClick={this.props.auth.logout}
                    className="logOutBtn"
                  >
                    Log Out
                  </button>
                </li>
                : null
              }
              {this.props.auth.isAuthenticated()
                ? <li><Link to="/profile">Profile</Link></li>
                :
                <li>
                  <button
                    onClick={this.props.auth.login}
                    className="uk-button uk-button-text"
                  >
                    Sign Up/Login
                  </button>
                </li>
              }
            </ul>
          </div>

          <div className="uk-hidden@m">
            <div className="uk-navbar-left">
              <ul className="uk-navbar-nav">
                <li className="uk-logo">
                  <Link to="/home" >
                    <h1 className="uk-text-small uk-margin-remove-bottom">
                      Marine Plastics Monitor
                    </h1>
                  </Link>
                </li>
                <li
                  className="nav__menu-item uk-margin-remove-bottom"
                  onMouseLeave={this.handleLeave}
                >
                  <div
                    className="uk-navbar-item"
                    style={{ textTransform: 'uppercase', color: '#999' }}
                    onMouseEnter={this.handleHover}
                  >
                    Menu
                  </div>
                  {this.state.showAboutMenu &&
                    <Submenu auth={this.props.auth}/>}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Menu
