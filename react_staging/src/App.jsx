import React, { Component } from "react";
import './App.css'
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
export default class App extends Component {
    state = {
        todos: [
            {id: '001', name: '吃饭', done: true},
            {id: '002', name: '睡觉', done: true},
            {id: '003', name: '写代码', done: false},
        ],
    }

    addTodo = (todoObj) => {
        const {todos} = this.state
        const newTodos = [todoObj, ...todos]
        this.setState({todos: newTodos})
    }


    changeTodo = (id, done) => {
        console.log(id, done)
        const {todos} = this.state
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {...todo, done: done}
            } else {
                return todo
            }
        })
        this.setState({todos: newTodos})
    }

    deleteTodo = (id) => {
        const {todos} = this.state
        const newTodos = todos.filter(todo => todo.id !== id)
        this.setState({todos: newTodos})
    }

    handleCheckAll = (done) => {
        console.log('done', done)
        const {todos} = this.state
        const newTodos = todos.map(todo => ({
            ...todo, done: done
        }))
        this.setState({todos: newTodos})
    }

    clearDone = () => {
        const {todos} = this.state
        const newTodos = todos.filter(todo =>!todo.done)
        this.setState({todos: newTodos})
    }

    render() {
        const {todos} = this.state
        return( <div className="todo-container">
            <div className="todo-wrap">
                <Header addTodo={this.addTodo}/>
                <List todos={todos} changeTodo={this.changeTodo} deleteTodo={this.deleteTodo}/>
                <Footer todos={todos} handleCheckAll={this.handleCheckAll} clearDone={this.clearDone}/>
            </div>
        </div>);
    }
}
