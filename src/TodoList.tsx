import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterValueType } from "./App"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropType = {
  title: string
  tasks: Array<TaskType> //  --> TaskType[]
  addTask: (newTaskTitle: string) => void
  removeTask: (tasksId: string) => void
  changeFilter: (value: FilterValueType) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodoList = (props: PropType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const handleAddTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleAddTask()
    }
  }

  const handleGetAll = () => {
    props.changeFilter("all")
  }

  const handleGetActive = () => {
    props.changeFilter("active")
  }

  const handleGetCompleted = () => {
    props.changeFilter("completed")
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={handleChangeTask}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <ul>
        {props.tasks.map(t => {
          const handleRemoveTask = () => {
            props.removeTask(t.id)
          }

          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
          }

          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={handleChange}
              />
              <span>{t.title}</span>
              <button onClick={handleRemoveTask}>X</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={handleGetAll}>All</button>
        <button onClick={handleGetActive}>Active</button>
        <button onClick={handleGetCompleted}>Completed</button>
      </div>
    </div>
  )
}
