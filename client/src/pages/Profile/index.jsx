import Row from "react-bootstrap/esm/Row";
import "./profile.css";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Spiner from "../../components/spinner";
const Profile = () => {
  const [showSpin, setShowSpin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, []);
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
                    <img src="/man.png" />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>Arvind Kumar</h3>
                <h4>
                  📧&nbsp;<span>thakurarvindkr10@gmail.com</span>
                </h4>
                <h5>
                  📞&nbsp;<span>+91 9315207665</span>
                </h5>
                <h6>
                  🚹&nbsp;<span>Male</span>
                </h6>
                <h6>
                  🗺&nbsp;<span>Badaun Uttar Pradesh</span>
                </h6>
                <h6>
                  🗽&nbsp;<span>Active</span>
                </h6>
                <h6>
                  Created At : &nbsp;<span>12/02/2024</span>
                </h6>
                <h6>
                  Updated At : &nbsp;<span>12/02/2024</span>
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
