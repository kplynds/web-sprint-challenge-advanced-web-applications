import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch((err) => {
        console.log(`this is the error: ${err}`);
      });
  };
  return (
    <div className="body">
      <h1>Welcome to the Bubbles App</h1>
      <div className="form">
        <form onSubmit={submit}>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <input
            placeholder="password"
            type="text"
            name="password"
            value={formValues.passowrd}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
