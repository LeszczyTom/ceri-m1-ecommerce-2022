terraform {
  cloud {
    organization = "pinkzebra"

    workspaces {
      name = "ecommerce1"
    }
  }
}

data "google_secret_manager_secret" "user" {
  secret_id = "mysql-user-pinkzebra"
}

data "google_secret_manager_secret" "password" {
  secret_id = "mysql-password-pinkzebra"
}

data "google_secret_manager_secret" "dbname" {
  secret_id = "mysql-database-pinkzebra"
}

data "google_secret_manager_secret" "host" {
  secret_id = "mysql-address"
}

provider "google" {
  project = "ceri-m1-ecommerce-2022"
  region  = "europe-west1"
}

resource "google_cloud_run_service_iam_member" "invokers_back" {
  location = google_cloud_run_service.pinkzebra_backend.location
  service  = google_cloud_run_service.pinkzebra_backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "invokers_front" {
  location = google_cloud_run_service.pinkzebra_frontend.location
  service  = google_cloud_run_service.pinkzebra_frontend.name
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
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/backend:1.1.7"
        env {
          name = "DB_USER"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.user.secret_id
              key  = "latest"
            }
          }
        }
        env {
          name = "DB_PWD"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.password.secret_id
              key  = "latest"
            }
          }
        }
        env {
          name  = "DB_HOSTNAME"
          value = data.google_secret_manager_secret.host.secret_id
        }
        env {
          name  = "DB_PORT"
          value = 8080
        }
        env {
          name = "DB_SCHEMA"
          value_from {
            secret_key_ref {
              name = data.google_secret_manager_secret.dbname.secret_id
              key  = "latest"
            }
          }
        }
      }
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1"
        "run.googleapis.com/cloudsql-instances" = "ceri-m1-ecommerce-2022:europe-west1:mysql-primary"
        "seed"                                  = "9"
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
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/frontend:1.0.8"
      }
    }
  }
}

output "pinkzebra_front_url" {
  value = google_cloud_run_service.pinkzebra_frontend.status[0].url
}

output "pinkzebra_back_url" {
  value = google_cloud_run_service.pinkzebra_backend.status[0].url
}
