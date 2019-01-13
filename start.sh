#!/bin/bash

cd /app/backend/
node index.js &

cd /app/frontend/
node index.js
