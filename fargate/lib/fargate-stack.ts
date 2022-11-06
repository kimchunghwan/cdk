import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import * as route53 from 'aws-cdk-lib/aws-route53'
import {Construct} from 'constructs';
import {aws_route53_targets, CfnOutput} from "aws-cdk-lib";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FargateStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, 'MyVpc', {maxAzs: 2});
        const cluster = new ecs.Cluster(this, 'Ec2Cluster', {vpc});

        const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'service', {
            cluster,
            taskImageOptions: {
                image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")
            },
            cpu: 256,
            memoryLimitMiB: 512,
            assignPublicIp: true,
            desiredCount: 1,
        })
        const hostedZone = route53.HostedZone.fromLookup(this, 'MyZone', {
            domainName: this.node.tryGetContext('domain'),
        });
        const testDomainName = 'test.' + this.node.tryGetContext('domain')
        new route53.ARecord(this, 'ARecord', {
            recordName: testDomainName,
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new aws_route53_targets.LoadBalancerTarget(service.loadBalancer))
        })
        new CfnOutput(this, 'domain', {
            value: 'http://'+testDomainName,
            exportName: 'domainName'
        })
    }
}
