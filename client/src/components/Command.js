import React from "react";

class Command extends React.Component {
    constructor(props) {
        super(props);
        this.selectedMenu = this.selectedMenu.bind(this);
        this.state = {
            commands: [],
            type: ""
        }
    }

    componentDidMount() {
        Promise.all([
            fetch("/cmd1.json").then(value => value.json()),
            fetch("/cmd2.json").then(value => value.json()),
            fetch("/cmd3.json").then(value => value.json()),
            fetch("/cmd4.json").then(value => value.json())
        ]).then(([d1, d2, d3, d4]) => {
            this.setState({
                commands: [d1, d2, d3, d4],
                type: this.selectedMenu(d1)
            })
        })
    }

    onMenuSelect(e) {
        this.setState({
            type: this.selectedMenu(this.state.commands[e])
        })
        this.changeSelectedMenu(e);
    }

    changeSelectedMenu(e) {
        const menu0 = document.getElementById("menu0");
        const menu1 = document.getElementById("menu1");
        const menu2 = document.getElementById("menu2");
        const menu3 = document.getElementById("menu3");
        const menu = [menu0, menu1, menu2, menu3];
        for (let i = 0; i < menu.length; i++) {
            if (i === e) {
                menu[i].className = "command-tab-clicked";
            }
            else {
                menu[i].className = "command-tab";
            }
        }
    }

    selectedMenu(cmd) {
        let selected = [];
        for (let i = 0; i < cmd.length; i++) {
            selected.push(this.commandColumn(cmd[i].id, cmd[i].command, cmd[i].description, cmd[i].usage));
        }
        return selected;
    }

    commandColumn(id, cmd, des, use) {
        return (
            <div key={id} className="command-column">
                <div className="is-15 command-text-primary">{cmd}</div>
                <div className="is-half">{des}</div>
                <div className="is-35 description">{use}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="column command-selector">
                    <div className="command-title">
                        <h1>Commands</h1>
                        <div className="description">List of bot commands</div>
                    </div>
                    <aside className="command-menu">
                        <ul className="command-menu-list">
                            <li><div id="menu0" className="command-tab-clicked" onClick={() => this.onMenuSelect(0)}>Server Manage</div></li>
                            <li><div id="menu1" className="command-tab" onClick={() => this.onMenuSelect(1)}>Level</div></li>
                            <li><div id="menu2" className="command-tab" onClick={() => this.onMenuSelect(2)}>Feature</div></li>
                            <li><div id="menu3" className="command-tab" onClick={() => this.onMenuSelect(3)}>Embed Message</div></li>
                        </ul>
                    </aside>
                </div>
                <div className="command-table-container">
                    <div className="command-table">
                        <div className="command-table-header">
                            <div className="is-15">Command</div>
                            <div className="is-half">Description</div>
                            <div className="is-15">Usage</div>
                        </div>
                        <div id="command-table-columns">
                            {this.state.type}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Command;