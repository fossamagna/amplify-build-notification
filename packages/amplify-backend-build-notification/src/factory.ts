import * as path from "node:path";
import type {
  ConstructContainerEntryGenerator,
  ConstructFactory,
  ConstructFactoryGetInstanceProps,
  ResourceProvider,
} from "@aws-amplify/plugin-types";
import { AmplifyBuildNotification } from "amplify-build-notification-construct";
import { BuildNotificationContainerEntryGenerator } from "./build-notification-container-entry-generator";
import type { AmplifyBuildNotificationFactoryProps } from "./types";

export class AmplifyBuildNotificationFactory
  implements ConstructFactory<ResourceProvider<AmplifyBuildNotification>>
{
  private generator: ConstructContainerEntryGenerator;

  constructor(
    private readonly props: AmplifyBuildNotificationFactoryProps,
    private readonly importStack = new Error().stack
  ) {}

  getInstance(
    getInstanceProps: ConstructFactoryGetInstanceProps
  ): ResourceProvider<AmplifyBuildNotification> {
    const { constructContainer, importPathVerifier } = getInstanceProps;
    importPathVerifier?.verify(
      this.importStack,
      path.join("amplify", "build-notification", "resource"),
      "Amplify Build Notification must be defined in amplify/build-notification/resource.ts"
    );
    if (!this.generator) {
      this.generator = new BuildNotificationContainerEntryGenerator(
        this.props,
        getInstanceProps
      );
    }
    return constructContainer.getOrCompute(
      this.generator
    ) as ResourceProvider<AmplifyBuildNotification>;
  }
}

export const defineBuildNotification = (
  props: AmplifyBuildNotificationFactoryProps
): ConstructFactory<ResourceProvider<AmplifyBuildNotification>> =>
  new AmplifyBuildNotificationFactory(props, new Error().stack);
