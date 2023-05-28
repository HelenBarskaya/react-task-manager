import React from 'react';
import MyButton from "./UI/button/MyButton";

const Task = (props) => {

    function getStatus(props) {
        let today = new Date()
        let deadline = new Date(props.task.date)
        if (props.task.isCompleted) {
            return "Завершено";
        } else {
            if (deadline.toLocaleDateString() >= today.toLocaleDateString()) {
                return "Не завершено";
            } else {
                return "Просрочено";
            }
        }
    }

    return (
        <div className="task">
            <div className="task_content">
                <strong>{props.number}. {props.task.title}</strong>
                <div>{props.task.body}</div>
                <div> Дата: {props.task.date}</div>
                <div className="completed"> Статус: {getStatus(props)}</div>
            </div>
            <div className="task_btns">
                <MyButton onClick={() => props.complete(props.task)}> ✔ </MyButton>
                <MyButton onClick={() => {
                    props.setCurrentTask(props.task)
                    props.setEditModal(true)
                }}> ✎ </MyButton>
                <MyButton onClick={() => props.remove(props.task)}> ✖ </MyButton>
            </div>
        </div>);
};

export default Task;