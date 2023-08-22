import { ChangeEvent, useState, KeyboardEvent } from "react"
import { IconButton, TextField } from "@mui/material"
import { ControlPoint } from "@mui/icons-material"

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
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
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        variant="outlined"
        label="Type value"
        helperText={error}
      />
      <IconButton color="primary" onClick={addTask}>
        <ControlPoint />
      </IconButton>
    </div>
  )
}
