import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

class Submenu extends Component {

  render() {
    return (
      <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small uk-dropdown-nav ">
        <div className="uk-navbar-left">
          <ul className="nav__submenu uk-nav uk-dropdown-nav " >

            <li className="nav__submenu-item " ><Link to="/home">Home</Link></li>

            {this.props.auth.isAuthenticated()
              ? <li className="nav__submenu-item "><Link to='/survey'>Add Survey</Link></li>
              : null
            }

            <li className="nav__submenu-item "><Link to="/protocol">Protocol</Link></li>
            <li className="nav__submenu-item "><Link to="/about">About</Link></li>


            {this.props.auth.isAuthenticated()
              ? <li className="nav__submenu-item "><Link to='/profile'>Profile</Link></li>
              : null
            }

          </ul>
        </div>

      </nav>
    )
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth,
      showAboutMenu: false,
      sa: false,
      checked: false
    };
  }

  handleHover = () => {
    this.setState({ showAboutMenu: true });
  };

  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };

  render() {
    if (!this.state.checked) {
      this.props.auth.containsRole('Super Admin')
        .then(res => {
          this.setState({ sa: res, checked: true });
        })
    }
    return (
      <div className="uk-padding-small uk-padding-remove-top">
        <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small">

          <div className="uk-navbar-left uk-visible@m">
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
                ? <li><Link to='/ survey'>Add Survey</Link></li>
                : null
              }

              <li><Link to="/protocol">Protocol</Link></li>
              <li><Link to="/about">About</Link></li>
              {this.props.auth.isAuthenticated()
                ? <li><Link to='/adminPage'>Admin Page</Link></li>
                : null
              }
            </ul>
          </div>

          <div className="uk-navbar-right uk-visible@m">
            <ul className="uk-navbar-nav">
              {this.props.auth.isAuthenticated()
                ? <li><Link to="/profile">Profile</Link></li>
                : <li><button onClick={this.props.auth.login} className="uk-button uk-button-text">Sign Up</button></li>
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
                <li className="nav__menu-item uk-margin-remove-bottom" onMouseLeave={this.handleLeave} >
                  <div className="uk-navbar-item" style={{ textTransform: 'uppercase', color: '#999' }} onMouseEnter={this.handleHover}>Menu</div>
                  {this.state.showAboutMenu && <Submenu auth={this.props.auth} />}
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
