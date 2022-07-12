import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import cl from './AddBoard.module.css';

function AddBoard(props) {
  const [title, setTitle] = useState('');

  function addBoard(e) {
    e.preventDefault();
    props.addBoard(title);
    setTitle('');
    props.setVisible(false);
  }

  function cancelCreation(e) {
    e.preventDefault();
    setTitle('');
    props.setVisible(false);
  }

  return (
    <div>
      <form className={cl.form}>
        <input
          className={cl.input}
          id="add_board_input"
          placeholder="Board name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div className={cl.button__container}>
          <Button
            style={{ marginRight: '5px' }}
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => addBoard(e)}
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
export default AddBoard;
