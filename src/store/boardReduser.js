import { v4 as uuidv4 } from 'uuid';

const defaultState = {
  board: [
    {
      id: `${uuidv4()}`,
      title: 'To Do',
      order: '1',
      tasks: []
    },
    {
      id: `${uuidv4()}`,
      title: 'In Progress',
      order: '2',
      tasks: []
    },
    {
      id: `${uuidv4()}`,
      title: 'Done',
      order: '3',
      tasks: []
    }
  ]
};

const ADD_BOARD = 'ADD_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD';
const ADD_TASK_TO_BOARD = 'ADD_TASK_TO_BOARD';
const REMOVE_TASK_FROM_BOARD = 'REMOVE_TASK_FROM_BOARD';
const CHANGE_TASK_BOARD_NAME = 'CHANGE_TASK_BOARD_NAME ';
const DELETE_BOARD = 'DELETE_BOARD';
const EDIT_BOARD_NAME = 'EDIT_BOARD_NAME';
const CHANGE_BOARD_ORDER = 'CHANGE_BOARD_ORDER';
const CHAGE_TASK_ORDER = 'CHAGE_TASK_ORDER';
const MOVE_TASK_TO_BOARD = 'MOVE_TASK_TO_BOARD';

function addTaskToBoard(item, payload) {
  if (item.id === payload.boardId) {
    item.tasks.push(payload.newTask);
    return item;
  } else {
    return item;
  }
}

function removeTaskFromBoard(item, payload) {
  item.tasks.filter((item) => item.id !== payload);
  return {
    ...item,
    tasks: item.tasks.filter((item) => item.id !== payload)
  };
}

function changeTaskBoardName(item, payload) {
  if (item.id !== payload.boardId) {
    return item;
  } else {
    const x = item.tasks.map((task) =>
      task.id !== payload.taskId ? task : { ...task, title: payload.title }
    );
    const y = { ...item, tasks: x };
    return y;
  }
}

function changeBoardOrder(item, payload) {
  if (item.id === payload.current.id) {
    return { ...item, order: payload.order };
  }
  if (item.id === payload.id) {
    return { ...item, order: payload.current.order };
  }
  return item;
}

function changeTaskOrderOnBoard(item, payload) {
  function findElemById(elem) {
    if (elem.id === payload.currentTask.id) {
      return { ...elem, order: payload.dropTask.order };
    }
    if (elem.id === payload.dropTask.id) {
      return { ...elem, order: payload.currentTask.order };
    }
    return elem;
  }

  if (payload.currentTask.boardId === payload.dropTask.boardId) {
    if (item.id === payload.currentTask.boardId) {
      return { ...item, tasks: item.tasks.map((el) => findElemById(el)) };
    } else {
      return item;
    }
  } else {
    if (item.id === payload.dropTask.boardId) {
      return {
        ...item,
        tasks: [
          ...item.tasks.filter((elem) => elem.id !== payload.dropTask.id),
          {
            ...payload.currentTask,
            order: payload.dropTask.order,
            boardId: payload.dropTask.boardId
          }
        ]
      };
    }
    if (item.id === payload.currentTask.boardId) {
      return {
        ...item,
        tasks: [
          ...item.tasks.filter((elem) => elem.id !== payload.currentTask.id),
          {
            ...payload.dropTask,
            order: payload.currentTask.order,
            boardId: payload.currentTask.boardId
          }
        ]
      };
    }
    return item;
  }
}

function moveTaskToBoard(item, payload) {
  if (
    item.id === payload.currentTask.boardId &&
    payload.currentTask.boardId !== payload.dropBoard.id
  ) {
    return {
      ...item,
      tasks: [...item.tasks.filter((el) => el.id !== payload.currentTask.id)]
    };
  }
  if (
    item.id === payload.currentTask.boardId &&
    payload.currentTask.boardId === payload.dropBoard.id
  ) {
    return item;
  }
  if (
    item.id !== payload.currentTask.boardId &&
    item.id === payload.dropBoard.id
  ) {
    return {
      ...item,
      tasks: [...item.tasks, { ...payload.currentTask, boardId: item.id }]
    };
  }
  return item;
}

export const boardReduser = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return { ...state, board: [...state.board, action.payload] };
    case REMOVE_BOARD:
      return;
    case ADD_TASK_TO_BOARD:
      return {
        ...state,
        board: state.board.map((item) => addTaskToBoard(item, action.payload))
      };
    case REMOVE_TASK_FROM_BOARD: {
      return {
        ...state,
        board: state.board.map((item) =>
          removeTaskFromBoard(item, action.payload)
        )
      };
    }
    case CHANGE_TASK_BOARD_NAME: {
      return {
        ...state,
        board: state.board.map((item) =>
          changeTaskBoardName(item, action.payload)
        )
      };
    }
    case DELETE_BOARD: {
      return {
        ...state,
        board: state.board.filter((item) => item.id !== action.payload)
      };
    }
    case EDIT_BOARD_NAME: {
      return {
        ...state,
        board: state.board.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.title }
            : item
        )
      };
    }
    case CHANGE_BOARD_ORDER: {
      return {
        ...state,
        board: state.board.map((item) => changeBoardOrder(item, action.payload))
      };
    }
    case CHAGE_TASK_ORDER: {
      return {
        ...state,
        board: state.board.map((item) =>
          changeTaskOrderOnBoard(item, action.payload)
        )
      };
    }
    case MOVE_TASK_TO_BOARD: {
      return {
        ...state,
        board: state.board.map((item) => moveTaskToBoard(item, action.payload))
      };
    }
    default:
      return state;
  }
};

export const addBoardAction = (payload) => ({
  type: ADD_BOARD,
  payload
});

export const addTaskToBoardAction = (payload) => ({
  type: ADD_TASK_TO_BOARD,
  payload
});

export const removeTaskFromBoardAction = (payload) => ({
  type: REMOVE_TASK_FROM_BOARD,
  payload
});

export const changeTaskBoardNameAction = (payload) => ({
  type: CHANGE_TASK_BOARD_NAME,
  payload
});

export const deleteBoardAction = (payload) => ({
  type: DELETE_BOARD,
  payload
});

export const editBoardNameAction = (payload) => ({
  type: EDIT_BOARD_NAME,
  payload
});

export const changeBoardOrderAction = (payload) => ({
  type: CHANGE_BOARD_ORDER,
  payload
});

export const changeTaskOrderOnBoardAction = (payload) => ({
  type: CHAGE_TASK_ORDER,
  payload
});

export const moveTaskToBoardAction = (payload) => ({
  type: MOVE_TASK_TO_BOARD,
  payload
});
