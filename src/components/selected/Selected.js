import React from "react";
import {Chart} from "react-google-charts";
import "styled-components/macro";
import { Wrapper } from "./styles";

function Selected({ data, setFlag }) {

  const boxStyle = {
    backgroundColor : "#EEE3CB",
    width : `${data.rating_array.length*100}px`,
    padding : "10px",
  };

  const userData = [
    ["Rating", "Questions"],
    ...data.rating_array
  ];

  return (
    <div style={boxStyle} >
        <p>{data.tag}</p>
        {
          data.rating_array.map((el, index)=>(
            <div key={index}>{el[0]} &nbsp; {el[1]}</div>
          ))
        }
        <button onClick={() => setFlag(false)}>Back</button>
        <Chart
          chartType="Bar"
          width="100%"
          height="100%"
          data={userData}
          />
    </div>
  );
}

export default Selected;
