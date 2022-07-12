import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import cl from './AddTask.module.css';

function AddTask(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function addTask(e) {
    e.preventDefault();
    props.addTask(props.boardId, title, description);
    setTitle('');
    setDescription('');
    props.setVisible(false);
  }

  function cancelCreation(e) {
    e.preventDefault();
    setTitle('');
    setDescription('');
    props.setVisible(false);
  }

  return (
    <div>
      <form>
        <input
          id="add_task_input"
          className={cl.input}
          placeholder="Card name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          style={{ marginLeft: '5px' }}
          className={cl.input}
          placeholder="Card description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <div className={cl.button__container}>
          <Button
            style={{ marginRight: '10px' }}
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => addTask(e)}
          >
            Add
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
export default AddTask;
