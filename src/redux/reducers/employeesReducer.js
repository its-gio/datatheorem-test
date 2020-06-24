const initialState = {
  employees: [],
  employeesFilter: [],
  persons: 500,
  page: 1,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const ADD_PAGE = "ADD_PAGE";

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

    default:
      return state;
  }
}
