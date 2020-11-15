# inputs
test=$1

# start redis
docker-compose up -d

# run test
jest $test --forceExit --runInBand
exitcode=$?

# stop redis
docker-compose down

# exit with the test exit code
exit $exitcode