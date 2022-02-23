# AWS KMS Test in nodejs(with nestjs)
## CMK(Customer Managed Key) 

### Runtime install
* Pre-Installed : awscli, AWS Access Key, AWS Secret Key
* Runtime : yarn
* Install : git clone & yarn install
* Execution : yarn start

### Variable have to be changed
* AppService : generatorKeyId - KMS ARN alias, keyIds - KMS ARN key

### Health check
* curl -X 'GET' 'http://localhost:3000/' -H 'accept: */*'
* expect to 'HelloWorld!'

### Testing
* curl -X 'GET' 'http://localhost:3000/encrypt' -H 'accept: */*'

