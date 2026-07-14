#!/usr/bin/env bash
set -euo pipefail

BUCKET_NAME="promaintenance-website"
AWS_PROFILE="montania-deploy"
DIST_DIR="dist"

if ! command -v aws >/dev/null 2>&1; then
  echo "AWS CLI not found. Please install it first." >&2
  exit 1
fi

if [ ! -d "$DIST_DIR" ]; then
  echo "Building the site..."
  npm run build
fi

echo "Deploying site to S3 bucket '$BUCKET_NAME' using profile '$AWS_PROFILE'..."
aws s3 sync "$DIST_DIR" "s3://$BUCKET_NAME" --profile "$AWS_PROFILE" --delete

echo "Deployment complete."
