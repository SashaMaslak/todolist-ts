import React from "react"
import "./App.css"
import { TodoList } from "./TodoList"

function App() {
  return (
    <div className="App">
      <TodoList title="What to learn" />
      <TodoList title="Movies" />
      <TodoList title="Songs" />
    </div>
  )
}

export default App
