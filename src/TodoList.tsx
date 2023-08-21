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
  addTask: (title: string) => void
  removeTask: (tasksId: string) => void
  changeFilter: (value: FilterValueType) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValueType
}

export const TodoList = (props: PropType) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const handleAddTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim())
      setTitle("")
    } else {
      setError("Field is required")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
          value={title}
          onChange={handleChangeTask}
          onKeyDown={handleKeyDown}
          className={error ? "error" : ""}
        />
        <button onClick={handleAddTask}>+</button>
        {error && <div className="error-message">Field is required</div>}
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
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
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
        <button
          onClick={handleGetAll}
          className={props.filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={handleGetActive}
          className={props.filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={handleGetCompleted}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
