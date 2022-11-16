terraform {
    cloud {
        organization = "pinkzebra"

        workspaces {
            name = "ecommerce"
        }
    }
}

provider "google" {
    project = "ceri-m1-ecommerce-2022"
    region  = "europe-west1"
}