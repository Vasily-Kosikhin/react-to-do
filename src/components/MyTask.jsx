import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditTask from './EditTask';
import MyModal from './UI/MyModal/MyModal';
import { changeTaskOrderOnBoardAction } from '../store/boardReduser';
import cl from './MyTask.module.css';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function MyTask(props) {
  const [taskModal, setTaskModal] = useState(false);

  const dispatch = useDispatch();

  function dragStartHandler(e, task) {
    e.stopPropagation();
    props.setCurrentTask(task);
    props.setCurrentBoard(task.boardId);
  }
  function dragEndHandler(e) {
    e.stopPropagation();
    e.target.style.background = '';
  }

  function dragOverHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }
  function dragDropHandler(e, task) {
    e.stopPropagation();
    e.preventDefault();
    dispatch(
      changeTaskOrderOnBoardAction({
        currentTask: props.currentTask,
        dropTask: task
      })
    );
  }
  return (
    <div
      className={cl.task__body}
      draggable={true}
      onDragStart={(e) => dragStartHandler(e, props.task)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dragDropHandler(e, props.task)}
    >
      <div className={cl.task__title}>{props.children}</div>
      <div>
        <IconButton
          variant="text"
          color="primary"
          onClick={() => setTaskModal(true)}
        >
          <CreateIcon style={{ fontSize: '0.4em' }} />
        </IconButton>

        <IconButton
          variant="contained"
          color="primary"
          size="small"
          onClick={() => props.removeTask(props.taskId)}
        >
          <DeleteIcon style={{ fontSize: '0.6em' }} />
        </IconButton>
        <MyModal visible={taskModal} setVisible={setTaskModal}>
          <EditTask
            taskId={props.taskId}
            setVisible={setTaskModal}
            boardId={props.boardId}
          ></EditTask>
        </MyModal>
      </div>
    </div>
  );
}
export default MyTask;
