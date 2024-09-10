## commission

This folder contains main logic in the app.

## commission.module

This file provides metadata that Nest makes use of to organize the application structure

## commission.controller

This file is responsible for handling routes/requests  
There are 3 routes to use

- GET /  
  Retrieves data from a file and prints calculated fees.
- GET /data  
  Fetches mock data from a JSON file.
- POST /  
  Calculates fees based on the data provided in the request body.

## commission.service

This file contains the core logic for fee calculation.

## file-reader.service

This file provides functionality to read JSON files.
