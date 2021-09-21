import React from "react";
import "./../../App.less";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { WalletModalProvider } from "@solana/wallet-adapter-ant-design";

import { LABELS } from "../../constants";
import { AppBar } from "../AppBar";
import * as Styles from "./styled";

const { Header } = Layout;

export const AppLayout = React.memo(({ children }) => {
  return (
    <WalletModalProvider>
      <div className="App wormhole-bg">
        <Layout title={LABELS.APP_TITLE}>
          <Header className="App-Bar">
            <Link to="/">
              <div className="app-title">
                <h2>{LABELS.APP_TITLE}</h2>
              </div>
            </Link>
            {/* @TODO we'll leave the appbar for now, will intro the searchbar later */}
            <AppBar />
          </Header>
          <Styles.Main>
            <Styles.MainContent>{children}</Styles.MainContent>
          </Styles.Main>
        </Layout>
      </div>
    </WalletModalProvider>
  );
});
