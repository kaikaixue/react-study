import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
    search = () => {
        // console.log(this.keyWordElement.value)
        const keyWord = this.keyWordElement.value
        this.props.updateAppState({isFirst: false, isLoading: true})
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then((response) => {
            console.log(response.data.items)
            this.props.updateAppState({isLoading: false, users: response.data.items})
            // this.props.saveUsers(response.data.items)
        }, error => {
            console.log(error.message)
            this.props.updateAppState({isLoading: false, err: error})
        })
    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={c => this.keyWordElement = c} type="text" placeholder="enter the name you search" />&nbsp;<button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
