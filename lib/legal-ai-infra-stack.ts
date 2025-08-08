import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role, ServicePrincipal, ManagedPolicy } from "aws-cdk-lib/aws-iam";

interface LegalAiInfraStackProps extends StackProps {
  prefix: string;
}

export class LegalAiInfraStack extends Stack {
  constructor(scope: Construct, id: string, props: LegalAiInfraStackProps) {
    super(scope, id, props);

    const { prefix } = props;

    // Example: dev-bedrock-role or prod-bedrock-role
    const bedrockRole = new Role(this, `${prefix}-BedrockInvokeRole`, {
      roleName: `${prefix}-bedrock-role`,
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
        ManagedPolicy.fromAwsManagedPolicyName("AmazonBedrockFullAccess"),
      ],
    });
  }
}
