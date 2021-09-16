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

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt";
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD } = useUserTotalBalance();

  const [oauthToken, setOAuthToken] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

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
        const oauthToken = await gh.getOAuthToken(code);
        setOAuthToken(oauthToken);
      }      
    }

    if (!oauthToken) {
      populateOAuthToken();
    }
  }, [oauthToken, setOAuthToken])

  useEffect(() => {
    async function populateUserInfo() {
      const userInfo = await gh.getUserInfo(oauthToken);

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
        <div>{userInfo && JSON.stringify(userInfo)}</div>
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
