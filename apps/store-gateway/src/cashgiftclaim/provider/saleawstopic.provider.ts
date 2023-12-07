import { SNSClient } from '@aws-sdk/client-sns';

export abstract class ISaleAwsTopicProvider extends SNSClient {}
