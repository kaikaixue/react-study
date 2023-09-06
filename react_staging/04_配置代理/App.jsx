import React, {Component} from "react";
import axios from "axios";
export default class App extends Component {

  getStudentData = () => {
    axios.get('http://localhost:3000/api1/students').then(res => {
      console.log(res.data)
    }, error => {console.log(error, '失败了')})
  }
  getCarsData = () => {
    axios.get('http://localhost:3000/api2/cars').then(res => {
      console.log(res.data)
    }, error => {console.log(error, '失败了')})
  }

  render() {
    return (
      <div>
        <button onClick={this.getStudentData}>点击获取学生数据</button>
        <button onClick={this.getCarsData}>点击获取汽车数据</button>
      </div>
    )
  }
}