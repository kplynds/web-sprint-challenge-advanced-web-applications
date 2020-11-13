import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWAuth";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then((res) => {
        console.log(res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div><button onClick={signout}>Signout</button></div>
      <div>
        <ColorList colors={colorList} updateColors={setColorList} />
      </div>
      <div>
        <Bubbles colors={colorList} />
      </div>
    </div>
  );
};

export default BubblePage;
