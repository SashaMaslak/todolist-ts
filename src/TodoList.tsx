import { ChangeEvent } from "react"
import { FilterValueType } from "./App"
import AddItemForm from "./AddItemForm"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropType = {
  id: string
  title: string
  tasks: Array<TaskType> //  --> TaskType[]
  removeTask: (tasksId: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
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

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={removeTodolist}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map(t => {
          const onClickHandler = () => {
            props.removeTask(t.id, props.id)
          }

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span>{t.title}</span>
              <button onClick={onClickHandler}>X</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
