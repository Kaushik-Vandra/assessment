import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashCard from "../../components/Card/DashCard";
import { getDashboard } from "../../Redux/DashboardSlice";
import "./dashboard.scss";

const Dashboard = () => {
  const [data, setData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    // axios({
    //   baseURL: API_BASE,
    //   method: "GET",
    //   url: API_DASHBOARD,
    // });
  }, []);

  return (
    <>
      {/* <h2 style={{ textAlign: "center" }}>Dashboard </h2>

      <br />

      <h4 style={{ textAlign: "center" }}>
        <Link to="/my-account">My Account</Link>
      </h4> */}

      <div className="card m-auto mx-5 my-5">
        <div className="card-body">
          <h3 className="text-center">Dashboard</h3> <br />
          <div className="row d-flex justify-content-center">
            {data && (
              <>
                <DashCard
                  count={data.activeUsers}
                  description="Total Active Users"
                />
                <DashCard
                  count={data.allUsers}
                  description="Total All-time Users"
                />
                <DashCard
                  count={data.activeSessions}
                  description="Total Active Sessions"
                />
                <DashCard
                  count={data.allPatients}
                  description="Total Patients"
                />
                <DashCard
                  count={data.activePatients}
                  description="Active Patients"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
