resource "aws_elastic_beanstalk_application" "application" {
    name = "flask"  
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "flask-environment"
  cname_prefix        = "minle2002flask"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.0.11 running Python 3.11"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}