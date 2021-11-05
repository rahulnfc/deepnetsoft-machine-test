import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";
import ProductTable from "../components/ProductTable";
import Navbar from "../components/Navbar";
const cookies = new Cookies();
const server = "http://localhost:3001";

const Home = () => {
  const { setUserData,setProductCount, setProducts } = useContext(UserContext);
  const token = cookies.get("userjwt");
  const userId = localStorage.getItem("userId");
  const history = useHistory();

  useEffect(() => {
    // check token is available
    if (!token) {
      history.push("/login");
    } else {
      // send browser cookies to the backend using the axios
      axios
        .get(`${server}/api/user/`, {
          headers: { Authorization: `Bearer ${token} ${userId}` },
        })
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          cookies.remove("userjwt");
          localStorage.removeItem("userId");
          localStorage.removeItem("isAuthenticated");
          history.push("/login");
        });

      // get products added by the user
      axios
        .get(`${server}/api/products/${userId}`)
        .then((res) => {
          setProductCount(res.data.length);
          setProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, token, history, setUserData, setProductCount, setProducts]);
  return (
    <div>
      <Navbar />
      <ProductTable />
    </div>
  );
};

export default Home;
