import Row from "react-bootstrap/esm/Row";
import "./profile.css";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Spiner from "../../components/spinner";
import { useParams } from "react-router-dom";
import { getSingleUserFunction } from "../../services/Api";
import { BASE_URL } from "../../services/helpers";
const Profile = () => {
  const [showSpin, setShowSpin] = useState(true);
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      let res = await getSingleUserFunction(id);
      setUser(res.data);
    })();
  }, []);
  const { id } = useParams();
  
  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);

  //console.log(id);
  //console.log(user);
  return (
    <>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
          <Card className="card_profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="cart_profile_status d-flex justify-content-center">
                    <img
                      src={
                        user.profile
                          ? `${BASE_URL}/uploads/${user.profile}`
                          : "/man.png"
                      }
                      alt="img"
                    />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{user.fname + " " + user.lname}</h3>
                <h4>
                  📧&nbsp;<span>{user.email}</span>
                </h4>
                <h5>
                  📞&nbsp;<span>+91 {user.mobile}</span>
                </h5>
                <h6>
                  🚹&nbsp;<span>{user.gender}</span>
                </h6>
                <h6>
                  🗺&nbsp;<span>{user.location}</span>
                </h6>
                <h6>
                  🗽&nbsp;<span>{user.status}</span>
                </h6>
                <h6>
                  Created At : &nbsp;<span>{user.createdAt}</span>
                </h6>
                <h6>
                  Updated At : &nbsp;<span>{user.updatedAt}</span>
                </h6>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
export default Profile;
