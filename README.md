# Legal AI Infrastructure

A CDK-based infrastructure project for deploying AWS resources to support Precedent AI.

## 🚀 Quick Start for New Team Members

### Prerequisites

1. **Node.js 18+** installed
2. **AWS CLI** configured with appropriate credentials
3. **GitHub access** to this repository

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd legal-ai-infra
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure AWS credentials**

   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret Access Key, and region (us-east-1)
   ```

4. **Test local synthesis**
   ```bash
   npx cdk synth
   ```

### Deployment Environments

#### Development Environment

- **Auto-deployment**: Every push to `main` branch
- **Stack name**: `dev-legal-ai-infra-stack`
- **Region**: `us-east-1`
- **Prefix**: `dev`

#### Production Environment

- **Manual deployment**: Triggered via GitHub Actions
- **Stack name**: `prod-legal-ai-infra-stack`
- **Region**: `us-east-1`
- **Prefix**: `prod`

## 🔄 Deployment Process

### For Development (Automatic)

1. Make your changes
2. Commit and push to `main`:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions automatically deploys to dev environment

### For Production (Manual)

1. Test thoroughly in dev environment
2. Go to GitHub → Actions → "Deploy to Production"
3. Click "Run workflow"
4. Type `DEPLOY` in the confirmation field
5. Click "Run workflow"

## 🛠️ Local Commands

### CDK Commands

```bash
# Synthesize CloudFormation template
npx cdk synth

# Deploy to dev locally
npx cdk deploy dev-legal-ai-infra-stack

# Deploy to prod locally
npx cdk deploy prod-legal-ai-infra-stack

# Show differences
npx cdk diff dev-legal-ai-infra-stack

# Destroy stack (be careful!)
npx cdk destroy dev-legal-ai-infra-stack
```

### Environment Context

```bash
# Deploy with specific stage
npx cdk deploy --context stage=dev
npx cdk deploy --context stage=prod
```

## 📁 Project Structure

```
legal-ai-infra/
├── .github/workflows/
│   ├── deploy-dev.yml     # Auto-deploys to dev
│   └── deploy-prod.yml    # Manual prod deployment
├── bin/
│   └── app.ts             # CDK app entry point
├── lib/
│   └── legal-ai-infra-stack.ts  # Main stack definition
├── cdk.json               # CDK configuration
└── package.json           # Dependencies
```

## 🐛 Troubleshooting

### Common Issues

1. **CDK Bootstrap Required**

   ```bash
   npx cdk bootstrap
   ```

2. **AWS Credentials Not Configured**

   ```bash
   aws configure
   ```

3. **GitHub Secrets Missing**

   - Go to repository Settings → Secrets and variables → Actions
   - Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

4. **Permission Denied**
   - Ensure your AWS user has the required permissions
   - Check that the IAM policies are correctly attached

### Debug Commands

```bash
# Check AWS identity
aws sts get-caller-identity

# List CDK stacks
npx cdk list

# Validate CloudFormation template
npx cdk synth --quiet | aws cloudformation validate-template --template-body file:///dev/stdin
```

## 📝 Adding New Resources

To add new AWS resources:

1. **Update the stack** in `lib/legal-ai-infra-stack.ts`
2. **Test locally**: `npx cdk synth`
3. **Deploy to dev**: Push to `main` (auto-deploys)
4. **Deploy to prod**: Manual trigger when ready

### Example: Adding a Lambda Function

```typescript
// In lib/legal-ai-infra-stack.ts
import * as lambda from "aws-cdk-lib/aws-lambda";

const myFunction = new lambda.Function(this, "MyFunction", {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: "index.handler",
  code: lambda.Code.fromAsset("lambda"),
  role: bedrockRole, // Use the existing Bedrock role
});
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally with `npx cdk synth`
4. Push to `main` for auto-deployment to dev
5. Test in dev environment
6. Deploy to prod when ready

## 📞 Support

For questions or issues:

1. Check the troubleshooting section above
2. Review AWS CloudFormation console for deployment errors
3. Check GitHub Actions logs for workflow issues
4. Contact the team lead for production deployments

---

**Last Updated**: $(date)
**CDK Version**: 2.208.0
**Node Version**: 18+
