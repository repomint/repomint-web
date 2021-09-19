const cors = require('cors');
const express = require('express');
const { isEmpty } = require('lodash');
const octokitUserAuth = require('./octokit_oauth');

const app = express();
app.use(cors());

app.get('/auth', async function (req, res) {
  const code = req.query.code;

  if (!isEmpty(code)) {
    try {
      const authRes = await octokitUserAuth({ code });
      res.json(authRes);
    } catch (err) {
      console.error(`Something went wrong on auth: ${err}`);
    }
  } else {
    res.json({
      success: false,
      message: 'You should pass a code here.',
      data: null
    })
  }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));