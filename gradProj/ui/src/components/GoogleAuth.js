import React from "react";
import { GoogleLogin } from "react-google-login";
import keys from "../keys"

export default function({ authSocial, returnErrors }) {
  const onFailure = error => {
    returnErrors(error);
  };

  return (
    <div className="googleButton">
      <GoogleLogin
        clientId={
          keys.google.clientID
        }
        onSuccess={response => authSocial(response)}
        buttonText="Sign in with Google"
        onFailure={onFailure}
      />
    </div>
  );
}