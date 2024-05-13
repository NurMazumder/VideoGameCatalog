terraform {
  backend "s3" {
    bucket = "terraform-state-vgc1-cwang006" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}