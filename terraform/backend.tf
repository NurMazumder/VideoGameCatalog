terraform {
  backend "s3" {
    bucket = "terraform-state-videogamecatalog-kevinzheng0701" 
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}