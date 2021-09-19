const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
require('dotenv').config();

const octokitUserAuth = async ({ code }) => {
  const octokit = new Octokit({
    authStrategy: createOAuthUserAuth,
    auth: {
      clientId: process.env.OCTOKIT_GITHUB_OAUTH_CLIENT_ID || '86d9bf07b52f6d3456c1',
      clientSecret: process.env.OCTOKIT_GITHUB_OAUTH_CLIENT_SECRET || '3ad24131c33c2ee41c3f39f4907eae7d19270792',
      code: code,
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