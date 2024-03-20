import { Construct } from "constructs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as sns from "aws-cdk-lib/aws-sns";
import * as chatbot from "aws-cdk-lib/aws-chatbot";

export type JobStatus = "SUCCEED" | "FAILED" | "STOPPED" | "STARTED";

export interface AmplifyBuildNotificationProps {
  slackWorkspaceId: string;
  slackChannelId: string;
  conditions?: AmplifyBuildNotificationConditions;
}

export interface AmplifyBuildNotificationConditions {
  appId?: string;
  branchName?: string;
  jobStatus?: JobStatus[];
}

export class AmplifyBuildNotification extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: AmplifyBuildNotificationProps
  ) {
    super(scope, id);

    const topic = new sns.Topic(this, "AmplifyBuildNotificationTopic", {
      displayName: "Amplify Build Notification",
    });

    new chatbot.SlackChannelConfiguration(
      this,
      "AmplifyBuildNotificationSlackChannel",
      {
        slackChannelConfigurationName: "AmplifyBuildNotificationSlackChannel",
        slackWorkspaceId: props.slackWorkspaceId,
        slackChannelId: props.slackChannelId,
        notificationTopics: [topic],
      }
    );

    const region = events.EventField.region;
    const appId = events.EventField.fromPath("$.detail.appId");
    const branchName = events.EventField.fromPath("$.detail.branchName");
    const jobId = events.EventField.fromPath("$.detail.jobId");
    const jobStatus = events.EventField.fromPath("$.detail.jobStatus");
    const appUrl = `https://console.aws.amazon.com/amplify/home?region=${region}#${appId}/${branchName}/${jobId}`;

    const conditions: AmplifyBuildNotificationConditions = Object.assign(
      {
        jobStatus: ["SUCCEED", "FAILED", "STOPPED", "STARTED"],
      },
      props.conditions
    );

    const rule = new events.Rule(this, "AmplifyBuildNotificationRule", {
      description: "Rule for Amplify Build Notifications",
      eventPattern: {
        source: ["aws.amplify"],
        detailType: ["Amplify Deployment Status Change"],
        detail: conditions,
      },
      targets: [
        new targets.SnsTopic(topic, {
          message: events.RuleTargetInput.fromObject({
            version: "1.0",
            source: "custom",
            content: {
              textType: "client-markdown",
              title: "Amplify Build Notification",
              description: "Amplify Build Notification",
              nextSteps: [
                `AWS Amplify Console Build <${appUrl}|#${jobId}>`,
                `Status: *${jobStatus}*`,
                `<${appUrl}|Open your App (${branchName})>`,
              ],
            },
          }),
        }),
      ],
    });
  }
}
