import React from "react";
import botImg from "../images/botimg.png"

const Home = () => {
    return (
        <div className="row">
            <div className="column is-half">
                <div className="home-title">
                    The Discord Bot to manage your server efficiently
                </div>
                <div className="description home-description">
                    MessageShark is a fully functional community moderator and assistant tool for Discord servers. MessageShark has a full suite of moderation tools including an upgraded ModMail, punishment management for inappropriate content, a reputation system and advanced spam detection.
                </div>
                <div className="home-btn">
                    <a href="http://localhost:47044/api/discord/add" target="_blank" rel="noreferrer" className="btn">Add to Server</a>
                </div>
            </div>
            <div className="column is-15 home-image">
                <img src={botImg} alt="botimage" />
            </div>
        </div>
    );
};

export default Home;