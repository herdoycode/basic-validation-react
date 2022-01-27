import React, { useState } from "react";
import Input from "./Input";

const Form = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const error = {};
    if (data.username.trim() === "") {
      error.username = "Username is not define";
    }
    if (data.password.trim() === "") {
      error.password = "Password is required";
    }
    return Object.keys(error).length === 0 ? null : error;
  };

  const validateProperty = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username is required";
    }
    if (input.name === "password") {
      if (input.value.trim() === "") return "Password is required";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate() || {});
    if (validate()) return;
    console.log("!Submited");
  };

  const handleChange = ({ target: input }) => {
    const errorsClone = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) errorsClone[input.name] = errorMessage;
    else delete errorsClone[input.name];
    const dataClone = { ...data };
    dataClone[input.name] = input.value;
    setData(dataClone);
    setErrors(errorsClone);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={data.username}
        onChange={handleChange}
        label={"Username"}
        name={"username"}
        type={"text"}
        error={errors.username}
      />
      <Input
        value={data.password}
        onChange={handleChange}
        label={"Password"}
        name={"password"}
        type={"password"}
        error={errors.password}
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Form;
