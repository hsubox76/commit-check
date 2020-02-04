const core = require("@actions/core");
const github = require("@actions/github");

try {
  if (github.context.eventName === "pull_request") {
    const prTitle =
      github.context.payload &&
      github.context.payload.pull_request &&
      github.context.payload.pull_request.title;
    if (prTitle) {
      console.log(`PR Title: ${prTitle}`); 
      const match = prTitle.match(/^\[(feat|fix)\] (.+)/);
      if (!match) {
        throw Error('Fix PR title syntax');
      } else {
        core.info('Good title!');
      }
    }
  }
} catch (e) {
  core.setFailed(e.message);
}
