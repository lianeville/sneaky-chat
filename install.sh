#!/bin/bash

# Run npm install in the root folder
npm install

# Run npm install in the frontend folder (app/)
cd app
npm install

# Return to the root folder
cd ..

# Run npm install in the backend folder (api/)
cd api
npm install