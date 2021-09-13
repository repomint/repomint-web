import React, { useState } from "react";
import { Button } from "antd";


const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
const client_secret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;


// TODO: use state for request validation + remove logic from view
export const GithubOAuthView = () => {
  const [message, setMessage] = useState("");
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const token_auth_url = `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${params.get("code")}`;

  const callApi = async () => {
    try {
      const response = await fetch(token_auth_url, {mode: "cors", method: "post"});

      // failing to parse as json but auth token is in network response (Faith ftw)
      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <Button onClick={callApi}>
        Finalize Authentication
      </Button>
      {message && (<code className="col-12 text-light bg-dark p-4"> Using {token_auth_url} Result: {message}</code>)}
    </div>
  );
};


