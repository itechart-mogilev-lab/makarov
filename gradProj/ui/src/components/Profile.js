import React from "react";
import ProfileUserContainer from "../containers/ProfileUserContainer";
import ProfileCompanyContainer from "../containers/ProfileCompanyContainer";

function Profile(props) {
  if (props.role === 'user' || props.role === 'admin') {
  return <ProfileUserContainer />
  } else if (props.role === 'company' )
  return <ProfileCompanyContainer />
}


export default (Profile)