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
  var address = address + "/api/v1/alertwithmessage"
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify({
      service : service,
      message: message,
  })
  console.log(`The event payload: ${payload}`);

  axios.post(address, payload, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  })
    .then(function(response) {
      console.log(response)
      core.setOutput("id: ", response.data.result.message_id);
    })
    .catch(function(error) {
      core.setFailed(error)
    })
} catch (error) {
  core.setFailed(error.message);
}