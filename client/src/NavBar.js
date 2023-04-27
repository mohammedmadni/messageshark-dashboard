import logo from "./images/logo.jpg";
import React from "react"
import './NavBar.css';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';
class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: Cookies.get('name'),
            avatar: Cookies.get('avatar')
        }
    }
    render() {
        return (
            <nav className="navbar nav-background">
                <ul className="nav-list">
                    <Link className="logo" to="/home">
                        <img src={logo} alt='img'/>
                    </Link>
                    <li><Link to="/manage" className="nav-link">MessageShark Bot</Link></li>
                    <li>
                        <a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer" className="nav-link">Join Our Discord</a>
                    </li>
                    <li><Link to="/command" className="nav-link">Command</Link></li>
                </ul>
                <div className="rightNav">
                    {!this.state.name && (
                        <a className="btn btn-oauth"
                           href={process.env.REACT_APP_API_LOGIN}
                        >Login with Discord</a>
                    )}
                    {this.state.name && (
                        <ul className="nav-list-user">
                            <li><a className="btn"
                                   href={process.env.REACT_APP_API_LOGOUT}>Logout</a></li>
                            <li><p className="user-manage">{this.state.name}</p></li>
                            <li><img className="user-avatar"
                                     src={this.state.avatar}
                                     alt="User Avatar"
                            /></li>
                            <li><Link to="/account" className="btn btn-account">Manage Account</Link></li>
                        </ul>
                    )}
                </div>
            </nav>
        );
    }
}
export default NavBar;