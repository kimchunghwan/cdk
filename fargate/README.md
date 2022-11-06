
# route53-alb-fargate
### todo
- `https` 대응

## Deploy
```
$ npm install -g aws-cdk
$ npm install
$ npm run build
$ cdk deploy -c accountId=123456789 -c domain=mystaticsite.com -c awsRegion=ap-northeast-1 
```
혹은 `cdk.context.json`에 필요한 params를 정의할 것

