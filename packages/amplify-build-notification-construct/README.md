# Amplify Build Notification Construct

This package vends an L3 CDK Construct that enables notifications to Slack for ther build result from AWS Amplify Console.

## Examples

### Enables build notifications for all Amplify apps with default settings

In this example, you will create a stack that notifies all Amplify app jobs.

```ts
import { App, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AmplifyBuildNotification } from "amplify-build-notification-construct";

const app = new App();
const stack = new Stack(app, 'AmplifyBuildNotificationStack');

new AmplifyBuildNotification(
  stack,
  "AmplifyBuildNotification",
  {
    slackWorkspaceId: "TXXXXXXX", // Slack Workspace's ID
    slackChannelId: "CXXXXXXX", // Slack Channel ID
  }
);
```

### Enable build notifications for the specified Amplify app with default settings.

In this example, you will create a stack that notifies jobs for a specified app and branch.

```ts
import { App, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AmplifyBuildNotification } from "amplify-build-notification-construct";

const app = new App();
const stack = new Stack(app, 'AmplifyBuildNotificationStack');

new AmplifyBuildNotification(
  stack,
  "AmplifyBuildNotification",
  {
    slackWorkspaceId: "TXXXXXXX",
    slackChannelId: "CXXXXXXX",
    conditions: {
      appId: "<Amplify app's ID>",
      branchName: "main"
    }
  }
);
```

### Enable build notifications for the specified Amplify app with default settings.

In this example, you will create a stack that only notifies jobs with a `FAILED` status.

```ts
import { App, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AmplifyBuildNotification } from "amplify-build-notification-construct";

const app = new App();
const stack = new Stack(app, 'AmplifyBuildNotificationStack');

new AmplifyBuildNotification(
  stack,
  "AmplifyBuildNotification",
  {
    slackWorkspaceId: "TXXXXXXX",
    slackChannelId: "CXXXXXXX",
    conditions: {
      jobStatus: ["FAILED"]
    }
  }
);
```
