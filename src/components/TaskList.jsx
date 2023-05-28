import React, {useState} from 'react';
import Task from "./Task";
import MyModal from "./UI/modal/MyModal";
import TaskForm from "./TaskForm";

const TaskList = ({tasks, title, remove, complete, tasksState, setTasks}) => {
    const [editModal, setEditModal] = useState(false)
    const [task, setTask] = useState({
        title: '',
        body: '',
        date: '',
        isCompleted: false
    })

    const editTask = (task) => {
        const updatedTasks = [...tasksState]
        setEditModal(false)
        let index = tasksState.findIndex(p => p.id === task.id)
        updatedTasks[index] = task
        for (let i = 0; i < localStorage.length; i++) {
            if (task.id === JSON.parse(localStorage.getItem(localStorage.key(i))).id) {
                localStorage.setItem(localStorage.key(i), JSON.stringify(updatedTasks[index]));
                break;
            }
        }
        setTasks(updatedTasks)
    }

    if (!tasks.length) {
        return (<h1>Задачи не найдены :(</h1>)
    } else {
        return (
            <div className="task_list">
                <MyModal visible={editModal} setVisible={setEditModal}>
                    <TaskForm edit={editTask} isEdit={true} task={task} setTask={setTask}/>
                </MyModal>
                <h1>{title}</h1>
                {tasks.map((task, index) =>
                    <Task complete={complete}
                          setEditModal={setEditModal}
                          setCurrentTask={setTask}
                          remove={remove}
                          number={index + 1}
                          task={task}
                          key={task.id}/>
                )}
            </div>
        );
    }
};

export default TaskList;