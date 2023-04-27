import React from "react";
import './Components.css';
import logo from "../images/logo.jpg";

const Manage = () => {
    return (
        <div className="page-manage">
            <div className="manage-title">Free Plan!</div>
            <p className="description manage-description">
                Using Message Shark Bot for Free to manage your server.
                It will manage automatically users' message and detect spam.
                Also, using custom command and embeds to make your own bot.
            </p>
            <div className="plan-tile">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="plan-name">Free Plan</div>
                <div className="plan-description">Free for everyone!</div>
                <div className="plan-features" style={{ marginBottom: '2.5em' }}>
                    <div className="plan-feature">
                        <div className="plan-feature-icon">&#x2713;</div>
                        <div className="plan-feature-text">Custom Command</div>
                    </div>
                    <div className="plan-feature">
                        <div className="plan-feature-icon">&#x2713;</div>
                        <div className="plan-feature-text">Custom Embeds</div>
                    </div>
                    <div className="plan-feature">
                        <div className="plan-feature-icon">&#x2713;</div>
                        <div className="plan-feature-text">Reputation System</div>
                    </div>
                    <div className="plan-feature">
                        <div className="plan-feature-icon">&#x2713;</div>
                        <div className="plan-feature-text">AI System</div>
                    </div>
                    <div className="plan-features-stroke"></div>
                </div>
                <div>
                    <a href="http://localhost:47044/api/discord/add" target="_blank" rel="noreferrer" className="btn">Add to Server</a>
                </div>
            </div>
        </div>
    );
};

export default Manage;