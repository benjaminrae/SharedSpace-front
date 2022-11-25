#!/bin/sh

cd src
mkdir environments
cd environments

echo "export const environment = {
  production: false,
  apiUrl: '"$API_URL"',};" > environment.ts

echo "export const environment = {
  production: true,
  apiUrl: '"$API_URL"',};" > environment.prod.ts

echo 'Finished setting up environment'

exit 0
