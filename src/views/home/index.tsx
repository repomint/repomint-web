// external deps
import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { Button, Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "src/redux/slices/userSlice";
import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
// internal deps
import { Link } from "react-router-dom";
import * as gh from "../../actions/github";
import { RootState } from "src/redux/store";
import { formatUSD } from "../../utils/utils";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { useMarkets } from "../../contexts/market";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useUserBalance, useUserTotalBalance } from "../../hooks";

export const HomeView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();
  
  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  const getUserInfo = useCallback( async(ghToken: string) => {
    const { data: resData } = await axios.get(`${process.env.REACT_APP_AUTH_API}/user?ghToken=${ghToken}`);
    dispatch(setUserInfo(resData.data.data))
    localStorage.setItem('currentUsername', resData.data.data.login);
  }, [dispatch])

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';

    async function getAccessToken() {
      const code = gh.parseOAuthCode() || null;      

      if (code) {
        const { data } = await axios.get(`${process.env.REACT_APP_AUTH_API}/auth?code=${code}`);
        if (data.success && !isEmpty(data.data.token)) {
          Cookies.set('gh_token', data.data.token);
          getUserInfo(data.data.token);
        } else {
          console.log('reauthenticate on click of connect to github button')
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`
        }
      }
    }

    if (isEmpty(ghToken)) {
      getAccessToken();
    } else {
      getUserInfo(ghToken);
    }
  }, [getUserInfo])

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col span={24} style={{textAlign: 'left', padding: '2rem'}}>
        { userInfo &&
          <>
            {userInfo.login} is connected! <br />
            Public repos: {userInfo.public_repos} <br />
          </>
        }
        <Button ghost type="dashed" onClick={() => history.push("/repos")}>Select a repo</Button>
        <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
        <h2>
          SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})
        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} (
          {formatUSD.format(SRM?.balanceInUSD)})
        </h2>
      </Col>

      <Col span={12}>
        <WalletMultiButton type="ghost" />
      </Col>
      <Col span={12}>
        <Link to="/faucet">
          <Button>Faucet</Button>
        </Link>
      </Col>
      <Col span={24}>
        <div className="builton" />
      </Col>
    </Row>
  );
};
