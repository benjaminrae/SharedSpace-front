#!/bin/sh

cd src
mkdir _environments
cd _environments

echo "export const environment = {
  production: false,
  apiUrl: '"$API_URL"',};" > environment.ts

echo "export const environment = {
  production: true,
  apiUrl: '"$API_URL"',};" > environment.prod.ts

echo 'Finished setting up environment'

exit 0
