import React, { useReducer } from 'react'

const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'

const initialState = {
  label: '',
  completed: false
}

// { type: CHANGE_LABEL, payload: 'foo' } // action
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LABEL:
      return {...state, label: action.payload}
    case CHANGE_IS_COMPLETED:
      return {...state, completed: action.payload}
    default: 
      return state
  }
}

export default function TodoForm({ createNewTodo }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onLabelChange = evt => {
    dispatch({ type: CHANGE_LABEL, payload: evt.target.value })
  }

  const onConpletedChange = ({ target: { checked } }) => {
    dispatch({ type: CHANGE_IS_COMPLETED, payload: checked })
  }

  const resetForm = () => {
    dispatch({ type: CHANGE_LABEL, payload: '' })
    dispatch({ type: CHANGE_IS_COMPLETED, payload: false })
  }

  const onNewTodo = evt => {
    evt.preventDefault()
    createNewTodo(state.label, state.completed)
    resetForm()
  }

  return (
    <form id="todoForm" onSubmit={onNewTodo} >
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          onChange={onLabelChange}
          type='text'
          name='todoLabel'
          placeholder='Type label'
          value={state.label}
        />
      </label>
      <label><span>Is completed:</span>
        <input
          onChange={onConpletedChange}
          type='checkbox'
          name='todoIsCompleted'
          checked={state.completed}
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
        />
      </label>
    </form>
  )
}
