import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import styles from "./index.css"

/* 
const App = () => {
    const [count, setCount] = useState(0);
    const [countr, setCountr] = useState(10);

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

    <div className={styles.bigblue}>
        Count: {countr}
        <button onClick={decrement}>-</button>
    </div>

    </>

);
};

////////////////////////////////////////////////////////////////////

function Books(){
   // const [author, setAuthor] = useState("Dr Brene Brown");
  //  const [bookName, setBookName] = useState("Awakening demons");
    const [books, setBooks] = useState({
        author: "Dr Brene Brown",
        bookName: "Awakening arts"
    });

    const updatebookName = () => {
        setBooks(previousState => {
            return{ ...previousState, bookName: "This is love"}
        });
    }

    return(
        <>
        <p>
            The name of the author is : {books.author} and her book is : {books.bookName}
        </p>
        <button
        type="button"
        onClick={updatebookName}>
            Change book Name
        </button>
        </>
    )

}
/////////////////////////////////////////////////////////////
 */


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  
const FILTER_NAMES = Object.keys(FILTER_MAP);


const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
    

const filterList = FILTER_NAMES.map(name => (
  <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
));
  
      function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
      }

      const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
      const headingText = `${taskList.length} ${tasksNoun} remaining`;

      function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            // use object spread to make a new object
            // whose `completed` prop has been inverted
            return {...task, completed: !task.completed}
          }
          return task;
        });
        setTasks(updatedTasks);
      }

      function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
        // if this task has the same ID as the edited task
          if (id === task.id) {
            //
            return {...task, name: newName}
          }
          return task;
        });
        setTasks(editedTaskList);
      }
      
      function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
      }
      
      const listHeadingRef = useRef(null);
      const prevTaskLength = usePrevious(tasks.length);
      
      useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
          listHeadingRef.current.focus();
        }
      }, [tasks.length, prevTaskLength]);
      

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
             {headingText}
        </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;


ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));

