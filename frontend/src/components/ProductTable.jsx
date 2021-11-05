import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  top: 5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 90%;
  table-layout: fixed;
  margin-bottom: 3rem;
  @media screen and (max-width: 600px) {
    border: 0;
  }
`;

const Thead = styled.thead`
  @media screen and (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

const Tbody = styled.tbody`
  background-color: white;
  height: 3rem;
  color: black;
`;

const Tr = styled.tr`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
  @media screen and (max-width: 600px) {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }
`;

const Th = styled.th`
  padding: 0.625em;
  text-align: center;
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 0.625em;
  text-align: center;
  @media screen and (max-width: 600px) {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
    & ::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    & :last-child {
      border-bottom: 0;
    }
  }
`;

const IMG = styled.img`
  width: 70px;
  height: 80px;
  margin-top: 15px;
  margin-left: 20px;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: #008659;
  color: white;
  cursor: pointer;
`;

const EmptyProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  & p {
    text-align: center;
  }
  & h3 {
    margin-bottom: 2rem;
  }
`;

const ProductTable = () => {
  const { products } = useContext(UserContext);

  return (
    <Container>
      {products.length === 0 ? (
        <EmptyProduct>
          <IMG
            src="https://image.flaticon.com/icons/png/512/102/102661.png"
            alt="empty-cart"
          />
          <h3>Your shop is empty</h3>
          <p>
            You can add items to your shop by clicking on the Add Products
            button.
          </p>
          <Link to="/add-product" style={{ margin: "1rem 0" }}>
            <Button>Add Products</Button>
          </Link>
        </EmptyProduct>
      ) : (
        <>
          <Link
            to="/add-product"
            style={{ margin: "1rem 0 1rem 35rem", cursor: "pointer" }}
          >
            <Button>Add Products</Button>
          </Link>
          <Table>
            <Thead>
              <Tr>
                <Th scope="col">Name</Th>
                <Th scope="col">Price</Th>
                <Th scope="col">Quantity</Th>
                <Th scope="col">Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product, index) => {
                return (
                  <Tr key={index}>
                    <Td data-label="Name" scope="row" badge="primary">
                      <p>{product.name}</p>
                    </Td>
                    <Td data-label="Price">
                      <p> $ {product.price}</p>
                    </Td>
                    <Td data-label="Quantity">
                      <p>{product.quantity}</p>
                    </Td>
                    <Td data-label="Category">
                      <p>{product.category}</p>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default ProductTable;
