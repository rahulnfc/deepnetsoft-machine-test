import InputField from "../components/InputField";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const server = "http://localhost:3001";
const userId = localStorage.getItem("userId");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 30rem;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid teal;
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
  margin-bottom: 0.5rem;
`;

const Reset = styled.button`
  width: 8rem;
  height: 2rem;
  border-radius: 10px;
  margin-left: 1rem;
  background-color: white;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    background-color: #d44444;
    color: white;
    border: 1px solid #d44444;
    box-shadow: 0px 0px 10px #000000;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-left: -4.5rem;
`;

const AddProduct = () => {
  const history = useHistory();

  useEffect(() => {
    const token = cookies.get("userjwt");
    if (token) {
      history.push("/add-product");
    } else {
      history.push("/login");
    }
  });

  const [productError, setProductError] = useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    price: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    quantity: Yup.number()
      .positive("Must be a positive number")
      .required("Required"),
    category: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        quantity: "",
        category: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        setProductError(false);
        const data = {
          userId: userId,
          name: values.name,
          price: values.price,
          quantity: values.quantity,
          category: values.category,
        };
        axios
          .post(`${server}/api/products/add`, data)
          .then((res) => {
            history.push("/");
          })
          .catch((err) => {
            setProductError(true);
          });
      }}
    >
      <Container>
        <LogoText> Add Product.</LogoText>
        <Form>
          <Card>
            <InputField
              label="Name"
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
            />
            {productError && <Error>Product name already exists</Error>}
            <InputField
              label="Price"
              id="price"
              type="text"
              name="price"
              placeholder="Enter product price"
            />
            <InputField
              label="Quantity"
              id="quantity"
              type="text"
              name="quantity"
              placeholder="Enter product quantity"
            />
            <InputField
              label="Category"
              id="category"
              type="text"
              name="category"
              placeholder="Enter product category"
            />
            <Buttons>
              <Submit type="submit">Submit</Submit>
              <Reset type="reset" onClick={() => setProductError(false)}>
                Reset
              </Reset>
            </Buttons>
          </Card>
        </Form>
      </Container>
    </Formik>
  );
};

export default AddProduct;
