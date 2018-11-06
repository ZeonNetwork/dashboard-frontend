#!/bin/bash

set -ev

function deploy {
	# $1 server url
	# $2 dest directory
	LOCAL_PATH="${TRAVIS_BUILD_DIR}/dist/"
	SSH_PARAMS="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

	rsync -avz -e "${SSH_PARAMS}" "${LOCAL_PATH}" cicd@"$1":"$2" --delete;
}


if [ "${TRAVIS_BRANCH}" == "master" ]; then
	deploy  "185.25.117.12" "/var/www/zeon/frontend/"
	deploy  "185.233.116.208" "/var/www/zeon/frontend/"
fi

exit 0;
