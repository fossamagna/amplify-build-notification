import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AmplifyBuildNotification from '../lib/index';

test('EventBridgeRule Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  // WHEN
  new AmplifyBuildNotification.AmplifyBuildNotification(stack, 'MyTestConstruct', {
    slackChannelId: "TESTCHANNELID",
    slackWorkspaceId: "TESTWORKSPACEID",
  });
  // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Events::Rule', {
    Description: "Rule for Amplify Build Notifications",
    State: "ENABLED",
  });
});
