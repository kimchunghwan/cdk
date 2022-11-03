
# Static site
- 도메인 인증서를 방급하기 위해서는 validation이 필요하기 때문에 사전에 deploy할 domain의 인증서를 발급할것 cloudfront이므로 버지니아 리전에서!
- 

## Deploy
```
$ npm install -g aws-cdk
$ npm install
$ npm run build
# 아래와 같이 -c 입력 혹은 `cdk.context.json`에 필요한 params를 정의할 것
$ cdk deploy -c accountId=123456789 -c domain=mystaticsite.com -c subdomain=test -c certificateArn=xxxxxxxxxxx
```


# comment
#### domain이 실제 적용되기 까지는 어느정도 시간이 필요하기 때문에 cloudfront의 도메인으로 일단 확인할것
