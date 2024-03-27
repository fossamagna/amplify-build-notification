# Amplify Backend Build Notification

## Description

This package contains the defineBuildNotification entry point for customers to define build notification in their Amplify backend. This is a layer on top of the build notification construct in amplify-build-notification-construct to initialize the construct in the context of an Amplify backend

## Set up Build Notification

To configure your build notification backend, edit the `amplify/build-notification/resource.ts` file. You can set up build notification to Slack.

`amplify/build-notification/resource.ts`
```ts
import { defineBuildNotification } from "amplify-backend-build-notification";
import { secret } from "@aws-amplify/backend";

/**
 * First, add AWS Chatbot to the Slack workspace.
 * Then, create your secrets using `amplify sandbox secret`
 *  * @see https://docs.aws.amazon.com/chatbot/latest/adminguide/slack-setup.html#slack-client-setup
 * @see https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/features/#s
 */
export const buildNotification = defineBuildNotification({
  slackWorkspaceId: secret("SLACK_WORKSPACE_ID"),
  slackChannelId: secret("SLACK_CHANNEL_ID"),
  /*
  conditions: {
    // When only a specific appId is to be notified.
    appId: "<appId>";
    // When only a specific branchName is to be notified.
    branchName: ",<branchName>";
    // To specify the job status of the notification target
    jobStatus: ["SUCCEED", "FAILED", "STOPPED", "STARTED"];
  }
  */
});

```

Lastly, this `buildNotification` needs to be added to your backend.

`amplify/backend.ts`
```ts
import { defineBackend } from '@aws-amplify/backend';
import { data } from "./data/resource";
import { auth } from "./auth/resource";
import { buildNotification } from "./build-notification/resource"

const backend = defineBackend({
  auth,
  data,
  buildNotification,
});
```
