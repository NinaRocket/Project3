import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams, useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../../utils/API";
import UserVehicleCard from "../UserVehicleCard";
import bgImages from "../../../images/user-page/vehicleCardBgImages.json";
import { useDriverKickContext } from "../../../utils/DriverKickContext";

function UserMainWrapper() {
  // Context import
  const { userData, setUserData, logout } = useDriverKickContext();

  // Stores vehicle info from the database
  const [vehicleInfo, setVehicleInfo] = useState([]);

  // Sets up page redirect
  const history = useHistory();

  const { id } = useParams();

  // API Call for User and Vehicle Info
  useEffect(() => {
    // This is clean up for "Can't perform a React state update on an unmounted component." error
    const abortController = new AbortController();
    const signal = abortController.signal;

    API.getUser({ signal: signal })
      .then((res) => {
        if (res.data.isAuthenticated === false) {
          return logout(history);
        }

        setUserData({ ...userData, ...res.data });
        console.log(res.data)
      })
      .catch((err) => console.log(err));

    API.getVehicles()
      .then((res) => {
        if (res.data.isAuthenticated === false) {
          return logout(history);
        }
        //console.log(res.data);
        if (res.data.length === 0) {
          history.push("/add-vehicle");
        }
        setVehicleInfo(res.data);
        //console.log(vehicleInfo);
      })
      .catch((err) => console.log(err));
      
    // This is clean up for "Can't perform a React state update on an unmounted component." error
    return function cleanup() {
      abortController.abort()
    }
  }, []);

  console.log(userData)

  const getLatestVehicles = () => {
    API.getVehicles()
      .then((res) => {
        if (res.data.isAuthenticated === false) {
          return logout(history);
        }
        setVehicleInfo(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="g__dashboard-wrapper">
      <div className="container">
        <Row>
          <Col lg={3} className="g__dashboard-user-info">
            <h1 className="g__dash-h1">Welcome {userData.firstName}</h1>
            <p>
              Here are the vehicles you are tracking maintenance for. Add new
              ones at any time!
            </p>
          </Col>
          <Col lg={1}></Col>
          <Col lg={8}>
            {vehicleInfo.map((v, index) => {
              console.log(bgImages.length);
              const imgIndex = index % bgImages.length
              return (
                <UserVehicleCard
                  key={v._id}
                  vehicleID={v._id}
                  vehicleIcon={v.icon}
                  vehicleMake={v.make}
                  vehicleYear={v.year}
                  vehicleModel={v.model}
                  carNickname={v.nickname}
                  ownerName={v.driverName}
                  getLatestVehicles={getLatestVehicles}
                  bgCardImage={bgImages[imgIndex].image}
                />
              )
            })}
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default UserMainWrapper;
