zip -r "flask-$1.zip" ./*

aws s3 cp "flask-$1.zip" s3://terraform-state-videogamecatalog-minle2002

aws elasticbeanstalk create-application-version --application-name flask --source-bundle S3Bucket="terraform-state-videogamecatalog-minle2002",S3Key="flask-$1.zip" --version-label "ver-$1" --description "flask app" --region "us-east-2"

aws elasticbeanstalk update-environment --environment-name flask-environment --version-label "ver-$1" --region "us-east-2"
