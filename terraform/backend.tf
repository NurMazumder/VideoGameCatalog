terraform {
  backend "s3" {
    bucket = "terraform-vgc-nurmazumder" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}