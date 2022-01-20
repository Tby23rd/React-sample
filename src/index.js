import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);
    const [countr, setCountr] = useState(0);

    const increment = () => {
     setCount((c)=> c+ 1);
    };
    const decrement = () => {
        setCountr((c)=> c- 1);
    };

return (
    <>
        <div>
        Count: {count}
        <button onClick={increment}>+</button>
    </div>
    <div>
        Count: {countr}
        <button onClick={decrement}>-</button>
    </div>

    </>

);
};

ReactDOM.render(<App />, document.getElementById('root'));



