#!/bin/bash

# Variables
ZIP_FILE="vgc_deploy-$1.zip"
S3_BUCKET="terraform-vgc-nurmazumder"
APPLICATION_NAME="vgc-application"
ENVIRONMENT_NAME="vgc-environment"
REGION="us-east-2"

# Navigate to the root directory of the project
cd /Desktop/videogamecatalog

# Build the frontend
cd frontend
npm install
npm run dev

# Move build files to the root directory
cp -r build ../build

# Zip the entire application
cd ..
zip -r "$ZIP_FILE" . -x "node_modules/*" -x "frontend/node_modules/*" -x ".git/*"

# Upload to S3
aws s3 cp "$ZIP_FILE" s3://$S3_BUCKET

# Create new application version
aws elasticbeanstalk create-application-version --application-name $APPLICATION_NAME --source-bundle S3Bucket="$S3_BUCKET",S3Key="$ZIP_FILE" --version-label "ver-$1" --description "VGC deploy" --region "$REGION"

# Update environment
aws elasticbeanstalk update-environment --environment-name $ENVIRONMENT_NAME --version-label "ver-$1" --region "$REGION"
