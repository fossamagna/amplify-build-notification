import type {
  ConstructContainerEntryGenerator,
  ConstructFactoryGetInstanceProps,
  GenerateContainerEntryProps,
  ResourceProvider,
} from "@aws-amplify/plugin-types";
import type { AmplifyBuildNotificationFactoryProps } from "./types";
import { AmplifyBuildNotification } from "amplify-build-notification-construct";

/**
 * Generates a single instance of build notification resources
 */
export class BuildNotificationContainerEntryGenerator
  implements ConstructContainerEntryGenerator<AmplifyBuildNotification>
{
  readonly resourceGroupName: "build-notification";

  constructor(
    private readonly props: AmplifyBuildNotificationFactoryProps,
    private readonly getInstanceProps: ConstructFactoryGetInstanceProps
  ) {}

  generateContainerEntry(
    props: GenerateContainerEntryProps
  ): ResourceProvider<AmplifyBuildNotification> {
    const { scope, backendSecretResolver } = props;
    return {
      resources: new AmplifyBuildNotification(
        scope,
        "AmplifyBuildNotification",
        {
          slackChannelId: backendSecretResolver
            .resolveSecret(this.props.slackChannelId)
            .unsafeUnwrap(),
          slackWorkspaceId: backendSecretResolver
            .resolveSecret(this.props.slackWorkspaceId)
            .unsafeUnwrap(),
          conditions: this.props.conditions,
        }
      ),
    };
  }
}
