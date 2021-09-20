const { Octokit } = require("@octokit/core");

const userController = {
  async info (req, res) {
    const ghToken = req.query.ghToken;
    const octokit = new Octokit({ auth: ghToken });

    try {
      const userInfo = await octokit.request('GET /user');
      res.json({
        success: true,
        message: `User info received`,
        data: userInfo
      })
    } catch (err) {
      res.json({
        success: false,
        message: `Getting user info error: ${err.message}`,
        data: null
      })
    }
  }
};

module.exports = userController;