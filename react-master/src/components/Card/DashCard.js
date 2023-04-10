import React from "react";

const DashCard = (props) => {
  return (
    <>
      {/* <div className="col-sm-6"> */}
      <div
        className="card mx-2 my-2"
        style={{ width: "18rem", height: "10rem", background: "blue" }}
      >
        <div className="card-body">
          <h5 className="card-title text-light">{props.count}</h5>
          <p className="card-text text-light">{props.description}</p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DashCard;
