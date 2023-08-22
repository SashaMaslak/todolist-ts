import { useState } from "react"
import "./App.css"
import { TaskType, TodoList } from "./TodoList"
import { v1 } from "uuid"
import AddItemForm from "./AddItemForm"

export type FilterValueType = "all" | "completed" | "active"
type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ])

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title,
    }
    setTodolists([todolist, ...todolists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
  }

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)

    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  })

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id]

        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter(t => t)
        }

        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter(t => t)
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodolist}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeTaskStatus={changeStatus}
            removeTodolist={removeTodolist}
          />
        )
      })}

      {/* <TodoList title="What to watch" tasks={tasks2} removeTask={removeTask} />
      <TodoList title="What to listen" tasks={tasks3} removeTask={removeTask} /> */}
    </div>
  )
}

export default App
