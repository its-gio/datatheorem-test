const proxy = "https://cors-anywhere.herokuapp.com/";
const initialState = {
  employees: [],
  employeesFilter: [],
  employeesCount: null,
  employeesFilterCount: null,
  employee: null,
  persons: 500,
  page: 1,
  focus: null,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const BACKGROUND_GET_EMPLOYEES = "BACKGROUND_GET_EMPLOYEES";
const GET_EMPLOYEE = "GET_EMPLOYEE";
const POST_EMPLOYEE = "POST_EMPLOYEE";
const CLICK_CHANGE_FOCUS = "CLICK_CHANGE_FOCUS";
const ARROW_UP_CHANGE_FOCUS = "ARROW_UP_CHANGE_FOCUS";
const ARROW_DOWN_CHANGE_FOCUS = "ARROW_DOWN_CHANGE_FOCUS";

// Export Functions
export function getEmpoyees(page, persons) {
  const data = fetch(
    `https://dt-interviews.appspot.com/?page=${page}&per_page=${persons}`
  ).then((blob) => blob.json());

  if (page === 1) {
    return {
      type: GET_EMPLOYEES,
      payload: data,
    };
  } else {
    return {
      type: BACKGROUND_GET_EMPLOYEES,
      payload: data,
    };
  }
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

export function postEmployee({ name, department, salary_string, job_titles }) {
  const employee_annual_salary = Number(salary_string).toFixed(2);
  const data = fetch(`${proxy}https://dt-interviews.appspot.com/`, {
    method: "POST",
    headers: {
      // prettier-ignore
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      department,
      employee_annual_salary,
      job_titles,
    }),
  }).then((blob) => blob.json());

  return {
    type: POST_EMPLOYEE,
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
      let fullEmployees1 = [...state.employees, ...payload];
      let fullEmployeesLength1 = fullEmployees1.length;

      return {
        ...state,
        employees: fullEmployees1,
        employeesFilter: fullEmployees1,
        employeesCount: fullEmployeesLength1,
        employeesFilterCount: fullEmployeesLength1,
        page: state.page + 1,
        loading: false,
      };

    case `${GET_EMPLOYEES}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case `${BACKGROUND_GET_EMPLOYEES}_FULFILLED`:
      let fullEmployees2 = [...state.employees, ...payload];
      let fullEmployeesLength2 = fullEmployees2.length;

      if (payload.length === 0) {
        return { ...state };
      } else if (fullEmployeesLength2 === 1000) {
        return {
          ...state,
          employees: fullEmployees2,
          employeesCount: fullEmployeesLength2,
          page: 2,
          persons: 1000,
        };
      } else {
        return {
          ...state,
          employees: fullEmployees2,
          employeesCount: fullEmployeesLength2,
          page: state.page + 1,
        };
      }

    case `${BACKGROUND_GET_EMPLOYEES}_REJECTED`:
      console.error(payload);
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
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case `${POST_EMPLOYEE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${POST_EMPLOYEE}_FULFILLED`:
      console.log(payload);
      return {
        ...state,
        loading: false,
      };

    case `${POST_EMPLOYEE}_REJECTED`:
      console.error(payload);
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
