const cors = require('cors');
const express = require('express');
const { isEmpty } = require('lodash');
const githubOAuth = require('./github_oauth');

const app = express();
app.use(cors());

app.get('/auth', async function (req, res) {
  const code = req.query.code;

  if (!isEmpty(code)) {
    try {
      const authRes = await githubOAuth({ code });
      console.log('authRes', authRes)
      res.json(authRes);
    } catch (err) {
      console.error(`Something went wrong on auth: ${err}`);
      res.json({
        success: false,
        message: 'Something went wrong',
        data: null
      })
    }
  } else {
    res.json({
      success: false,
      message: 'You should pass a code here.',
      data: null
    })
  }
})

app.get('/repos', async function (req, res) {

})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));