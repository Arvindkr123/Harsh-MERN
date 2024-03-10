import "./register.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spiner from "../../components/spinner";
import { registerFunction } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context";

const Register = () => {
  const navigate = useNavigate();
  const userCtx = useUserContext();
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [showSpin, setShowSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const onChnageHanlder = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    if (name === "gender") {
      setInputData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputData;
    // console.log(inputData);
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
    } else if (image === "") {
      toast.error("please select an image");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      // console.log(status)
      // console.log(inputData, image);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      const response = await registerFunction(data, config);
      console.log(response);
      if (response.status === 201) {
        setInputData({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: "",
        });
        setStatus("");
        setImage("");
        userCtx.setUserAdd(response.data);
        toast.success("User registered successfully");

        navigate("/");
      } else {
        toast.error("Error : Something went wrong");
      }
    }
  };

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container my-5">
          <Card className="p-5">
            <h2 className="text-center mt-1">Register Your Details</h2>
            <div className="profile_div text-center">
              <img
                src={preview ? preview : "/man.png"}
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
                    onChange={(e) => onChnageHanlder(e)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    onChange={(e) => onChnageHanlder(e)}
                    value="female"
                  ></Form.Check>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control
                    type="file"
                    name="user_profile"
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
export default Register;
