import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";
import disImg from "./images/discord.png"
import twtImg from "./images/twitter.png"
import mailImg from "./images/mail.png"
import gitlabImg from "./images/gitlab.png"
class Footer extends React.Component{
    render() {
        return (
            <div className="footer-background">
                <div className="footer-social">
                    <h3>GET IN TOUCH</h3>
                    <div>
                        <a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer"><img src={disImg} alt='discord'/></a>
                        <a href={process.env.REACT_APP_TWITTER_URL} target="_blank" rel="noreferrer"><img src={twtImg} alt='twitter'/></a>
                        <a href={process.env.REACT_APP_MAIL_URL} target="_blank" rel="noreferrer"><img src={mailImg} alt='mail'/></a>
                        <a href={process.env.REACT_APP_GIT_URL} target="_blank" rel="noreferrer"><img src={gitlabImg} alt='gitlab'/></a>
                    </div>
                    <span className="footer-copyright">
                        ©
                        <script>document.write(new Date().getFullYear())</script>
                        2023 Virginia Tech CS4704 - Group 2. All rights reserved.
                    </span>
                </div>
                <ul className="footer-list">
                    <li><h3>Message Shark</h3></li>
                    <li><Link to="/manage" className="footer-link">MessageShark Bot</Link></li>
                    <li><a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer" className="footer-link">Join Our Discord</a></li>
                    <li><Link to="/command" className="footer-link">Command</Link></li>
                    {/* <li><Link to="/help" className="footer-link">Help</Link></li> */}
                </ul>
            </div>
        );
    }
}

export default Footer;