import { ChangeEvent } from "react"
import { Button, IconButton, Checkbox } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { FilterValueType } from "./App"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropType = {
  id: string
  title: string
  tasks: Array<TaskType> //  --> TaskType[]
  filter: FilterValueType
  removeTask: (tasksId: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void

  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export const TodoList = (props: PropType) => {
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id)
  }

  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id)
  }

  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => {
            props.removeTask(t.id, props.id)
          }

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
          }

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          onClick={onAllClickHandler}
          variant={props.filter === "all" ? "contained" : "text"}
        >
          All
        </Button>
        <Button
          onClick={onActiveClickHandler}
          variant={props.filter === "active" ? "contained" : "text"}
        >
          Active
        </Button>
        <Button
          onClick={onCompletedClickHandler}
          variant={props.filter === "completed" ? "contained" : "text"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
