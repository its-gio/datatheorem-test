const proxy = "https://cors-anywhere.herokuapp.com/";
const initialState = {
  employees: [],
  employeesFilter: [],
  employeesShown: [],
  employeesCount: null,
  employeesFilterCount: null,
  employeesShownCount: null,
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
const SHOW_NEXT_EMPLOYEES = "SHOW_NEXT_EMPLOYEES";
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

export function showNextEmployees(count) {
  const data = new Promise((res, rej) => {
    res(count);
  });
  return {
    type: SHOW_NEXT_EMPLOYEES,
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
      let fullEmployees = [...state.employees, ...payload];
      let fullEmployeesLength = fullEmployees.length;

      return {
        ...state,
        employees: fullEmployees,
        employeesShown: fullEmployees,
        employeesCount: fullEmployeesLength,
        employeesShownCount: fullEmployeesLength,
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
      let fullEmployeesBackground = [...state.employees, ...payload];
      let fullEmployeesLengthBackground = fullEmployeesBackground.length;

      if (payload.length === 0) {
        return { ...state };
      } else if (fullEmployeesLengthBackground === 1000) {
        return {
          ...state,
          employees: fullEmployeesBackground,
          employeesCount: fullEmployeesLengthBackground,
          page: 2,
          persons: 1000,
        };
      } else {
        return {
          ...state,
          employees: fullEmployeesBackground,
          employeesCount: fullEmployeesLengthBackground,
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

    case `${SHOW_NEXT_EMPLOYEES}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${SHOW_NEXT_EMPLOYEES}_FULFILLED`:
      const employeesShown = [
        ...state.employeesShown,
        ...state.employees.slice(payload, payload + 500),
      ];
      const employeesShownCount = employeesShown.length;

      return {
        ...state,
        employeesShown,
        employeesShownCount,
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
