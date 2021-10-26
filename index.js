const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  // Get service name input
  const service = core.getInput('service-name');
  const message = core.getInput('message');
  const address = core.getInput('address')
  const time = (new Date()).toTimeString();
  var validUrl = require('valid-url');

  validUrl.isUri(address)
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify({
      service : service,
      message: message,
  })
  console.log(`The event payload: ${payload}`);

  const instance = axios.create({
    baseURL: address,
    timeout: 1000,
    data: payload,
  });  
  axios(instance).then(function(response) {
      console.log(response)
      core.setOutput("id: ", response.data.result.message_id);
  })

} catch (error) {
  core.setFailed(error.message);
}