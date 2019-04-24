import React from "react";
import EditUserContainer from "../containers/EditUserContainer";
import EditCompanyContainer from "../containers/EditCompanyContainer";

function ProfileEdit(props) {
  if (props.role === "user" || props.role === "admin" ) {
    return <EditUserContainer />;
  } else if (props.role === "company") return <EditCompanyContainer />;
}

export default (ProfileEdit);
