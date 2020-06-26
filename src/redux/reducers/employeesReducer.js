const initialState = {
  employees: [],
  employeesFilter: [],
  employeesCount: null,
  employee: null,
  persons: 500,
  page: 1,
  focus: null,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const GET_EMPLOYEE = "GET_EMPLOYEE";
const CLICK_CHANGE_FOCUS = "CLICK_CHANGE_FOCUS";
const ARROW_UP_CHANGE_FOCUS = "ARROW_UP_CHANGE_FOCUS";
const ARROW_DOWN_CHANGE_FOCUS = "ARROW_DOWN_CHANGE_FOCUS";

// Export Functions
export function getEmpoyees() {
  const data = fetch(
    `https://dt-interviews.appspot.com/?page=1&per_page=500`
  ).then((blob) => blob.json());

  return {
    type: GET_EMPLOYEES,
    payload: data,
  };
}

export function getEmployee(focus) {
  const data = fetch(
    `https://dt-interviews.appspot.com/${focus}`
  ).then((blob) => blob.json());

  return {
    type: GET_EMPLOYEE,
    payload: data,
  };
}

export function clickChangeFocus(id) {
  return {
    type: CLICK_CHANGE_FOCUS,
    payload: id,
  };
}

export function arrowChangeFocus(focus, keyCode, count) {
  if (focus > 1 && keyCode === 38) {
    return {
      type: ARROW_UP_CHANGE_FOCUS,
      payload: focus - 1,
    };
  } else if (focus <= count && keyCode === 40) {
    return {
      type: ARROW_DOWN_CHANGE_FOCUS,
      payload: focus + 1,
    };
  }
  return {
    type: ARROW_UP_CHANGE_FOCUS,
    payload: focus,
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case `${GET_EMPLOYEES}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${GET_EMPLOYEES}_FULFILLED`:
      const fullEmployees = [...state.employees, ...payload];
      const fullEmployeesLength = fullEmployees.length;

      return {
        ...state,
        employees: fullEmployees,
        employeesCount: fullEmployeesLength,
        page: state.page + 1,
        loading: false,
      };

    case `${GET_EMPLOYEES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${GET_EMPLOYEE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${GET_EMPLOYEE}_FULFILLED`:
      return {
        ...state,
        employee: payload,
        loading: false,
      };

    case `${GET_EMPLOYEE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case CLICK_CHANGE_FOCUS:
      return {
        ...state,
        focus: payload,
      };

    case ARROW_UP_CHANGE_FOCUS:
      return {
        ...state,
        focus: payload,
      };

    case ARROW_DOWN_CHANGE_FOCUS:
      return {
        ...state,
        focus: payload,
      };

    default:
      return state;
  }
}
