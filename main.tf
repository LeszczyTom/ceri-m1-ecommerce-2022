terraform {
  cloud {
    organization = "pinkzebra"

    workspaces {
      name = "ecommerce1"
    }
  }
}

data "google_secret_manager_secret" "address" {
  secret_id = "mysql-address"
}

data "google_secret_manager_secret" "database" {
  secret_id = "mysql-database-pinkzebra"
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe-west1"
}

resource "google_cloud_run_service_iam_member" "invokers" {
  location = google_cloud_run_service.pinkzebra_backend.location
  service  = google_cloud_run_service.pinkzebra_backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service" "pinkzebra_backend" {
  name     = "pinkzebra-backend"
  location = "europe-west1"

  template {
    spec {
      service_account_name = "terraform-pinkzebra@ceri-m1-ecommerce-2022.iam.gserviceaccount.com"
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/backend:latest"
        env {
          name = data.google_secret_manager_secret.database.secret_id
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.address.secret_id
              key  = "latest"
            }
          }
        }
      }
    }
  }
}

resource "google_cloud_run_service" "pinkzebra_frontend" {
  name     = "pinkzebra-frontend"
  location = "europe-west1"


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
  value = google_cloud_run_service.pinkzebra_frontend.status[0].url
}
