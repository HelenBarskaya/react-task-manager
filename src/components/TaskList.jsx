import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, title, remove}) => {
    if (!tasks.length){
        <h1>Задачи не найдены :(</h1>
    }
    return (
        <div className="task_list">
            <h1>{title}</h1>
            {tasks.map((task, index) =>
                <Task remove={remove} number={index+1} task={task} key={task.id}/>
            )}
        </div>
    );
};

export default TaskList;