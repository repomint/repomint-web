# repomint
----
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
<!-- <img src="assets/NNNNNNNNNNNNN" width="400"> -->
<!-- <h2 align="center">____________________</h2> -->

This project is under development.

Mint generative NFTs for your GitHub releases.

Bootstrapped with [solana-labs/dapp-scaffold](https://github.com/solana-labs/dapp-scaffold).

# Quick start

1. Start [Gatekeeper](https://github.com/cnp0/gatekeeper)
```bash
export OAUTH_CLIENT_ID=...
export OAUTH_CLIENT_SECRET=...
```

2. Add `repomint` .env

```env
REACT_APP_GITHUB_OAUTH_CLIENT_ID=...
REACT_APP_REDIRECT_URI=...
REACT_APP_GATEKEEPER_URL=...
```

# Github Oauth

We use ExpressJS server to get access token, with this setup we would have React and Express on another port default is 4000.
Run both with `yarn start`.
NOTE: you would need to have an Oauth setup on your Github account, not sure if you can use mine.
On your Oauth setup, you need to put callback url as `http://localhost:3000/github/callback`
The flow implemented:
- check if gh_token is set, if yes, show a Logout button, if not, Connect to Github should show
- Connect to Github button would redirect to oauth, and would then return a code as a querystring, we will pass this to our express service and then request for access token in /auth endpoint
- access token will be saved in cookies (we can worry about security later)
- Logout would basically remove the gh_token from cookies and then redirect user to homepage without any code querystring

For docs:
- Github web app flow - https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#parameters
- Github API - https://docs.github.com/en/rest/reference/users

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
