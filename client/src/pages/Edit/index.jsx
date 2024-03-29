import "./edit.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spiner from "../../components/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserFunction, userEditFunction } from "../../services/Api";
import { BASE_URL } from "../../services/helpers";
import { useUpdateUserContext } from "../../context";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useUpdateUserContext();
  const [user, setUser] = useState();
  const [showSpin, setShowSpin] = useState(true);
  const [imgData, setImgData] = useState();
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getSingleUserFunction(id);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (user) {
      setInputData({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        location: user.location,
      });
      setStatus(user.status);
      setImgData(user.profile);
    }
  }, [user]);

  //console.log(user);

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  //console.log(status);

  useEffect(() => {
    if (image) {
      setImgData("");
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const options = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];

  const onChnageHanlder = (e) => {
    if (e.target.name === "gender") {
      setInputData({ ...inputData, gender: e.target.value });
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputData;
    if (fname === "") {
      toast.error("please enter a first name");
    } else if (lname === "") {
      toast.error("please enter a last name");
    } else if (email === "") {
      toast.error("please enter your email");
    } else if (mobile.length > 10) {
      toast.error("please enter a valid mobile number");
    } else if (gender === "") {
      toast.error("please enter a gender");
    } else if (location === "") {
      toast.error("please enter your location");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imgData);
      // console.log(status)
      // console.log(inputData, image);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const res = await userEditFunction(id, data, config);
      // console.log(res)
      if (res.status === 200) {
        ctx.setUpdateUser(res.data);
        toast.success("updated successfully", inputData.fname);
        navigate("/");
      } else {
        toast.error("error: something went wrong");
      }
      //console.log(response);
    }
  };

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container my-5">
          <Card className="p-5">
            <h2 className="text-center mt-1">Update Your Details</h2>
            <div className="profile_div text-center">
              <img
                src={image ? preview : `${BASE_URL}/uploads/${imgData}`}
                className="img-thumbnail"
              />
            </div>
            <Form onSubmit={onSubmitHandler}>
              <Row>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    value={inputData.fname}
                    onChange={(e) => onChnageHanlder(e)}
                    placeholder="enter your first name..."
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter your last name..."
                    name="lname"
                    value={inputData.lname}
                    onChange={(e) => onChnageHanlder(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="enter your email name..."
                    name="email"
                    value={inputData.email}
                    onChange={(e) => onChnageHanlder(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter your mobile number..."
                    name="mobile"
                    value={inputData.mobile}
                    onChange={(e) => onChnageHanlder(e)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="male"
                    checked={inputData.gender === "male" ? true : false}
                    onChange={(e) => onChnageHanlder(e)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    onChange={(e) => onChnageHanlder(e)}
                    checked={inputData.gender === "Female" ? true : false}
                    value="female"
                  ></Form.Check>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select
                    options={options}
                    // value={status}
                    defaultValue={status}
                    onChange={(e) => setStatus(e?.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
                    // value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="e.g Delhi."
                    value={inputData.location}
                    onChange={(e) => onChnageHanlder(e)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};
export default Edit;
