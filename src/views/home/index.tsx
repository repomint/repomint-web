import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as gh from "../../actions/github";
import { formatUSD } from "../../utils/utils";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import Repository from "src/components/Repository";
import { useMarkets } from "../../contexts/market";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { UserInfoType, UserReposType } from "src/types/octokit";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [userRepos, setUserRepos] = useState<UserReposType[] | null>(null);

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

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';

    async function getAccessToken() {
      const code = gh.parseOAuthCode() || null;

      if (code) {
        const { data } = await axios.get(
          `http://localhost:4000/auth?code=${code}`
        );
        if (data.success && !isEmpty(data.data.token)) {
          Cookies.set("gh_token", data.data.token);
        } else {
          console.log("reauthenticate on click of connect to github button");
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`;
        }
      }
    }

    if (isEmpty(ghToken)) {
      getAccessToken();
    } else {
      getUserInfo(ghToken);
    }
  }, [])

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';

    async function getUserRepos() {
      const { data } = await axios.get(`http://localhost:4000/repos/user?ghToken=${ghToken}&username=${userInfo?.login}`);
      setUserRepos(data.data.data);
    }

    if (userInfo?.login) {
      getUserRepos();
    }
  }, [userInfo]);

  const getUserInfo = async (ghToken: string) => {
    const { data } = await axios.get(`http://localhost:4000/user?ghToken=${ghToken}`);
    setUserInfo(data.data.data);
  }

  return (
      <div>
        <div className="bg-gray-200 overflow-hidden rounded-lg h-52 mb-8">
          <div className="px-4 py-5 sm:p-6">Home Hero section</div>
        </div>

        <div>
          Home page items
        </div>
      </div>
    // <Row gutter={[16, 16]} align="middle">
    //   <Col span={24}>
    //     {userInfo && (
    //       <>
    //         {userInfo.login} is connected! <br />
    //         Public repos: {userInfo.public_repos} <br />
    //       </>
    //     )}
    //     <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
    //     <h2>
    //       SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})
    //     </h2>
    //     <h2 style={{ display: "inline-flex", alignItems: "center" }}>
    //       <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} (
    //       {formatUSD.format(SRM?.balanceInUSD)})
    //     </h2>
    //   </Col>
    //
    //   <Col span={12}>
    //     <WalletMultiButton type="ghost" />
    //   </Col>
    //   <Col span={12}>
    //     <Link to="/faucet">
    //       <Button>Faucet</Button>
    //     </Link>
    //   </Col>
    //   <Col span={24}>
    //     <div className="builton" />
    //   </Col>
    // </Row>
  );
};
