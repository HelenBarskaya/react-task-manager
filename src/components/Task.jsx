import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";

const Task = (props) => {
    return (
        <div className="task">
            <div className="task_content">
                <strong>{props.number}. {props.task.title}</strong>
                <div>{props.task.body}</div>
            </div>
            <div className="task_btns">
                <MyButton onClick={()=>props.remove(props.task)}> X</MyButton>
            </div>
        </div>);
};

export default Task;