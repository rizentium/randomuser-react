import reducer, {
  update,
  filter,
  search,
} from "../../features/users/usersSlice";
import users from "../mocks/users.mock";
import usersMale from "../mocks/users-male.mock";
import usersSearchMock from "../mocks/users-search.mock";

const initValue = {
  result: [],
  normalized: [],
  page: 1,
  sort: {
    value: "",
    from: "up",
  },
  filter: "all",
};

test("should return the initial value", () => {
  expect(reducer(undefined, {})).toEqual(initValue);
});

test("should update the value", () => {
  expect(reducer(initValue, update({ result: users.results }))).toEqual({
    ...initValue,
    ...{
      result: users.results,
      normalized: users.results,
    },
  });
});

test("should filter the value", () => {
  const testValue = {
    ...initValue,
    ...{
      result: users.results,
      normalized: users.results,
    },
  };
  expect(reducer(testValue, filter({ gender: "male" }))).toEqual({
    ...testValue,
    ...{
      result: users.results,
      normalized: usersMale.results,
    },
  });
});

test("should return the value based on search query", () => {
  const testValue = {
    ...initValue,
    ...{
      result: users.results,
      normalized: users.results,
    },
  };
  expect(reducer(testValue, search({ query: "cohen" }))).toEqual({
    ...testValue,
    ...{
      result: users.results,
      normalized: usersSearchMock.results,
    },
  });
});

test("should not return the value because not found", () => {
  const testValue = {
    ...initValue,
    ...{
      result: users.results,
      normalized: users.results,
    },
  };
  expect(reducer(testValue, search({ query: "lobo" }))).toEqual({
    ...testValue,
    ...{
      result: users.results,
      normalized: [],
    },
  });
});
