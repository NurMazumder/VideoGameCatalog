zip -r "vgc-${{github.sha}}.zip" ./dict

aws s3 cp vgc-${{github.sha}}.zip s3://terraform-state-vgc1-cwang006

aws elasticbeanstalk create-application-version --application-name flaskbb --source-bundle S3Bucket="vgc",S3Key="vgc-${{github.sha}}.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-1"