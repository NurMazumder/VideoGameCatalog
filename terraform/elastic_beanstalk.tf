resource "aws_elastic_beanstalk_application" "application" {
    name = "mernstack"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "mernstack-environment"
  cname_prefix        = "kevinzheng0701mernstack"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.0.1 running Node.js 21"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}