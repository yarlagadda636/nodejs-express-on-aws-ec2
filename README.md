# nodejs-express-on-aws-ec2

This repo hosts the source code for my YouTube tutorial on CI/CD from Github to an AWS EC2 instance via CodePipeline and CodeDeploy (https://www.youtube.com/watch?v=Buh3GjHPmjo). This tutorial uses a node.js express app as an example for the demo.
I also created a video to talk about how to fix some of the common CodeDeploy failures I have run into (https://www.youtube.com/watch?v=sXZVkOH6hrA). Below are a couple of examples:
```
ApplicationStop failed with exit code 1
```
```
The overall deployment failed because too many individual instances failed deployment, too few healthy instances are available for deployment, or some instances in your deployment group are experiencing problems.
```
===========================

EC2 script on creation to install the CodeDeploy Agent:

```
#!/bin/bash
sudo yum -y update
sudo yum -y install ruby
sudo yum -y install wget
cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto
```
Check if CodeDeploy agent is running:
```
sudo service codedeploy-agent status
```
Location for CodeDeploy logs:
```
/opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log
```
Uninstall CodeDeploy Agent:
```
sudo yum erase codedeploy-agent
```

===============================================================================================================================
   CI/CD from GitHub to AWS EC2 with CodePipeline and CodeDeploy - https://github.com/felixyu9/nodejs-express-on-aws-ec2.git
===============================================================================================================================

Step 1:- 
  Create a GitHub Repository
  Repository Name 		   nodejs-express-on-aws-ec2                 
  Options                          public
  Add a Readme file                yes
  Add .gitignore                   node
  Create Repository                Yes
Step 2:-
  creating files                   vscode 
  app.js
  appspec.yml
  package.json
  scrpts/application_stop.sh
  scripts/appication_start.sh
  scripts/before_install.sh
  
Step 3:-
  testing locally                npm install (from vscode)
  Node does not exists           https://nodejs.org/en/
                                 node app.js    *** Demo app is up and listening to port: 3000 ***  http://localhost:3000
                                 push the code to github    
Step 4:-
  IAM role                       IAM - Roles - Create Roles: EC2- Codedeploy - AmazonEC2RoleforAWSCodeDeploy RoleName:-EC2CodeDeployRole
                                 IAM - codedeploy -                                            - CodeDeployRole  
                                 
Step 5:-
  EC2-Instance                   Amazon Linux AMI t2micro  IAMRole:- EC2CodeDeployRole Userdata
                                 Key : Name Value ExpressApp
                                 Security Group : SSH Port: 22  HTTP: Port 80  CustomTCPPort  TCP 3000
                                 Key Pair : YourChoice
Step 6:-
  Code Deploy                    Go to Applications : Create an application : express-app
                                 Platform :- EC2/On-premis
                                 Create Deployment Group: expressapp-group
                                 Enter aserice role :- CodeDeployRole
                                 Deployment Type : In-Place
                                 Amazon EC2 Instance  Key: Name Value: ExpressApp
                                 Deployment settings :-  AllAtOnce
                                 LoadBalancer :Off           Create
                                 
 Step 7:-
 CodePipleline                   Create Pipeline :  express-app-pipeline
                                 New ServiceRole
                                 Advanced Settings: Default Location
                                 Source: GitHub version 2
                                 Connect to GitHub2 : connect to Git Hub, Connection Name: express-app-connection
                                 Install New, App connect with password
                                 Repository Access : Only select repositories : Select repositories, save and connect
                                 Select Repository Name : nodejs-express-on-aws-ec2 Branch name : main
                                 Code Pipeline Default
                                 Next :  skip build stage
                                 Deploy:  AWS CodeDeploy  Region: US East
                                 Application Name: 
                                 Deployment Group:  
                                 Next
                                 
                                 Deploy : Details, view: events
                                 
Step 8:-
Testing                          http://<ec2public dns name>:3000
Release                          change app.js
                                 test gain
                                 
                                 
  
                                 
  