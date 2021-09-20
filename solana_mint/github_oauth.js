const axios = require('axios');
require('dotenv').config();

const githubOAuth = async ({ code }) => {
  const body = {
    client_id: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID,
    client_secret: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET,
    code
  };
  const opts = { headers: { accept: 'application/json' } };

  try {
    const data = await axios.post(`https://github.com/login/oauth/access_token`, body, opts)
    return {
      success: true,
      message: `Token received`,
      data: {
        token: data.data.access_token
      }
    }
  } catch (err) {
    return {
      success: false,
      message: `Getting token error: ${err.message}`,
      data: null
    }
  }
}

module.exports = githubOAuth;