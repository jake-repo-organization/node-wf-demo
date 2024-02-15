console.log("Repository Name: " + process.env.GITHUB_REPOSITORY);
console.log("Repository Owner: " + process.env.GITHUB_ACTOR);
console.log("Repository URL: " + process.env.GITHUB_SERVER_URL + "/" + process.env.GITHUB_REPOSITORY);
console.log("Repository ID: " + process.env.GITHUB_REPOSITORY_ID);
console.log("Branch Name: " + process.env.GITHUB_REF);
console.log("Commit SHA: " + process.env.GITHUB_SHA);
console.log("Event Triggered By: " + process.env.GITHUB_EVENT_NAME);
console.log("Event Payload File: " + process.env.GITHUB_EVENT_PATH);
console.log("-------------------------------------")
console.log("NOW FOR ALL THE MARBLES")
console.log("-------------------------------------")
console.log(JSON.stringify(process.env, null, 2));
