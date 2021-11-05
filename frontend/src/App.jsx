import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./context/UserContext";

// pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

const App = () => {
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const [logined, setLogined] = useState(true);
  const [productCount,setProductCount] = useState(0);

  return (
    <UserContext.Provider
      value={{
        products,
        setProducts,
        logined,
        setLogined,
        userData,
        setUserData,
        productCount,
        setProductCount,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/add-product">
            <AddProduct />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
