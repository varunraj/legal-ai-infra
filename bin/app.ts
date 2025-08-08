#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { LegalAiInfraStack } from '../lib/legal-ai-infra-stack';

const app = new cdk.App();

const stage = app.node.tryGetContext('stage') || 'dev';
const context = app.node.tryGetContext(stage);

new LegalAiInfraStack(app, `${context.prefix}-legal-ai-infra-stack`, {
  env: {
    region: context.region,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  prefix: context.prefix,
});
