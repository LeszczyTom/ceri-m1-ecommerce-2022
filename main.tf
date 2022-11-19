terraform {
  cloud {
    organization = "pinkzebra"

    workspaces {
      name = "ecommerce1"
    }
  }
}

provider "google" {
    project = "ceri-m1-ecommerce-2022"
    region  = "europe-west1"
}

resource "google_cloud_run_service" "default" {
  name     = "CLOUD_RUN_BACKEND"
  location = "europe-west1"

  metadata {
    annotations = {
      "autoscaling.knative.dev/maxScale" = 1
      "autoscaling.knative.dev/minScale" = 1
    }
  }

  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/backend"
      }
    }
  }
}

resource "google_cloud_run_service" "default" {
  name     = "CLOUD_RUN_FRONTEND"
  location = "europe-west1"

  metadata {
    annotations = {
      "autoscaling.knative.dev/maxScale" = 1
      "autoscaling.knative.dev/minScale" = 1
    }
  }
  
  template {
    spec {
      containers {
        image = "europe-west1-docker.pkg.dev/ceri-m1-ecommerce-2022/pinkzebra/frontend"
      }
    }
  }
}