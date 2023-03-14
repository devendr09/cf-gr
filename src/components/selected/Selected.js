import React from "react";
import { Button, Form } from "react-bootstrap";
import { Chart } from "react-google-charts";

function Selected({ data, setFlag }) {

  const boxStyle = {
    width: `${data.rating_array.length * 100}px`,
    padding: "10px",
  };

  const userData = [
    ["Rating", "Questions"],
    ...data.rating_array
  ];

  return (
    <div style={boxStyle} >
      <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
        <Form.Control disabled style={{ width: "500px", marginRight: "10px" }} value={data.tag} />
        <Button variant="secondary" onClick={() => setFlag(false)}> Back </Button>
      </div>
      <Chart
        style={{
          minWidth: "30vw",
          maxWidth: "75vw"
        }}
        chartType="Bar"
        width="100%"
        height="100%"
        data={userData}
      />
    </div>
  );
}

export default Selected;
