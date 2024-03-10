import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Tables from "../../components/Tables";
import { useEffect, useState } from "react";
import Spiner from "../../components/spinner";
import { useUserContext } from "../../context";
import Alert from "react-bootstrap/Alert";
import { getUsersFunction } from "../../services/Api";

const Home = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const [userData, setUserData] = useState([]);
  const [showSpin, setShowSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  const addUser = () => {
    navigate("/register");
  };

  const getUser = async () => {
    const res = await getUsersFunction();
    //console.log(res);
    if (res.status === 200) {
      setUserData(res.data);
    } else {
      console.log("Something went wrong");
    }
    //console.log(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {userCtx.userAdd ? (
        <Alert
          variant="success"
          onClose={() => userCtx.setUserAdd("")}
          dismissible
        >
          {userCtx.userAdd.fname.toUpperCase()} Succesfully Added
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main-div">
          {/*------------------- Search button -------------------- */}
          <div className="search-add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="success">Search</Button>
              </Form>
            </div>
            <div className="add-btn">
              <Button variant="primary" onClick={addUser}>
                ➕ Add User
              </Button>
            </div>
          </div>

          {/* export gender status */}
          <div className="filter_D mt-5  d-flex justify-content-between flex-wrap ">
            <div className="export_csv">
              <Button className="export_btn">Export To CSV</Button>
            </div>

            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    // onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    // onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    // onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sort by value new and old  */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  ⌛
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item onClick={() => setSort("new")}>
                  New
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("old")}>
                  Old
                </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    //onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    // onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    //onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table  */}

        {showSpin ? <Spiner /> : <Tables userData={userData} />}
      </div>
    </>
  );
};
export default Home;
