var express = require('express');
var router = express.Router();
let axios = require('axios')

/* Create token */
router.post('/createToken',  async function(req, res, next) {
  try {
   let tokenResponse = await axios.post('https://extole-api.extole.io/api/v5/token', {email: req.body.email}, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    access_token = tokenResponse.data.access_token
    res.json(tokenResponse.data)
  } catch (err) {
    console.error(err)
  }
});

/* Update Profile */
router.post('/updateProfile',  async function(req, res, next) {
  try {
    let profileResponse = await axios.post(`https://extole-api.extole.io/api/v4/me?access_token=${req.body.access_token}`, {email: req.body.email}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    res.json(profileResponse.data)
  } catch (err) {
    console.error(err)
  }
});

/* Create Share Link */
router.post('/createShare',  async function(req, res, next) {
  try {
    let shareResponse = await axios.post(`https://extole-api.extole.io/api/v6/me/shareables`, {label:'refer-a-friend'}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${req.body.access_token}`
      }
    })
    res.json(shareResponse.data)
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;
