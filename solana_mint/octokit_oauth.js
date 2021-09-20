const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
require('dotenv').config();

const octokitUserAuth = async ({ code }) => {
  const octokit = new Octokit({
    authStrategy: createOAuthUserAuth,
    auth: {
      clientId: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET,
      code
    },
  });

  // Exchanges the code for the user access token authentication on first request
  // and caches the authentication for successive requests
  const { status, data } = await octokit.request("GET /user");

  if (status === 200) {
    return {
      success: true,
      message: `${data.login} is authenticated`,
      data
    }
  } else {
    return {
      success: false,
      message: `Something went wrong. User is not authenticated`,
      data: null
    }
  }
}

module.exports = octokitUserAuth;