import React from 'react';
import ReactDOM from 'react-dom';

import "./style.css"
//react的数据不可变，只能生成新的数据代替原始数据，达到改变的假象和效果
//react多数操作新数据的函数都是异步的，他不会马上改变数据的值
function App() {
    const a = "100块都不给你"
    return (
        <div className="App">
            爸爸<br/>
            我是爸爸，你猜我有多少money
            <hr/>
            <Son messageForSon={a}/>
            {/*""里写字符串，在{}里写对象或表达式*/}
        </div>
    );
}

//类组件，操作props数据要比函数件多加个this
class Son extends React.Component {
    constructor() {//初始化
        super();
        this.state = {//内部数据state
            n: 0, m: 0//类组件有多个元素时会合并，不会互相影响
        };
    }

    // add() {// 类组件调用内部数据state
    //     // this.state.n+=1 /不行
    //     // this.setState({n: this.state.n + 100}); /这样是模板，但是牛逼的前端把他写成一个函数↓ ↓ ↓  因为他是一个异步函数console.log会出现bug
    //     //this.setState((state, props) => {return {n: state.n + 100}})第一种写法，适合简单数据形式
    //     this.setState(state => {//旧的n
    //         const n = state.n + 100 //新的n
    //         console.log(n)
    //         return {n}
    //     })//第二种写法，适合复杂数据形式
    // }   //Es6出了最新写法↓
    add = () => this.setState({n: this.state.n + 100})

    render() {
        return (
            <div className="Son">
                儿子 money:{this.state.n}<br/>
                我是儿子,我爸对我说[{this.props.messageForSon}]
                <button onClick={() => this.add()}>想要100块</button>
                <Grandson messageForGrandSon="狗腿子你好"/>
            </div>
        );
    }
}

//函数组件
const Grandson = (props) => {//调用外部数据props
    // const array = React.useState(0); /React.useState(0)：n的初始值为0
    // const n = array[0] /读n
    // const setN = array[1] /写n         这三句话简写为下面一句话
    const [n, setN] = React.useState(0);//函数组件调用内部数据:析构函数）n是读接口setN是写接口，0是初始n的值
    const [state, setState] = React.useState({m: 0});
    // const [state, setState] = React.useState({n:0,m: 0});当有多个元素时函数组件不会合并，一个元素刷新，另一个元素值就会刷新成undefined，解决方法:如下面的三个点...state继承了原来的元素值
    return (
        <div className="Grandson">
            孙子 money:{n} candy:{state.m}<br/>
            我是孙子，我爸对我说[{props.messageForGrandSon}]
            <button onClick={() => setN(n + 1)}>想要1块</button>
            <button onClick={() => setState({...state, m: state.m + 1})}>想要棒棒糖</button>
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);