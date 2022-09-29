import React from "react";
import { Button } from "react-bootstrap";
import {Chart} from "react-google-charts";
import "styled-components/macro";
import { Wrapper } from "./styles";

function Selected({ data, setFlag }) {

  const boxStyle = {
    // backgroundColor : "#EEE3CB",
    width : `${data.rating_array.length*100}px`,
    padding : "10px",
  };

  const userData = [
    ["Rating", "Questions"],
    ...data.rating_array
  ];

  return (
    <div style={boxStyle} >
      
        {/* <p>{data.tag}</p>
        {
          data.rating_array.map((el, index)=>(
            <div key={index}>{el[0]} &nbsp; {el[1]}</div>
          ))
        } */}
        {/* <Button variant="alert" onClick={()=> setFlag(false)}> GO BACK! </Button> */}
        <Button style={{margin:"10px"}} variant="secondary" onClick={() => setFlag(false)}> Back </Button>
        <Chart
          style={{
            minWidth : "40vw",
            maxWidth : "80vw"
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
