import InputField from "../components/InputField";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server = "http://localhost:3001";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LinkText = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: teal;
  margin-top: 1rem;
  color: #008065;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 30rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: teal;
`;

const CardHeader = styled.div`
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 1rem;
`;

const Submit = styled.button`
  width: 8rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 11rem;
  background-color: white;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    background-color: #008065;
    color: white;
    border: 1px solid #008065;
    box-shadow: 0px 0px 10px #000000;
  }
`;

const LogoText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const Register = () => {
  const history = useHistory();
  useEffect(() => {
    const token = cookies.get("userjwt");
    if (token) {
      history.push("/");
    }
  });

  const [emailExists, setEmailExists] = useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("User name is required")
      .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    place: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
      .required("Place is required"),
    password: Yup.string()
      .min(6, "Password will be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        place: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setEmailExists(false);
        const data = {
          name: values.name,
          email: values.email,
          place: values.place,
          password: values.password,
        };
        axios
          .post(`${server}/api/user/register`, data)
          .then((res) => {
            // success and load the login page
            history.push("/login");
          })
          .catch((error) => {
            const response = error.response.data;
            if (response.emailExists) {
              // email error
              setEmailExists(true);
            }
          });
      }}
    >
      <Container>
        <LogoText> TrendZStation. </LogoText>
        <Form>
          <Card>
            <CardHeader> Register An Account With Us </CardHeader>
            <InputField
              label="Name"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
            />
            <InputField
              label="Email"
              id="email"
              type="text"
              name="email"
              placeholder="Enter your email"
            />
            {emailExists && <Error> Email already exists </Error>}
            <InputField
              label="Place"
              id="place"
              type="text"
              name="place"
              placeholder="Enter your place"
            />
            <InputField
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
            />
            <Submit type="submit"> Register </Submit>
          </Card>
        </Form>
        <LinkText to="/login"> Already have an account? Login here </LinkText>
      </Container>
    </Formik>
  );
};

export default Register;
