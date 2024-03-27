import type { BackendSecret } from "@aws-amplify/plugin-types";
import type { AmplifyBuildNotificationConditions } from "amplify-build-notification-construct";

export type AmplifyBuildNotificationFactoryProps = {
  slackChannelId: BackendSecret;
  slackWorkspaceId: BackendSecret;
  conditions?: AmplifyBuildNotificationConditions;
};
