import React from "react";
import { Button, Select } from "antd";
import { ENDPOINTS, useConnectionConfig } from "../../contexts/connection";
import { useWallet } from "@solana/wallet-adapter-react";


// TODO: ~~.env~~ and action/context usage, onClick, etc.
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const client_id = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user&redirect_uri=${redirect_uri}`;


export const Settings = () => {
  const { connected, disconnect } = useWallet();
  // const { authenticated, logout } = useOAuth();
  const { endpoint, setEndpoint } = useConnectionConfig();

  return (
    <>
      <div style={{ display: "grid" }}>
        <Button type="primary" href={githubOAuthURL}>
          Login With GitHub
        </Button>
        <hr/>

        Network:{" "}
        <Select
          onSelect={setEndpoint}
          value={endpoint}
          style={{ marginBottom: 20 }}
        >
          {ENDPOINTS.map(({ name, endpoint }) => (
            <Select.Option value={endpoint} key={endpoint}>
              {name}
            </Select.Option>
          ))}
        </Select>
        {connected && (
          <Button type="primary" onClick={disconnect}>
            Disconnect
          </Button>
        )}
      </div>
    </>
  );
};
