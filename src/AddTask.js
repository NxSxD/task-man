import React from 'react'

export default function AddTask(props) {
  const {title, description} = props.task;
  const {onChange, onSubmit} = props;
  return (
    <div>
    <h2>Add Task</h2>
    <form className="add-task-form" onSubmit={(e) => onSubmit(e)}> 
      <input name="title" type="text" value={title} onChange={(e) => onChange(e)} />
      <input name="description" type="text" value={description} onChange={(e) => onChange(e)}/>
      <input type="submit" value="Add"/>
    </form>
   </div>
  )
}
