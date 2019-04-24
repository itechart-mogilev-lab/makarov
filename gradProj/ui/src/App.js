import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import WithLayout from "./components/Layout";
import Main from "./components/Main";
import CompanySignInContainer from "./containers/CompanySignInContainer";
import UserSignUpContainer from "./containers/UserSignUpContainer";
import CompanySignUpContainer from "./containers/CompanySignUpContainer";
import PrivateRoute from "./components/PrivateRoute";
import { connect } from "react-redux";
import UserSignInContainer from "./containers/UserSignInContainer";
import ProfileContainer from "./containers/ProfileContainer";
import CompanyPageContainer from "./containers/CompanyPageContainer";
import OrderFormContainer from "./containers/OrderFormContainer";
import OrdersHistoryContainer from "./containers/OrderHistoryContainer";
import UsersListingPageContainer from "./containers/UsersListingPageContainer";
import ErrorHandlerContainer from "./containers/ErrorHandlerContainer";
import EventHandlerContainer from "./containers/EventHandlerContainer";
import NonMainCompanies from "./components/NonMainCompanies";

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        <ErrorHandlerContainer />
        <EventHandlerContainer />
        <Switch>
          <Route
            path="/companies/:id"
            component={WithLayout(CompanyPageContainer)}
          />
          <Route path="/signin" component={WithLayout(UserSignInContainer)} />
          <Route path="/signup" component={WithLayout(UserSignUpContainer)} />
          <Route
            exact
            path="/order"
            isAuthenticated={isAuthenticated}
            component={WithLayout(OrderFormContainer)}
          />
          <PrivateRoute
            exact
            path="/orders-history"
            isAuthenticated={isAuthenticated}
            component={WithLayout(OrdersHistoryContainer)}
          />
          <Route
            path="/signup-executor"
            component={WithLayout(CompanySignUpContainer)}
          />
          <Route
            path="/signin-executor"
            component={WithLayout(CompanySignInContainer)}
          />
          <Route
            exact
            path="/companies"
            component={WithLayout(NonMainCompanies)}
          />
          <Route
            exact
            path="/users"
            component={WithLayout(UsersListingPageContainer)}
          />
          <PrivateRoute
            exact
            path="/profile"
            isAuthenticated={isAuthenticated}
            component={WithLayout(ProfileContainer)}
          />
          <Route path="/" component={WithLayout(Main)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.profileReducer.isAuthenticated
});

export default connect(mapStateToProps)(App);
