set -ex

gcloud config set project shark-game-309204 # Set gcloud project
npm run build
gcloud app deploy # deploy to Google App Engine
