import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'
export default class List extends Component {

    state= {
        users: [],
        isFirst: true,
        isLoading: false,
        err: '',
    }

    componentDidMount() {
        this.token = PubSub.subscribe('atguigu', (_,data) => {
            console.log(data)
            this.setState(data)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        const { users, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
					isLoading ? <h2>Loading......</h2> :
					err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map(user => {
                        return (
                            <div className="card">
                                <a href="{user.html_url}" target="_blank">
                                    <img src="{user.avatar_url}" style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{user.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
