
# Learn how to Customize the "VOD on AWS" Transcoding Solution with QC, DRM, and More


## 1. Deploy the Video on Demand on AWS Solution

Template:: https://s3.amazonaws.com/solutions-reference/video-on-demand/latest/video-on-demand-media-convert.template
 
1. Copy the URL to the template
2. Open the CloudFormation console, navigate to Oregon (US-WEST-2)
3. Select create new stack
4. Select ‘Specify an Amazon S3 template URL’, paste in the URL and select next.
5. On the parameters section name the stack ‘reinvent’
6. Enter your email address, leave the remaining parameters as default and select next
7. Click next.
8. On the last page tick the ‘I acknowledge that AWS CloudFormation might create IAM resources’ box and then select launch.


## 2. Deploy the SPEKE Reference Server

Template:: https://s3.amazonaws.com/rodeolabz-us-east-1/speke/speke_reference.json
 
1. Copy the URL to the template
2. Open the CloudFormation console, navigate to Oregon (US-WEST-2)
3. Select create new stack
4. Select ‘Specify an Amazon S3 template URL’, paste in the URL and select next.
5. On the parameters section name the stack ‘speke’
6. Leave the remaining parameters as default and select next
7. Click next.
8. On the last page tick the ‘I acknowledge that AWS CloudFormation might create IAM resources’ box and then select launch.


## 3 Workshop Modules

#### Video on Demand on AWS https://aws.amazon.com/answers/

#### Speke - https://github.com/awslabs/speke-reference-server/blob/master/workflow/drm-vod.md

#### Rules – https://mediaservices.elemental.rodeo/mediaconvert/vodonawslab/RulesOnAWS.pdf
  * User:  vod-lab
  * PW: T00MuchFun

#### QC  https://d2tyh2ajeox0aa.cloudfront.net/vod-qc.pdf
