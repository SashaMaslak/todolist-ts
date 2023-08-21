import { useState } from "react"
import "./App.css"
import { TodoList } from "./TodoList"
import { TaskType } from "./TodoList"
import { v1 } from "uuid"

let initialTasks: Array<TaskType> = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "ReactJS", isDone: true },
  { id: v1(), title: "Redux", isDone: false },
  { id: v1(), title: "RestAPI", isDone: false },
  { id: v1(), title: "GraphQL", isDone: false },
]

export type FilterValueType = "all" | "completed" | "active"

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks)
  const [filter, setFilter] = useState<FilterValueType>("all")

  // let tasks2: Array<TaskType> = [
  //   { id: 1, title: "The Shawshank Redemption", isDone: true },
  //   { id: 2, title: "The Godfather", isDone: true },
  //   { id: 3, title: "The Dark Knight", isDone: true },
  // ]

  // let tasks3: Array<TaskType> = [
  //   { id: 1, title: "Smells Like Teen Spirit - Nirvana", isDone: true },
  //   { id: 2, title: "Imagine - John Lennon", isDone: true },
  //   { id: 3, title: "One - U2", isDone: true },
  // ]

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    setTasks(prevState => [newTask, ...prevState])
  }

  function changeStatus(taskId: string, isDone: boolean) {
    const task = tasks.find(t => t.id === taskId)
    if (task) task.isDone = isDone
    setTasks([...tasks])
  }

  function removeTask(id: string) {
    const filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value)
  }

  let tasksForTodoList = tasks

  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }

  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeStatus}
      />
      {/* <TodoList title="What to watch" tasks={tasks2} removeTask={removeTask} />
      <TodoList title="What to listen" tasks={tasks3} removeTask={removeTask} /> */}
    </div>
  )
}

export default App
