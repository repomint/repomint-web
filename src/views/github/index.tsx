import React, { useState } from "react";
import { Button } from "antd";


// TODO: use state for request validation + remove logic from view
export const GithubOAuthView = () => {
  const [message, setMessage] = useState("");
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const token_auth_url = `http://localhost:9999/authenticate/${params.get("code")}`;

  const callApi = async () => {
    try {
      const response = await fetch(token_auth_url);
      const responseData = await response.json();

      setMessage(responseData.token.substr(0, 3) + "...");
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


