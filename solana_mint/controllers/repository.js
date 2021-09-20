const { Octokit } = require("@octokit/core");

const repositoryController = {
  async user (req, res) {
    const ghToken = req.query.ghToken;
    const username = req.query.username;
    const octokit = new Octokit({ auth: ghToken });

    try {
      const userRepos = await octokit.request(`GET /users/${username}/repos`, {
        username
      })
      res.json({
        success: true,
        message: `User repos received`,
        data: userRepos
      })
    } catch (err) {
      res.json({
        success: false,
        message: `Getting user repos error: ${err.message}`,
        data: null
      })
    }
  },
  async langs (req, res) {
    const ghToken = req.query.ghToken;
    const username = req.query.username;
    const repo = req.query.repo;
    const octokit = new Octokit({ auth: ghToken });

    try {
      const userRepoLangs = await octokit.request(`GET /repos/${username}/${repo}/languages`, {
        owner: username,
        repo
      })
      res.json({
        success: true,
        message: `Repo languages received`,
        data: userRepoLangs
      })
    } catch (err) {
      res.json({
        success: false,
        message: `Getting repo languages error: ${err.message}`,
        data: null
      })
    }
  }
};

module.exports = repositoryController;