import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
    handleCheckAll = (e) => {
        this.props.handleCheckAll(e.target.checked)
    }

    clearDone = () => {
        this.props.clearDone()
    }
    render() {
        const { todos } = this.props
        const doneCount = todos.reduce((pre, todo) => { return pre + (todo.done ? 1 : 0) }, 0)
        const totalCount = todos.length

        return (
            <div className='todo-footer'>
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount == totalCount && totalCount != 0 ? true : false} />
                </label>
                <span>
                    <span>已完成{doneCount}</span>/全部{totalCount}
                </span>
                <button className='btn btn-danger' onClick={this.clearDone}>清楚已完成任务</button>
            </div>
        )
    }
}
