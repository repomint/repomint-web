import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";
import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

import * as gh from "./../../actions/github";


// TODO: octokit.js
interface userInfoType {
  login: string,
  id: number,
  avatarUrl: string,
  gravatarId: any, // number?
  url: string,
  htmlUrl: string,
  followersUrl: string,
  followingUrl: string,
  gistsUrl: string,
  starredUrl: string
  subscriptionUrl: string,
  organizationsUrl: string,
  reposUrl: string,
  eventsUrl: string,
  receivedEventsUrl: string,
  type: string,
  siteAdmin: boolean,
  name: any, // nullable
  company: any, // nullable
  blog: string,
  location: string,
  email: any, // nullable
  hireable: any // nullable
  bio: string, // data like this is prob nullable in general
  twitterUsername: string,
  publicRepos: number,
  publicGists: number,
  followers: number,
  following: number,
  createdAt: string,
  updatedAt: string,
  privateGists: number,
  totalPrivateRepos: number,
  ownedPrivateRepos: number,
  diskUsage: number,
  collaborators: number,
  twoFactorAuth: boolean,
  plan: object // { name, space, collaborators, privateRepos } could nest another struct
};

const DEFAULT_USER_INFO: userInfoType = {
  login: "",
  id: 0,
  avatarUrl: "",
  gravatarId: null,
  url: "",
  htmlUrl: "",
  followersUrl: "",
  followingUrl: "",
  gistsUrl: "",
  starredUrl: "",
  subscriptionUrl: "",
  organizationsUrl: "",
  reposUrl: "",
  eventsUrl: "",
  receivedEventsUrl: "",
  type: "",
  siteAdmin: false,
  name: null, // nullable
  company: null, // nullable
  blog: "",
  location: "",
  email: null, // nullable
  hireable: null, // nullable
  bio: "", // data like this is prob nullable in general
  twitterUsername: "",
  publicRepos: 0,
  publicGists: 0,
  followers: 0,
  following: 0,
  createdAt: "",
  updatedAt: "",
  privateGists: 0,
  totalPrivateRepos: 0,
  ownedPrivateRepos: 0,
  diskUsage: 0,
  collaborators: 0,
  twoFactorAuth: false,
  plan: {} // { name, space, collaborators, privateRepos } could nest another struct
};


export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  // TODO: don't store token as state
  const [oauthToken, setOAuthToken] = useState<string>("");

  // TODO: octokit.js
  const [userInfo, setUserInfo] = useState<userInfoType>(DEFAULT_USER_INFO);

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

  // TODO: 1. is this the right place for this and 2. is it okay to use two useEffects?
  useEffect(() => {
    async function populateOAuthToken() {
      const code = gh.parseOAuthCode() || null;

      if (code) {
        const token = await gh.getOAuthToken({code: code}) || "";
        setOAuthToken(token);
      }      
    }

    if (oauthToken === "") {
      populateOAuthToken();
    }
  }, [oauthToken, setOAuthToken])

  useEffect(() => {
    async function populateUserInfo() {
      const userInfo = await gh.getUserInfo({token: oauthToken});

      setUserInfo(userInfo);
    }

    if (oauthToken) {
      populateUserInfo();
    }
  }, [userInfo, oauthToken, setUserInfo])
  
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col span={24}>
        <h2>Your balances ({formatUSD.format(totalBalanceInUSD)}):</h2>
        <h2>
          SOL: {SOL.balance} ({formatUSD.format(SOL.balanceInUSD)})
        </h2>
        <h2 style={{ display: "inline-flex", alignItems: "center" }}>
          <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} (
          {formatUSD.format(SRM?.balanceInUSD)})
        </h2>
        <div>{userInfo !== DEFAULT_USER_INFO && JSON.stringify(userInfo)}</div>
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
