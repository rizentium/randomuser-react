import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: [],
  normalized: [],
  page: 1,
  sort: {
    value: "",
    from: "up",
  },
  filter: "all",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    update: (state, actions) => {
      return {
        ...state,
        ...{
          result: actions.payload.result,
          normalized: actions.payload.result,
          page: actions.payload.page ?? 1,
        },
      };
    },
    reset: (state) => {
      return {
        ...state,
        ...{
          normalized: state.normalized,
        },
      };
    },
    filter: (state, actions) => {
      return {
        ...state,
        ...{
          normalized: state.result.filter(
            (data) => data.gender === actions.payload.gender
          ),
        },
      };
    },
    search: (state, actions) => {
      const query = actions.payload.query.toLowerCase();

      return {
        ...state,
        ...{
          normalized: state.result.filter((data) => {
            return (
              data.login.username.toLowerCase().includes(query) ||
              `${data.name.first} ${data.name.last}`
                .toLowerCase()
                .includes(query) ||
              data.email.toLowerCase().includes(query)
            );
          }),
        },
      };
    },
    sorting: (state, actions) => {
      const sortUp = (a, b) => (a.toLowerCase() > b.toLowerCase() ? -1 : 0);
      const sortDown = (a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 0);
      let normalized = [];

      switch (actions.payload.value) {
        case "username":
          normalized = state.result.sort((a, b) =>
            actions.payload.from === "up"
              ? sortUp(a.login.username, b.login.username)
              : sortDown(a.login.username, b.login.username)
          );
          break;
        case "name":
          normalized = state.result.sort((a, b) =>
            actions.payload.from === "up"
              ? sortUp(
                  `${a.name.first} ${a.name.last}`,
                  `${b.name.first} ${b.name.last}`
                )
              : sortDown(
                  `${a.name.first} ${a.name.last}`,
                  `${b.name.first} ${b.name.last}`
                )
          );
          break;
        case "email":
          normalized = state.result.sort((a, b) =>
            actions.payload.from === "up"
              ? sortUp(a.email, b.email)
              : sortDown(a.email, b.email)
          );
          break;
        case "gender":
          normalized = state.result.sort((a, b) =>
            actions.payload.from === "up"
              ? sortUp(a.gender, b.gender)
              : sortDown(a.gender, b.gender)
          );
          break;
        case "registeredDate":
          normalized = state.result.sort((a, b) =>
            actions.payload.from === "up"
              ? sortUp(a.registered.date, b.registered.date)
              : sortDown(a.registered.date, b.registered.date)
          );
          break;
        default:
      }

      state.normalized = normalized;
      state.sort = actions.payload;
    },
    setPage: (state, actions) => {
      return {
        ...state,
        ...{
          page: actions.payload,
        },
      };
    },
    setFilter: (state, actions) => {
      return {
        ...state,
        ...{
          filter: actions.payload,
        },
      };
    },
  },
});

export const { update, filter, search, sorting, setPage, setFilter } = usersSlice.actions;

export default usersSlice.reducer;
