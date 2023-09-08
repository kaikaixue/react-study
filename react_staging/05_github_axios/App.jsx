import React, { Component } from "react";
import './App.css'

import Search from "./components/Search";
import List from "./components/List";
export default class App extends Component {
    state= {
        users: [],
        isFirst: true,
        isLoading: false,
        err: '',
    }

    updateAppState = (stateObj) => {
        this.setState(stateObj);
    }

    saveUsers = (users) => {
        this.setState({users: users});
    }
    render() {
        return (
            <div className="container">
                <Search saveUsers={this.saveUsers} updateAppState={this.updateAppState}/>
                <List {...this.state}/>
            </div>
        )
    }
}