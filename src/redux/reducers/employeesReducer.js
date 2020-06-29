const proxy = "https://cors-anywhere.herokuapp.com/";
const initialState = {
  employees: [],
  employeesFilter: [],
  employeesDisplay: [],
  departments: [],
  employeesCount: null,
  employeesFilterCount: null,
  employee: null,
  APIPeople: 500,
  APIPage: 1,
  peopleShown: 500,
  pageShown: 1,
  iOfLastEmployee: null,
  iOfFirstEmployee: null,
  focus: null,
  loading: true,
};

// Actions
const GET_EMPLOYEES = "GET_EMPLOYEES";
const BACKGROUND_GET_EMPLOYEES = "BACKGROUND_GET_EMPLOYEES";
const GET_EMPLOYEE = "GET_EMPLOYEE";
const POST_EMPLOYEE = "POST_EMPLOYEE";
const SHOW_NEXT_EMPLOYEES = "SHOW_NEXT_EMPLOYEES";
const CHANGE_PAGE_SHOWN = "CHANGE_PAGE_SHOWN";
const CLICK_CHANGE_FOCUS = "CLICK_CHANGE_FOCUS";
const ENTER_ON_EMPLOYEE_DISPLAY = "ENTER_ON_EMPLOYEE_DISPLAY";
const ARROW_UP_CHANGE_FOCUS = "ARROW_UP_CHANGE_FOCUS";
const ARROW_DOWN_CHANGE_FOCUS = "ARROW_DOWN_CHANGE_FOCUS";
const HANDLE_FILTER_CHANGE = "HANDLE_FILTER_CHANGE";
const HANDLE_FILTER_CLEAR = "HANDLE_FILTER_CLEAR";
const DO_NOTHING = "DO_NOTHING";

