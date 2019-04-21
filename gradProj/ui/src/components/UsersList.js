import React from "react";
import UserCardContainer from "../containers/UserCardContainer";

const CustomersList = ({ users }) => {
  if (!users['0']) {
    return <p>Customers is not found</p>;
  } else {
    return users.map(user => (
      <UserCardContainer user={user} id={user._id} key={user._id} />
    ));
  }
};

export default CustomersList;