import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editBoardNameAction } from '../store/boardReduser';
import cl from './EditBoardTitle.module.css';

function EditBoardTitle(props) {
  let text = '';
  if (props.editBoardName) {
    text = props.editBoardName.title;
  }
  const dispatch = useDispatch();

  function changeName(e) {
    e.preventDefault();
    dispatch(
      editBoardNameAction({
        id: props.editBoardName.id,
        title: props.editBoardName.title
      })
    );
    props.setVisible(false);
  }

  function cancelCreation(e) {
    e.preventDefault();
    props.setVisible(false);
  }

  return (
    <div>
      <form className={cl.form}>
        <input
          className={cl.input}
          ref={props.boardNameInput}
          id="edit_board_name_input"
          placeholder="ADD BOARD"
          value={text}
          onChange={(e) =>
            props.setEditBoardName({
              title: e.target.value,
              id: props.editBoardName.id
            })
          }
        ></input>
        {/* <button onClick={(e) => changeName(e)}>SAVE CHANGES</button>
        <button onClick={(e) => cancelCreation(e)}>CANCEL</button> */}
        <div className={cl.button__container}>
          <Button
            style={{ marginRight: '10px' }}
            variant="contained"
            color="success"
            size="small"
            onClick={(e) => changeName(e)}
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
export default EditBoardTitle;
