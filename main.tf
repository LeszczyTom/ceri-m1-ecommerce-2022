terraform {
  cloud {
    organization = "pinkzebra"

    workspaces {
      name = "ecommerce1"
    }
  }
}

provider "google" {
    project = " ceri-m1-ecommerce-2022"
    region  = "europe-west1"
}