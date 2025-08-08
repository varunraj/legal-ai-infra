import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role, ServicePrincipal, ManagedPolicy } from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { RemovalPolicy, Duration } from "aws-cdk-lib";

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

    // S3 Bucket for legal document storage
    const legalDocumentsBucket = new s3.Bucket(
      this,
      `${prefix}-LegalDocumentsBucket`,
      {
        bucketName: `${prefix}-legal-documents-${this.account}`,
        versioned: true,
        encryption: s3.BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy:
          props.prefix === "prod"
            ? RemovalPolicy.RETAIN
            : RemovalPolicy.DESTROY,
      }
    );

    // Add lifecycle rules for cost optimization
    legalDocumentsBucket.addLifecycleRule({
      id: "TransitionToIA",
      enabled: true,
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: Duration.days(30),
        },
        {
          storageClass: s3.StorageClass.GLACIER,
          transitionAfter: Duration.days(90),
        },
      ],
    });
  }
}
