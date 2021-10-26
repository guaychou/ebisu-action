const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const validUrl = require('valid-url');
try {
  // Get service name input
  const service = core.getInput('service-name');
  const message = core.getInput('message');
  const address = core.getInput('address') + "/api/v1/alertwithmessage";
  validUrl.isUri(address)
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