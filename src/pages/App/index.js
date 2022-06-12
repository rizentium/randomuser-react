import Header from "../../components/header";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as usersSlice from "../../features/users/usersSlice";
import * as usersApi from "../../api/users";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  return (
    <Row style={{ alignItems: "flex-end" }}>
      <Col xs="3">
        <Label>Search</Label>
        <InputGroup>
          <Input
            type="text"
            name="search"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          />
          <Button color="primary" onClick={() => props.doSearch()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </InputGroup>
      </Col>
      <Col xs="3">
        <Label>Gender</Label>
        <select
          value={props.filter}
          onChange={(e) => props.setFilter(e.target.value)}
          className="form-select"
        >
          <option value={"all"}>All</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
      </Col>
      <Col xs="2">
        <Button color="primary" outline onClick={() => props.reset()}>
          Reset Filter
        </Button>
      </Col>
    </Row>
  );
}

function TableSortIcon({ sort, label }) {
  if (sort.value === label) {
    return (
      <FontAwesomeIcon icon={sort.from === "up" ? faSortUp : faSortDown} />
    );
  } else {
    return <FontAwesomeIcon icon={faSort} />;
  }
}

function App() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const fetchingData = (page = 1, filter = "all") =>
    usersApi.fetch({ page, gender: filter }).then(({ data }) => {
      dispatch(
        usersSlice.update({ result: data.results, page: data.info.page })
      );
    });

  const setSortValue = (value) => {
    const from = users?.sort.from === "up" ? "down" : "up";
    dispatch(usersSlice.sorting({value, from}));
  };

  const doSearch = () => dispatch(usersSlice.search({ query: search }));

  const doReset = () => {
    dispatch(usersSlice.setFilter("all"));
    setSearch("");
    fetchingData();
  };

  const setFilter = (payload) => {
    dispatch(usersSlice.setFilter(payload));
    fetchingData(users?.page, payload);
  }

  if (!users?.result.length) {
    fetchingData();
  }

  return (
    <Container>
      <Header name="Example Page" title="Example With Search and Filter" />
      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={users?.filter}
        setFilter={setFilter}
        doSearch={doSearch}
        reset={doReset}
      />
      <hr />
      <div>
        <Table hover responsive size="sm">
          <thead className="display-flex">
            <tr>
              <th onClick={() => setSortValue("username")}>
                Username <TableSortIcon sort={users?.sort} label="username" />
              </th>
              <th onClick={() => setSortValue("name")}>
                Name <TableSortIcon sort={users?.sort} label="name" />
              </th>
              <th onClick={() => setSortValue("email")}>
                Email <TableSortIcon sort={users?.sort} label="email" />
              </th>
              <th onClick={() => setSortValue("gender")}>
                Gender <TableSortIcon sort={users?.sort} label="gender" />
              </th>
              <th onClick={() => setSortValue("registeredDate")}>
                Registered Date{" "}
                <TableSortIcon sort={users?.sort} label="registeredDate" />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.normalized?.map((data) => {
              return (
                <tr key={data.email}>
                  <th scope="row">{data.login.username}</th>
                  <td>{`${data.name.title}. ${data.name.first} ${data.name.last}`}</td>
                  <td>{data.email}</td>
                  <td>{data.gender}</td>
                  <td>{data.registered.date}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination style={{ display: "flex", justifyContent: "flex-end" }}>
          <PaginationItem
            onClick={() =>
              users?.page === 1 ? null : fetchingData(users?.page - 1, users?.filter)
            }
            disabled={users?.page === 1}
          >
            <PaginationLink href="#">
              <FontAwesomeIcon icon={faChevronLeft} />
            </PaginationLink>
          </PaginationItem>
          {users?.page > 1 ? (
            <PaginationItem onClick={() => fetchingData(users?.page - 1, users?.filter)}>
              <PaginationLink href="#">{users?.page - 1}</PaginationLink>
            </PaginationItem>
          ) : null}
          <PaginationItem active>
            <PaginationLink href="#">{users?.page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={() => fetchingData(users?.page + 1, users?.filter)}>
              {users?.page + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => fetchingData(users?.page + 1, users?.filter)}
            disabled={users?.length < 10}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </PaginationLink>
        </Pagination>
      </div>
    </Container>
  );
}

export default App;
