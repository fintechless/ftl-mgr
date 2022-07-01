#!/bin/bash

terrahub --version > /dev/null 2>&1 || { echo >&2 "[ERROR] terrahub is missing. Aborting..."; exit 1; }

if [ -z "${CICD_TEMP_VARS}" ]; then
  echo "[ERROR] Environment variable 'CICD_TEMP_VARS' is missing. Aborting..."
  exit 1
elif [ -f "${CICD_TEMP_VARS}" ]; then
  echo "[EXEC] source ${CICD_TEMP_VARS}"
  . "${CICD_TEMP_VARS}"
fi

if [ -n "${CICD_REPOSITORY_DIR}" ]; then
  echo "[EXEC] cd ${CICD_REPOSITORY_DIR}"
  cd "${CICD_REPOSITORY_DIR}" || exit 1
fi

if [ -n "${CICD_BUILD_TARGET}" ] && [ -n "${CICD_SWITCH_TARGET}" ]; then
  echo "[WARN] Switching to '${CICD_BUILD_TARGET}' build target"
  terrahub configure -c terraform.varFile[]="default.tfvars"
  terrahub configure -c terraform.varFile[]="${CICD_BUILD_TARGET}.tfvars"
fi

if [ -n "${CICD_RELEASE_TARGET}" ] && [ -n "${CICD_SWITCH_TARGET}" ]; then
  echo "[WARN] Switching to '${CICD_RELEASE_TARGET}' release target"
  terrahub configure -c terraform.varFile[]="${CICD_RELEASE_TARGET}/default.tfvars"
  if [ -n "${CICD_BUILD_TARGET}" ]; then
    terrahub configure -c terraform.varFile[]="${CICD_RELEASE_TARGET}/${CICD_BUILD_TARGET}.tfvars"
  fi
fi

CICD_THUB_RUN=""
if [ "${CODEBUILD_WEBHOOK_EVENT}" = "PULL_REQUEST_MERGED" ]; then CICD_THUB_RUN="${CICD_THUB_RUN}&approve"; fi
if [ "${CICD_WEBHOOK_EVENT}" = "PULL_REQUEST_MERGED" ]; then CICD_THUB_RUN="${CICD_THUB_RUN}&approve"; fi
if [ "${CICD_WEBHOOK_EVENT}" = "pullRequestApprovalStateChanged" ]; then CICD_THUB_RUN="${CICD_THUB_RUN}&approve"; fi

CICD_THUB_OPTS=""
if [ -n "${CICD_THUB_INCLUDE}" ]; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -I '^(${CICD_THUB_INCLUDE})'"; fi
if [ -n "${CICD_THUB_EXCLUDE}" ]; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -X '^(${CICD_THUB_EXCLUDE})'"; fi
if printf "%s\n" "${CICD_THUB_RUN}" | grep -q "approve"; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -a -y"; fi
if printf "%s\n" "${CICD_THUB_RUN}" | grep -q "destroy"; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -d -y"; fi
if [ "${CICD_BRANCH_TO}" != "${CICD_BRANCH_DEFAULT}" ]; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -e ${CICD_BRANCH_TO/workspace\//}"; fi
if [ "${CICD_BRANCH_TO}" != "${CICD_BRANCH_FROM}" ]; then CICD_THUB_OPTS="${CICD_THUB_OPTS} -g ${CICD_BRANCH_TO}..${CICD_BRANCH_FROM}"; fi

echo "[EXEC] terrahub run -s -p ignore ${CICD_THUB_OPTS}"
terrahub run -s -p ignore ${CICD_THUB_OPTS} || { echo >&2 "[ERROR] Failed to run 'terrahub run -s -p ignore ${CICD_THUB_OPTS}'. Aborting..."; exit 1; }

if [ -n "${CICD_THUB_BUILD}" ] && [ "${CICD_THUB_BUILD}" = "true" ]; then
  echo "[EXEC] terrahub build ${CICD_THUB_OPTS}"
  terrahub build "${CICD_THUB_OPTS}" || { echo >&2 "[ERROR] Failed to run 'terrahub build ${CICD_THUB_OPTS}'. Aborting..."; exit 1; }
fi

###########################################
### DO NOT ADD COMMANDS AFTER THIS LINE ###
###########################################
