#!/bin/bash
if [ "$NODE_ENV" == "production" ]; then
  npm run build:prod
else
  npm run build:dev
fi