// Export Functions
export function getEmpoyees(APIPage, APIPeople) {
  const data = fetch(
    `https://dt-interviews.appspot.com/?page=${APIPage}&per_page=${APIPeople}`
  ).then((blob) => blob.json());

  if (APIPage === 1) {
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

export function showNextEmployees() {
  return {
    type: SHOW_NEXT_EMPLOYEES,
    payload: null,
  };
}

export function changePage(pageNum) {
  return {
    type: CHANGE_PAGE_SHOWN,
    payload: pageNum,
  };
}

export function clickChangeFocus(id) {
  return {
    type: CLICK_CHANGE_FOCUS,
    payload: id,
  };
}

export function enterOnEmployeeDisplay(focus) {
  return {
    type: ENTER_ON_EMPLOYEE_DISPLAY,
    payload: focus,
  };
}

export function arrowChangeFocus(focus, keyCode) {
  if (focus && keyCode === 38) {
    return {
      type: ARROW_UP_CHANGE_FOCUS,
      payload: focus,
    };
  } else if (focus && keyCode === 40) {
    return {
      type: ARROW_DOWN_CHANGE_FOCUS,
      payload: focus,
    };
  }
  return {
    type: DO_NOTHING,
    payload: {},
  };
}

export function handleFilterChange(department) {
  if (department) {
    return {
      type: HANDLE_FILTER_CHANGE,
      payload: department,
    };
  }
}

export function clearFilter() {
  return {
    type: HANDLE_FILTER_CLEAR,
    payload: {},
  };
}

// Helper Functions
function reduceDepartments(employees, currentDepartments = []) {
  return employees.reduce((accu, employee) => {
    if (!accu.includes(employee.department)) accu.push(employee.department);
    return accu;
  }, currentDepartments);
}

function filterByDepartments(employees, department) {
  return employees.reduce((accu, employee) => {
    if (employee.department === department) accu.push(employee);
    return accu;
  }, []);
}

function findFocusIndex(
  employeesFilterCount,
  employeesFilter,
  employees,
  payload
) {
  return employeesFilterCount
    ? employeesFilter.findIndex((employee) => employee.id === payload)
    : employees.findIndex((employee) => employee.id === payload);
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
      const iOfLastEmployeeFirst = state.pageShown * state.peopleShown;
      const iOfFirstEmployeeFirst = iOfLastEmployeeFirst - state.peopleShown;
      const departmentsFirst = reduceDepartments(fullEmployees);

      return {
        ...state,
        employees: fullEmployees,
        employeesDisplay: fullEmployees,
        employeesCount: fullEmployeesLength,
        iOfLastEmployee: iOfLastEmployeeFirst,
        iOfFirstEmployee: iOfFirstEmployeeFirst,
        APIPage: state.APIPage + 1,
        departments: departmentsFirst,
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
      let departments = reduceDepartments(payload, state.departments);

      if (payload.length === 0) {
        return { ...state };
      } else if (fullEmployeesLengthBackground === 1000) {
        return {
          ...state,
          employees: fullEmployeesBackground,
          employeesCount: fullEmployeesLengthBackground,
          departments,
          APIPage: 2,
          APIPeople: 1000,
        };
      } else {
        return {
          ...state,
          employees: fullEmployeesBackground,
          employeesCount: fullEmployeesLengthBackground,
          departments,
          APIPage: state.APIPage + 1,
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
      return {
        ...state,
        employees: [...state.employees, payload],
        loading: false,
      };

    case `${POST_EMPLOYEE}_REJECTED`:
      console.error(payload);
      return {
        ...state,
        loading: false,
      };

    case SHOW_NEXT_EMPLOYEES:
      const iOfLastEmployee = state.pageShown * state.peopleShown;
      const iOfFirstEmployee = iOfLastEmployee - state.peopleShown;

      if (state.employeesFilterCount) {
        return {
          ...state,
          employeesDisplay: state.employeesFilter.slice(
            iOfFirstEmployee,
            iOfLastEmployee
          ),
          iOfLastEmployee,
          iOfFirstEmployee,
          loading: false,
        };
      }

      return {
        ...state,
        employeesDisplay: state.employees.slice(
          iOfFirstEmployee,
          iOfLastEmployee
        ),
        iOfLastEmployee,
        iOfFirstEmployee,
        loading: false,
      };

    case CHANGE_PAGE_SHOWN:
      return {
        ...state,
        pageShown: payload,
      };

    case CLICK_CHANGE_FOCUS:
      return {
        ...state,
        focus: payload,
      };

    case ENTER_ON_EMPLOYEE_DISPLAY:
      const employeeIndex = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );
      const pageShown = Math.ceil((employeeIndex + 1) / 500);

      return {
        ...state,
        pageShown,
      };

    case ARROW_UP_CHANGE_FOCUS:
      const indexUp = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );

      if (indexUp === 0) return { ...state };

      const idUp = state.employeesFilterCount
        ? state.employeesFilter[indexUp - 1].id
        : state.employees[indexUp - 1].id;

      return {
        ...state,
        focus: idUp,
      };

    case ARROW_DOWN_CHANGE_FOCUS:
      const indexDown = findFocusIndex(
        state.employeesFilterCount,
        state.employeesFilter,
        state.employees,
        payload
      );

      if (
        indexDown === state.employeesCount - 1 ||
        indexDown === state.employeesFilterCount - 1
      )
        return { ...state };

      const idDown = state.employeesFilterCount
        ? state.employeesFilter[indexDown + 1].id
        : state.employees[indexDown + 1].id;

      return {
        ...state,
        focus: idDown,
      };

    case HANDLE_FILTER_CLEAR:
      const iOfLastEmployeeFilterClear = 1 * state.peopleShown;
      const iOfFirstEmployeeFilterClear =
        iOfLastEmployeeFilterClear - state.peopleShown;

      return {
        ...state,
        employeesFilter: [],
        employeesFilterCount: null,
        employeesDisplay: state.employees.slice(
          iOfFirstEmployeeFilterClear,
          iOfLastEmployeeFilterClear
        ),
      };

    case HANDLE_FILTER_CHANGE:
      const employeesFilter = filterByDepartments(state.employees, payload);
      const employeesFilterCount = employeesFilter.length;
      const iOfLastEmployeeFilter = 1 * state.peopleShown;
      const iOfFirstEmployeeFilter = iOfLastEmployeeFilter - state.peopleShown;

      return {
        ...state,
        employeesFilter,
        employeesFilterCount,
        employeesDisplay: employeesFilter.slice(
          iOfFirstEmployeeFilter,
          iOfLastEmployeeFilter
        ),
        iOfLastEmployeeFilter,
        iOfFirstEmployeeFilter,
        pageShown: 1,
      };

    default:
      return state;
  }
}
