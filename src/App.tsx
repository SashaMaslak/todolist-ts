import { useState } from "react"
import "./App.css"
import { TodoList } from "./TodoList"
import { TaskType } from "./TodoList"

let initialTasks: Array<TaskType> = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: true },
  { id: 4, title: "Redux", isDone: false },
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

  function removeTask(id: number) {
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
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/* <TodoList title="What to watch" tasks={tasks2} removeTask={removeTask} />
      <TodoList title="What to listen" tasks={tasks3} removeTask={removeTask} /> */}
    </div>
  )
}

export default App
