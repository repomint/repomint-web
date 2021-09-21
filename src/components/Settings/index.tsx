
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ENDPOINTS, useConnectionConfig } from "../../contexts/connection";
import { useWallet } from "@solana/wallet-adapter-react";


export const Settings = () => {
  const { connected, disconnect } = useWallet();
  const { endpoint, setEndpoint } = useConnectionConfig();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const ghToken = Cookies.get('gh_token');

    if (!isEmpty(ghToken)) {
      setIsLoggedIn(true);
    }
  }, [])

  const logout = () => {
    Cookies.remove('gh_token')
    window.location.href = '/'
  }

  return (
    <>
      <div style={{ display: "grid" }}>
        {
          isLoggedIn ?
            <>
              Github Connected <br />
              <Button type="primary" onClick={logout}>
                Logout
              </Button>
            </>
            :
            <Button type="primary" href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`}>
              Connect to GitHub
            </Button>
        }
        <hr />

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
