import React from "react"
import "./App.css"
import { TodoList } from "./TodoList"
import { TaskType } from "./TodoList"

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "JS", isDone: true },
  ]

  let tasks2: Array<TaskType> = [
    { id: 1, title: "The Shawshank Redemption", isDone: true },
    { id: 2, title: "The Godfather", isDone: true },
    { id: 3, title: "The Dark Knight", isDone: true },
  ]

  let tasks3: Array<TaskType> = [
    { id: 1, title: "Smells Like Teen Spirit - Nirvana", isDone: true },
    { id: 2, title: "Imagine - John Lennon", isDone: true },
    { id: 3, title: "One - U2", isDone: true },
  ]

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks1} />
      <TodoList title="Movies" tasks={tasks2} />
      <TodoList title="Songs" tasks={tasks3} />
    </div>
  )
}

export default App
