import React, { useState } from "react";
import axios from "axios";
import Selected from "./selected/Selected";
import "./UserInput.css";
import { Button, Form } from "react-bootstrap";

export default function UserInput() {

  const [input, setInput] = useState("");
  const [userData, setUserData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [flag, setFlag] = useState(false);
  let hm = new Map();
  let st = new Set();

  function handleChange(e) {
    var temp = e.target.value;
    setInput(temp);
  }

  const user_array = [];

  async function handleClick() {
    try {
      const res = await axios.get(
        `https://codeforces.com/api/user.status?handle=${input}`
      );
      setFlag(0);
      for (let i = 0; i < res?.data?.result?.length; i++) {
        var rating = String(res.data.result[i].problem.rating);
        var tag_length = res.data.result[i].problem.tags.length;
        var verdict = res.data.result[i].verdict;
        var contestID = res.data.result[i].problem.contestId;
        var qtype = res.data.result[i].problem.index;
        let key = { a: contestID, b: qtype };

        if (tag_length === 0 || rating === undefined || rating === "undefined" || verdict !== "OK")
          continue;
        if (st.has(key)) continue;
        st.add(key);

        for (let j = 0; j < tag_length; j++) {
          var tag = res.data.result[i].problem.tags[j];
          if (hm.has(tag) === false) hm.set(tag, []);
          let found = 0;
          for (let k = 0; k < hm.get(tag).length; k++) {
            if (hm.get(tag)[k][0] === rating) {
              found = 1;
              hm.get(tag)[k][1]++;
              break;
            }
          }
          if (found === 0) {
            hm.get(tag).push([rating, 1]);
          }
        }
      }
      for (let [key, value] of hm) {
        value.sort((a, b) => {
          return parseInt(a[0]) - parseInt(b[0]);
        });
        let obj = {
          tag: key,
          rating_array: value,
        };
        user_array.push(obj);
      }
      console.log(user_array);
      setUserData(user_array);
    } catch (error) {}
  }

  function handleTagClick(e, index) {
    console.log(e);
    setFlag(true);
    setSelected(index);
  }
  console.log("Hello")
  return (
    <div>
      <Form>
        <Form.Control  placeholder="Enter Codeforces Username" style={{display : "inline", width : "40%", marginRight : "10px"}} type="text" onChange={handleChange} value={input} />
        <Button
          variant="primary"
          disabled={!input.length}
          onClick={handleClick}
        >
          Submit
        </Button>
      </Form>
      <div className="containerStyle" style={{justifyContent : flag ? "space-evenly" : "center"}}>
        {flag ? (
          <div className="graphStyle">
            <Selected
              data={userData.length && userData[selected]}
              setFlag={setFlag}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="tagBoxStyle">
          {userData.map((el, index) => (
            <div
              className="tagStyle"
              key={index}
              onClick={() => handleTagClick(el, index)}
            >
              {el.tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
