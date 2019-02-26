import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

class Submenu extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
         <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small uk-dropdown-nav ">
            <div className="uk-navbar-left">
          <ul className="nav__submenu uk-nav uk-dropdown-nav " >

          <li className="nav__submenu-item " ><Link to="/map">Map</Link></li>
          <li className="nav__submenu-item "><Link to="/protocol">Protocol</Link></li>
          { this.props.auth.isAuthenticated()
            ? <li className="nav__submenu-item "><Link to='/chooseform'>Survey</Link></li>
            : null
          }
          { this.props.auth.isAuthenticated()
            ? <li className="nav__submenu-item "><Link to='/newsurvey'>New Survey</Link></li>
            : null
          }
          { this.props.auth.isAuthenticated()
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
      showAboutMenu: false
    };
  }

handleHover = () => {
    this.setState({ showAboutMenu: true });
  };

  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };

render() {
   return (
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
           { this.props.auth.isAuthenticated()
             ? <li><Link to='/survey'>Survey</Link></li>
             : null
           }
           { this.props.auth.isAuthenticated()
             ? <li><Link to='/newsurvey'>New Survey</Link></li>
             : null
           }
           <li><Link to="/map">Map</Link></li>
           <li><Link to="/protocol">Protocol</Link></li>
           <li>
           { this.props.auth.isAuthenticated()
             ? <Link className="uk-button" to="/profile">Profile</Link>
             : null
           }
           </li>
            </ul>
            </div>
            <div className="uk-navbar-right uk-visible@m">
                { this.props.auth.isAuthenticated()
                  ? <button onClick={ this.props.auth.logout } className="uk-button uk-button-primary">Log Out</button>
                  : <button onClick={ this.props.auth.login } className="uk-button uk-button-primary">Log In</button>
                }
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
                   <div className="uk-navbar-item" style={{textTransform:'uppercase',color:'#999'}} onMouseEnter={this.handleHover}>Menu</div>
                      { this.state.showAboutMenu && <Submenu auth={this.props.auth}/> }
                </li>

              </ul>
            </div>
         </div>
         <div className="uk-hidden@m">
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
            <li>
            { this.props.auth.isAuthenticated()
              ? <button onClick={ this.props.auth.logout } className="uk-button uk-button-primary uk-navbar-item" style={{color:'#fff'}}>Log Out</button>
              : <button onClick={ this.props.auth.login } className="uk-button uk-button-primary uk-navbar-item" style={{color:'#fff'}}>Log In</button>
            }
          </li>
          </ul>
          </div>
          </div>
     </nav>
   )
 }
}

export default Menu
