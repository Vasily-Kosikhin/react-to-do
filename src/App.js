import React, { useEffect, useRef, useState } from 'react';
import './styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAction, removeTaskAction } from './store/taskReduser';
import { v4 as uuidv4 } from 'uuid';
import {
  addBoardAction,
  addTaskToBoardAction,
  changeBoardOrderAction,
  deleteBoardAction,
  moveTaskToBoardAction,
  removeTaskFromBoardAction
} from './store/boardReduser';

import MyModal from './components/UI/MyModal/MyModal';
import AddBoard from './components/AddBoard';
import AddTask from './components/AddTask';
import MyTask from './components/MyTask';
import EditBoardTitle from './components/EditBoardTitle';
import { Button, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const dispatch = useDispatch();
  const boards = useSelector((store) => store.board.board);
  const [taskModal, setTaskModal] = useState(false);
  const [boardModal, setBoardModal] = useState(false);
  const [boardEditModal, setBoardEditModal] = useState(false);
  const [boardId, setBoardId] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [editBoardName, setEditBoardName] = useState(null);
  const boardNameInput = useRef();

  const showAddBoard = () => {
    setBoardModal(true);
  };
  useEffect(() => {
    document.querySelector('#add_task_input').focus();
  }, [taskModal]);

  useEffect(() => {
    document.querySelector('#add_board_input').focus();
  }, [boardModal]);

  useEffect(() => {
    document.querySelector('#edit_board_name_input').focus();
  }, [boardEditModal]);

  const addBoard = (title) => {
    const newBoard = {
      id: `${uuidv4()}`,
      title: `${title}`,
      order: Date.now(),
      tasks: []
    };
    dispatch(addBoardAction(newBoard));
  };

  const showAddTask = (id) => {
    setTaskModal(true);
    setBoardId(id);
  };

  const addTask = (
    boardId,
    title = 'Без незвания',
    description = '---',
    comments
  ) => {
    const newTask = {
      id: `${uuidv4()}`,
      title,
      description,
      boardId,
      order: Date.now(),
      comments: []
    };
    const action = {
      boardId,
      newTask
    };
    dispatch(addTaskToBoardAction(action));
    dispatch(addTaskAction(newTask));
  };

  const setEditingBoard = (board) => {
    setEditBoardName(board);
    setBoardEditModal(true);
  };

  const removeTask = (taskId) => {
    dispatch(removeTaskFromBoardAction(taskId));
    dispatch(removeTaskAction(taskId));
  };

  function dragStartHandler(e, board) {
    setCurrentTask(null);
    setCurrentBoard(board);
  }
  function dragEndHandler(e) {
    e.target.style.background = '';
  }

  function dragOverHandler(e) {
    e.preventDefault();

    e.target.style.background = 'lightgray';
  }
  function dragDropHandler(e, board) {
    e.target.style.background = '';
    e.preventDefault();
    if (currentTask) {
      dispatch(moveTaskToBoardAction({ currentTask, dropBoard: board }));
      return;
    } else {
      dispatch(
        changeBoardOrderAction({
          id: board.id,
          order: board.order,
          current: currentBoard
        })
      );
    }
  }

  const sortByOrder = (a, b) => {
    if (Number(a.order) > Number(b.order)) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="App">
      {boards.sort(sortByOrder).map((board) => (
        <div
          key={board.id}
          className="board__container"
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, board)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dragDropHandler(e, board)}
        >
          <div className="board__head">
            <div className="board__title">{board.title}</div>
            <div className="board__title__buttons">
              <IconButton
                variant="text"
                color="primary"
                onClick={() => setEditingBoard(board)}
              >
                <CreateIcon style={{ fontSize: '0.6em' }} />
              </IconButton>

              <IconButton
                variant="contained"
                color="primary"
                size="small"
                onClick={() => dispatch(deleteBoardAction(board.id))}
              >
                <DeleteIcon style={{ fontSize: '0.8em' }} />
              </IconButton>
            </div>
          </div>
          {board.tasks.sort(sortByOrder).map((task) => (
            <MyTask
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              task={task}
              key={task.id}
              taskId={task.id}
              boardId={board.id}
              removeTask={removeTask}
            >
              {task.title}
            </MyTask>
          ))}
          <Button
            variant="text"
            className="addTask__button"
            onClick={() => showAddTask(board.id)}
            draggable={false}
          >
            <AddIcon />
            Add task
          </Button>
        </div>
      ))}
      <MyModal visible={taskModal} setVisible={setTaskModal}>
        <AddTask
          boardId={boardId}
          addTask={addTask}
          setVisible={setTaskModal}
        ></AddTask>
      </MyModal>
      <div className="add_board_button">
        <Button id="test" variant="text" onClick={showAddBoard}>
          <AddIcon /> Add board
        </Button>
      </div>

      <MyModal visible={boardModal} setVisible={setBoardModal}>
        <AddBoard addBoard={addBoard} setVisible={setBoardModal}></AddBoard>
      </MyModal>
      <MyModal visible={boardEditModal} setVisible={setBoardEditModal}>
        <EditBoardTitle
          boardNameInput={boardNameInput}
          setEditBoardName={setEditBoardName}
          editBoardName={editBoardName}
          setVisible={setBoardEditModal}
        ></EditBoardTitle>
      </MyModal>
    </div>
  );
}

export default App;
