import React, {useEffect, useState} from 'react';
import './styles/task_style.css';
import TaskList from "./components/TaskList";
import MyButton from "./components/UI/button/MyButton";
import TaskForm from "./components/TaskForm";
import PostFilter from "./components/UI/postFilter/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import {UseTasks} from "./components/hooks/useTasks";

import Chart from 'chart.js/auto'


function App() {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [createModal, setCreateModal] = useState(false)
    const [graphModal, setGraphModal] = useState(false)
    const [pieGraphModal, setPieGraphModal] = useState(false)
    const [chart, setChart] = useState(null)
    const [pieChart, setPieChart] = useState(null)
    const sortedAndSearchedTasks = UseTasks(tasks, filter.sort, filter.query)

    const [task, setTask] = useState({
        title: '',
        body: '',
        date: '',
        isCompleted: false
    })


    async function fetchTasks() {
        const currentTasks = []
        for (let i = 0; i < localStorage.length; i++) {
            currentTasks.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        setTasks(currentTasks);
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const createTask = (newTask) => {
        setTasks([...tasks, newTask])
        setCreateModal(false)
        const key = Date.now().toString();
        localStorage.setItem(key, JSON.stringify(newTask))
    }

    const removeTask = (task) => {
        setTasks(tasks.filter(p => p.id !== task.id))
        for (let i = 0; i < localStorage.length; i++) {
            if (task.id === JSON.parse(localStorage.getItem(localStorage.key(i))).id) {
                localStorage.removeItem(localStorage.key(i));
                break;
            }
        }
    }

    const completeTask = (task) => {
        const updatedTasks = [...tasks]
        let index = tasks.findIndex(p => p.id === task.id)
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted
        for (let i = 0; i < localStorage.length; i++) {
            if (task.id === JSON.parse(localStorage.getItem(localStorage.key(i))).id) {
                localStorage.setItem(localStorage.key(i), JSON.stringify(updatedTasks[index]));
                break;
            }
        }
        setTasks(updatedTasks)
    }

    function showGraph() {
        const ctx = document.getElementById('myChart');

        let labels = tasks.map(task => task.date);
        labels = labels.filter(function (item, pos) {
            return labels.indexOf(item) === pos;
        })

        let data = labels.map(date => tasks.filter(task => task.date === date).length);

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tasks',
                    data: data,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });

        setChart(chart);

        setGraphModal(true)
    }

    function showPieGraph() {
        const ctx = document.getElementById('myPieChart');

        let labels = tasks.map(task => task.isCompleted);
        labels = labels.filter(function (item, pos) {
            return labels.indexOf(item) === pos;
        })

        let data = labels.map(completed => tasks.filter(task => task.isCompleted === completed).length);

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Не завершено", "Завершено"],
                datasets: [{
                    data: data,
                    borderWidth: 1
                }]
            }
        });

        setPieChart(chart);

        setPieGraphModal(true)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setCreateModal(true)}>
                Создать новую задачу
            </MyButton>
            <MyButton style={{marginLeft: 4}} onClick={showGraph}>
                Показать график по датам
            </MyButton>
            <MyButton style={{marginLeft: 4}} onClick={showPieGraph}>
                Показать график по статусам
            </MyButton>
            <MyModal visible={createModal} setVisible={setCreateModal}>
                <TaskForm create={createTask} isEdit={false} task={task} setTask={setTask}/>
            </MyModal>
            <MyModal visible={graphModal} setVisible={setGraphModal} chart={chart}>
                <div style={{ width: 700 }}>
                    <canvas id="myChart"></canvas>
                </div>
            </MyModal>
            <MyModal visible={pieGraphModal} setVisible={setPieGraphModal} chart={pieChart}>
                <div style={{ width: 500 }}>
                    <canvas id="myPieChart"></canvas>
                </div>
            </MyModal>
            <hr/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <TaskList complete={completeTask}
                      remove={removeTask}
                      tasks={sortedAndSearchedTasks}
                      tasksState={tasks}
                      setTasks={setTasks}
                      title="Список дел"/>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </div>
    );
}

export default App;
