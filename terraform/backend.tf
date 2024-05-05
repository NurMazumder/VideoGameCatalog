terraform {
  backend "s3" {
    bucket = "terraform-state-videogamecatalog-minle2002" 
    key    = "videogamecatalog/terraform.tfstate"
    region = "us-east-2"
  }
}