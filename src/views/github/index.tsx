import React from "react";
import { Redirect } from "react-router-dom";

import { parseOAuthCode } from "./../../actions";

// TODO: use state for verification + dont redirect
export const OAuthCallbackView = () => {
  const code = parseOAuthCode() || "";

  return <Redirect to={`/?code=${code}`} />;
};
