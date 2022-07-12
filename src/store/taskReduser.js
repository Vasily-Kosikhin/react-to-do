const defaultState = {
  tasks: []
};

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const CHANGE_TITLE = 'CHANGE_TITLE';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';

function changeTitle(item, payload) {
  if (item.id !== payload.id) {
    return item;
  } else {
    return { ...item, title: payload.title };
  }
}

function changeDescription(item, payload) {
  if (item.id !== payload.id) {
    return item;
  } else {
    return { ...item, description: payload.description };
  }
}
export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            boardId: action.payload.boardId
          }
        ]
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      };
    case CHANGE_TITLE:
      return {
        ...state,
        tasks: [...state.tasks.map((task) => changeTitle(task, action.payload))]
      };
    case CHANGE_DESCRIPTION:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) => changeDescription(task, action.payload))
        ]
      };
    default:
      return state;
  }
};

export const addTaskAction = (payload) => ({ type: ADD_TASK, payload });
export const removeTaskAction = (payload) => ({ type: REMOVE_TASK, payload });
export const changeTaskTitleAction = (payload) => ({
  type: CHANGE_TITLE,
  payload
});
export const changeTaskDescriptionAction = (payload) => ({
  type: CHANGE_DESCRIPTION,
  payload
});
