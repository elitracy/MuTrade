import LandingPage from "./LandingPage.jsx";
import Signup from "./Signup.jsx";
import ForgotPassword from "./forgotPassword.jsx";
import WalletHome from "./WalletHome.jsx";
import SimulationHome from "./SimulationHome.jsx";
import MainNav from "./MainNav.jsx";
import CoinGraph from "./CoinGraph.jsx";
import "../css/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../auth/protected-route.js";
import React from "react";
import Auth0Spinner from "./Auth0Spinner.jsx";
import Loading from "./loading.jsx";
import { getCoinList } from "../coinAPI/nomicsCoinData";

var coinList = [];
getCoinList().then((response) => {
  for (var i = 0; i < response.length; i++) {
    coinList.push({
      label: response[i].id,
      value: response[i].price,
    });
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.setNavMode = this.setNavMode.bind(this);
    this.state = {
      navMode: false,
    };
  }

  setNavMode = () => {
    this.setState({ navMode: !this.state.navMode });
  };

  render() {
    return (
      <Router>
        <div>
          {/* A <Switch> looks through its children <Routes> and
               renders the first one that matches the current URL. */}
          <Switch>
            <ProtectedRoute path="/signup">
              <Signup />
            </ProtectedRoute>
            <ProtectedRoute path="/forgotPassword">
              <ForgotPassword />
            </ProtectedRoute>

            <ProtectedRoute path="/WalletHome">
              <MainNav
                toggleNavMode={this.setNavMode}
                navMode={this.state.navMode}
              />

              {!this.state.navMode ? (
                <WalletHome coinList={coinList} />
              ) : (
                <SimulationHome coinList={coinList} />
              )}
            </ProtectedRoute>
            <ProtectedRoute path="/MainNav">
              <MainNav />
            </ProtectedRoute>
            <ProtectedRoute path="/CoinGraph">
              <div className="hehe" class="h-screen w-screen bg-blue-800">
                <CoinGraph />
              </div>
            </ProtectedRoute>
            <Route path="/">
              <LandingPage />
            </Route>
            <Route path="/spinner">
              <Loading />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
