import { useState } from "react"
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Paper,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { TaskType, TodoList } from "./TodoList"
import { v1 } from "uuid"
import { AddItemForm } from "./AddItemForm"

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

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }
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

  let changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px 0px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map(tl => {
            let tasksForTodolist = tasksObj[tl.id]

            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                t => t.isDone === false
              )
            }

            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
            }
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeStatus}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            )
          })}

          {/* <TodoList title="What to watch" tasks={tasks2} removeTask={removeTask} />
      <TodoList title="What to listen" tasks={tasks3} removeTask={removeTask} /> */}
        </Grid>
      </Container>
    </div>
  )
}

export default App
