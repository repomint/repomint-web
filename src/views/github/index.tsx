import React from "react";
// import { Redirect } from "react-router-dom";

export const GithubOAuthView = () => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  
  return (
    <div>{params}</div>
  );
};
