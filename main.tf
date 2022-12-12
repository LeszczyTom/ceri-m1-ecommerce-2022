terraform {
  cloud {
    organization = "pinkzebra"

    workspaces {
      name = "ecommerce1"
    }
  }
}

data "google_secret_manager_secret" "address" {
  secret_id = "mysql.address"
  version   = "1"
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe-west1"
}

resource "google_cloud_run_service" "back" {
  name     = "cloud-run-backend"
  location = "europe-west1"

  metadata {
    annotations = {
      "autoscaling.knative.dev/maxScale" = 1
    }
  }

  template {
    spec {
      service_account_name = "terraform-pinkzebra@ceri-m1-ecommerce-2022.iam.gserviceaccount.com"
      containers {
        env {
          name = "DATABASE_ADDRESS"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.address.secret_id
              key  = "latest"
            }
          }
        }
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/backend:latest"
      }
    }
  }
}

resource "google_cloud_run_service" "front" {
  name     = "cloud-run-frontend"
  location = "europe-west1"

  metadata {
    annotations = {
      "autoscaling.knative.dev/maxScale" = 1
    }
  }

  template {
    spec {
      service_account_name = "terraform-pinkzebra@ceri-m1-ecommerce-2022.iam.gserviceaccount.com"
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/frontend:latest"
      }
    }
  }
}

output "url" {
  value = google_cloud_run_service.front.status[0].url
}
