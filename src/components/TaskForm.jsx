import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const TaskForm = (props) => {

    const addNewTask = (e) => {
        e.preventDefault()
        const newTask = {
            ...props.task, id: Date.now(),
        }
        props.create(newTask)
        props.setTask({title: '', body: '', date: '', isCompleted: false})
    }

    const editCurrentTask = (e) => {
        e.preventDefault()
        props.edit(props.task)
        props.setTask({title: '', body: '', date: '', isCompleted: false})
    }

    return (
        <form>
            <MyInput
                value={props.task.title}
                onChange={e => props.setTask({...props.task, title: e.target.value})}
                type="text"
                placeholder="Название задачи"/>
            <MyInput
                value={props.task.body}
                onChange={e => props.setTask({...props.task, body: e.target.value})}
                type="text"
                placeholder="Описание задачи"/>
            <MyInput
                value={props.task.date}
                onChange={e => props.setTask({...props.task, date: e.target.value})}
                type="date"
                required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                placeholder="Срок задачи"/>
            <MyButton onClick={props.isEdit ? editCurrentTask : addNewTask}>
                {props.isEdit ? "Сохранить" : "Создать"}
            </MyButton>
        </form>
    );
};

export default TaskForm;