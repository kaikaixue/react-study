// 引入React
import React from 'react'

import Hello from './components/Hello/Hello'
import Welcome from './components/Welcome/Welcome'
// 创建外壳组件
class App extends React.Component {
    render() {
        return (
            <div>
                <Hello/>
                <Welcome/>
            </div>
        )
    }
}

export default App