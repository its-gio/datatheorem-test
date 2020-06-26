const initialState = {
  employees: [],
  employeesFilter: [],
  employee: null,
  persons: 500,
  page: 1,
  focus: null,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const CHANGE_FOCUS = "CHANGE_FOCUS";
const GET_EMPLOYEE = "GET_EMPLOYEE";

// Export Functions
export function getEmpoyees() {
  const data = fetch(
    `https://dt-interviews.appspot.com/?page=${initialState.page}&per_page=${initialState.persons}`
  ).then((blob) => blob.json());

  return {
    type: GET_EMPLOYEES,
    payload: data,
  };
}

export function changeFocus(id) {
  return {
    type: CHANGE_FOCUS,
    payload: id,
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
      return {
        ...state,
        employees: [...state.employees, ...payload],
        page: state.page + 1,
        loading: false,
      };

    case `${GET_EMPLOYEES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case CHANGE_FOCUS:
      console.log(payload);
      return {
        ...state,
        focus: payload,
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

    default:
      return state;
  }
}
