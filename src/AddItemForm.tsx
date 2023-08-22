import { ChangeEvent, useState, KeyboardEvent } from "react"

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.ctrlKey && e.key === "Enter") {
      addTask()
    }
  }

  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim())
      setTitle("")
    } else {
      setError("Field is required")
    }
  }

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">Field is required</div>}
    </div>
  )
}

export default AddItemForm
