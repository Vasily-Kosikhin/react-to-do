import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTaskBoardNameAction } from '../store/boardReduser';
import {
  changeTaskDescriptionAction,
  changeTaskTitleAction
} from '../store/taskReduser';
import cl from './EditTask.module.css';

function EditTask(props) {
  const tasks = useSelector((store) => store.task.tasks);
  const dispatch = useDispatch();
  const task = tasks.filter((item) => item.id === props.taskId)[0] || {
    title: '',
    description: ''
  };

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function saveChanges(e) {
    dispatch(changeTaskTitleAction({ id: props.taskId, title: title }));
    dispatch(
      changeTaskDescriptionAction({
        id: props.taskId,
        description: description
      })
    );
    dispatch(
      changeTaskBoardNameAction({
        taskId: props.taskId,
        boardId: props.boardId,
        title: title
      })
    );
    e.preventDefault();
    props.setVisible(false);
  }

  function cancelCreation(e) {
    e.preventDefault();
    props.setVisible(false);
  }

  return (
    <div>
      <form className={cl.form}>
        <div>
          <h4>Title:</h4>
          <input
            id="add_task_name_input"
            className={cl.input__title}
            placeholder={task.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <h2>Description</h2>
          <textarea
            className={cl.input__description}
            placeholder={task.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={cl.button__container}>
          <Button
            style={{ marginRight: '10px' }}
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => saveChanges(e)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => cancelCreation(e)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
export default EditTask;
