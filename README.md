# repomint
----
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
<!-- <img src="assets/NNNNNNNNNNNNN" width="400"> -->
<!-- <h2 align="center">____________________</h2> -->

This project is under development.

Mint generative NFTs for your GitHub releases.

Bootstrapped with [solana-labs/dapp-scaffold](https://github.com/solana-labs/dapp-scaffold).

## Getting started

Add react app environment variables for client configured Github OAuth features.
```bash
export REACT_APP_GITHUB_OAUTH_CLIENT_ID=...
export REACT_APP_GITHUB_OAUTH_CLIENT_SECRET=...
```

Then `yarn` to set up. `yarn start` to launch :rocket:.

# How it works

1. React app `repomint-web` for the dapp frontend
2. ExpressJS server [`repomint-auth`](https://github.com/repomint/repomint-auth) for GitHub OAuth management
3. Flask app [`repomint-art`](https://github.com/repomint/repomint-art) for generative art service
4. Flask prototype [`repomint-mint`](https://github.com/repomint/repomint-auth) to manage minting

# Summary

### -  *[Contributors](#Contributors)*
### -  *[License](#License)*

-----------------
# Contributors

[![](https://contrib.rocks/image?repo=cnp0/repomint)](https://github.com/cnp0/repomint/graphs/contributors)

##### Made with [contributors-img](https://contrib.rocks).

-----------------
# License
#### Apache 2.0 © cnp0
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
```bash
by oran collins
github.com/cnp0
oranbusiness@gmail.com
______________________
```
