import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { AppLayout } from "./components/Layout";

import { FaucetView, HomeView, OAuthCallbackView } from "./views";
import { theme } from "src/styles/theme";
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import {Layout} from "antd";
import MainLayout from "./components/shared/MainLayout";

export function Routes() {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: {
          // TODO: Get your own tor.us wallet client Id
          clientId:
            "BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
        },
      }),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );

  return (
      <BrowserRouter>
          <MainLayout>
              <ConnectionProvider>
                  <WalletProvider wallets={wallets} autoConnect>
                      <AccountsProvider>
                          <MarketProvider>
                            <Route exact path="/" component={HomeView} />
                          </MarketProvider>
                      </AccountsProvider>
                  </WalletProvider>
              </ConnectionProvider>
          </MainLayout>
      </BrowserRouter>
    // <BrowserRouter basename={"/"}>
    //   <ConnectionProvider>
    //     <WalletProvider wallets={wallets} autoConnect>
    //       <AccountsProvider>
    //         <MarketProvider>
    //           <ThemeProvider theme={theme}>
    //             <AppLayout>
    //               <Switch>
    //                 <Route exact path="/" component={() => <HomeView />} />
    //                 <Route exact path="/faucet" children={<FaucetView />} />
    //                 <Route
    //                   exact
    //                   path="/github/callback"
    //                   children={<OAuthCallbackView />}
    //                 />
    //               </Switch>
    //             </AppLayout>
    //           </ThemeProvider>
    //         </MarketProvider>
    //       </AccountsProvider>
    //     </WalletProvider>
    //   </ConnectionProvider>
    // </BrowserRouter>
  );
}
