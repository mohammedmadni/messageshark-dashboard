import React from "react";
import Cookies from "js-cookie";

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Cookies.get('id'),
            name: Cookies.get('name'),
            avatar: Cookies.get('avatar'),
            discriminator: Cookies.get('discriminator'),
            size: 0,
            guilds: []
        }
        this.listServerTile = this.listServerTile.bind(this);
        this.manageServerTile = this.manageServerTile.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_LOAD_GUILD + this.state.id)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    size: data.length,
                    guilds: this.listServerTile(data)
                })
            })
    }

    listServerTile(data) {
        let list = [];
        for (let i = 0; i < data.length; i++) {
            list.push(this.manageServerTile(i, data[i].icon, data[i].name, data[i].id))
        }
        return list;
    }

    manageServerTile(i, icon, name, id) {
        let iconImg
        if (icon == null) {
            iconImg = `https://brandlogos.net/wp-content/uploads/2021/11/discord-logo.png`;
        }
        else {
            iconImg = `https://cdn.discordapp.com/icons/${id}/${icon}.png`
        }
        return (
            <div key={i} className="server-tile">
                <img className="server-icon" src={iconImg} alt="Server-icon" />
                <div className="server-name">{name}</div>
            </div>
        );
    }

    render() {
        return(
            <div className="account-content-container">
                <div className="row account-container">
                    <div>
                        <img className="account-avatar"
                             src={this.state.avatar}
                             alt="User Avatar"/>
                    </div>
                    <div className="account-name-container">
                        <div className="account-name-detail">
                            <h3 className="account-name">{this.state.name}</h3>
                            <h3 className="account-discriminator">#{this.state.discriminator}</h3>
                        </div>
                        <h5 className="account-premium">{this.state.size} servers on your account</h5>
                    </div>
                </div>
                <div className="column account-server-container">
                    <div className="account-header">
                        <h1 className="account-header-name">Servers</h1>
                        <p className="description">Servers you're in ({this.state.size} servers)</p>
                    </div>
                    <div id="server-manage" className="server-manage">
                        {this.state.guilds}
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;