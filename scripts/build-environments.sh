#!/bin/sh

cd src
mkdir environments
cd environments

echo "export const environment = {
  production: false,
  apiUrl: '"$API_URL"',
  agmApiKey: '"$AGM_API_KEY"',  
  };" > environment.ts

echo "export const environment = {
  production: true,
  apiUrl: '"$API_URL"',
  agmApiKey: '"$AGM_API_KEY"',  
  };" > environment.prod.ts

echo 'Finished setting up environment'

exit 0
