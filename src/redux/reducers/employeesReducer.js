const initialState = {
  employees: [],
  employeesFilter: [],
  persons: 500,
  page: 1,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";

// Export Functions
export function getEmpoyees(page = 1) {
  const data = fetch(
    `https://dt-interviews.appspot.com/?page=${page}&per_page=500`
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
        // employees: [...this.state.employees, ...res],
        employees: payload,
        scrolling: false,
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
