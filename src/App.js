import React, {useMemo, useRef, useState} from 'react';
import './styles/task_style.css';
import Task from "./components/Task";
import TaskList from "./components/TaskList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import TaskForm from "./components/TaskForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/UI/postFilter/PostFilter";

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "Прогулка", body: "Погулять с собакой по парку в 10:30"},
        {id: 2, title: "Прогулка", body: "Погулять в магазин за молоком"},
        {id: 3, title: "Прогулка", body: "Погулять нахуй"},
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedTasks = useMemo(() => {
        if (filter.sort)
            return [...tasks].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort]));
        return tasks;
    }, [filter.sort, tasks])

    const sortedAndSearchedTasks = useMemo(() => {
        return sortedTasks.filter(task => task.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedTasks])

    const createTask = (newTask) => {
        setTasks([...tasks, newTask])
    }
    const removeTask = (task) => {
        setTasks(tasks.filter(p => p.id !== task.id))
    }

    return (
        <div className="App">
            <TaskForm create={createTask}/>
            <hr/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <TaskList remove={removeTask} tasks={sortedAndSearchedTasks} title="Список дел"/>
            
            {/*<TaskList tasks={tasks} title="Список дел"/>*/}
            {/*<TaskList tasks={tasks} title="Список дел"/>*/}
            {/*<TaskList tasks={tasks} title="Список дел"/>*/}
        </div>
    );
}

export default App;
