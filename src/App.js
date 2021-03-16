import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from "./components/Inventory/Inventory";
import LogIn from "./components/LogIn/LogIn";
import NotFound from "./components/NotFound/NotFound";
import PracticeCom from "./components/PractceCom/PracticeCom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
import Shop from './components/Shop/Shop';

export const userContext = createContext()
function App() {
  const [logInUser, setLogInUser] = useState({})
  return (
    <userContext.Provider value={[logInUser, setLogInUser]}>
      <h1>email : {logInUser.email}</h1>
  
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment/>
          </PrivateRoute>
          <Route path="/login">
            <LogIn/>
          </Route>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

    </userContext.Provider>
  );
}

export default App;
