#!/usr/bin/env bash

## Setup environmental variables
if [ -f "${TERRAHUB_BUILD_TEMP_VARS}" ]; then
  source ${TERRAHUB_BUILD_TEMP_VARS}
fi

## Validate environmental variables
if [ -z "${TERRAHUB_VAR_S3_BUCKET_NAME}" ]; then
  echo 'ERROR: TERRAHUB_VAR_S3_BUCKET_NAME variable is empty. Aborting...'
  exit 1
fi

## Check if the project must be built
if [ "${TERRAHUB_BUILD_OK}" == "true" ]; then
  echo "TERRAHUB_BUILD_OK='${TERRAHUB_BUILD_OK}' ==> Starting build process."
  npm --version > /dev/null 2>&1 || { echo >&2 'ERROR: npm is missing. Aborting...'; exit 1; }
  aws --version > /dev/null 2>&1 || { echo >&2 'awscli is missing. Aborting...'; exit 1; }
  npm install || { echo 'ERROR: Failed to run npm install'; exit 1; }
  npm run build ||  { echo 'ERROR: Failed to run npm run build'; exit 1; }
  echo "TERRAHUB_BUILD_OK='${TERRAHUB_BUILD_OK}' ==> Finishing build process."
else
  echo "TERRAHUB_BUILD_OK='${TERRAHUB_BUILD_OK}' ==> Skipping build process."
fi
