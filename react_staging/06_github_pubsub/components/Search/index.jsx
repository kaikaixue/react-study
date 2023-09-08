import React, {
    Component
} from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
    search = () => {

        console.log(this.keyWordElement.value)
        const keyWord = this.keyWordElement.value
        PubSub.publish('atguigu', {
            isFirst: false,
            isLoading: true
        })
        // this.props.updateAppState({isFirst: false, isLoading: true})
        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then((response) => {
            console.log(response.data.items)
            PubSub.publish('atguigu', {
                isLoading: false,
                users: response.data.items
            })
            // this.props.saveUsers(response.data.items)
        }, error => {
            console.log(error.message)
            PubSub.publish('atguigu', {
                isLoading: false,
                err: error
            })
        })
    }

    render() {
        return ( <section className = "jumbotron" >
            <h3 className = "jumbotron-heading" > Search Github Users </h3> <
            div >
            <
            input ref = {
                c => this.keyWordElement = c
            }
            type = "text"
            placeholder = "enter the name you search" / > & nbsp; < button onClick = {
                this.search
            } > Search </button> </div > </section>
        )
    }
}