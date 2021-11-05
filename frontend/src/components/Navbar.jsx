import { useContext } from "react";
import { Badge } from "@material-ui/core";
import { ShoppingBasket } from "@material-ui/icons";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Container = styled.div`
  height: 60px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 1.8rem;
  z-index: 100;
  background-color: white;
  @media (max-width: 320px) {
    height: 5rem;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 320px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 425px) {
    display: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 2rem;
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    color: teal;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  color: black;
  &:hover {
    color: teal;
  }
`;

const Navbar = () => {
  const history = useHistory();
  const { userData, logined, setLogined, productCount } =
    useContext(UserContext);

  const handleLogout = () => {
    setLogined(false);
    if (!logined) {
      cookies.remove("userjwt");
      localStorage.removeItem("userId");
      localStorage.removeItem("isAuthenticated");
      history.push("/login");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
          <Logo to="/">TrendZStation.</Logo>
        </Center>
        <Right>
          {userData.name !== undefined && (
            <MenuItem>
              Hi, <span style={{ color: "teal" }}>{userData.name}</span>
            </MenuItem>
          )}
          <MenuItem>
            <Badge badgeContent={productCount} color="primary">
              <ShoppingBasket />
            </Badge>
          </MenuItem>
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
