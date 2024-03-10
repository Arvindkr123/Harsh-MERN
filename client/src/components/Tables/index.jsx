import "./table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../services/helpers";
const Tables = ({ userData }) => {
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {userData.map((user, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          {user.fname} {user.lname}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.gender === "male" ? "M" : "F"}</td>
                        <td className="d-flex align-items-center">
                          <Dropdown className="text-center">
                            <Dropdown.Toggle
                              className="dropdown_btn"
                              id="dropdown-basic"
                            >
                              <Badge
                                bg={
                                  user.status === "Active"
                                    ? "primary"
                                    : "danger"
                                }
                              >
                                {user.status} 🔽
                              </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>Active</Dropdown.Item>
                              <Dropdown.Item>InActive</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td className="img_parent">
                          <img
                            src={
                              user.profile
                                ? `${BASE_URL}/uploads/${user.profile}`
                                : "/man.png"
                            }
                            alt="img"
                          />
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              className="action"
                              id="dropdown-basic"
                            ></Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <NavLink
                                  to={`/userprofile/${1}`}
                                  className="text-decoration-none"
                                >
                                  <i
                                    class="fa-solid fa-eye"
                                    style={{ color: "green" }}
                                  ></i>{" "}
                                  <span>View</span>
                                </NavLink>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <NavLink
                                  to={`/edit/id`}
                                  className="text-decoration-none"
                                >
                                  <i
                                    class="fa-solid fa-pen-to-square"
                                    style={{ color: "blue" }}
                                  ></i>{" "}
                                  <span>Edit</span>
                                </NavLink>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <div>
                                  <i
                                    class="fa-solid fa-trash"
                                    style={{ color: "red" }}
                                  ></i>{" "}
                                  <span>Delete</span>
                                </div>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};
export default Tables;
