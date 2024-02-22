# Matomo Data to Google Sheets Script

This script is designed to fetch data from the Matomo API and update it in a Google Sheets spreadsheet.

## Requirements

1. Node.js
2. Matomo API key and access to a Google Sheets account.

## Configuration

1. Copy the `.env.example` file and rename it to `.env`.
2. Fill in the required environment variables in the `.env` file:
    - `MATOMO_TO_GSHEET_KEYFILEPATH`: Path to the Google service key.
    - `MATOMO_TO_GSHEET_SPREADSHEET_ID`: Google Sheets spreadsheet ID where the data will be saved.
    - `MATOMO_TO_GSHEET_API_URL`: Matomo API URL.
    - `MATOMO_TO_GSHEET_SITE_ID`: Matomo website ID.
    - `MATOMO_TO_GSHEET_TOKEN`: Matomo authentication token.

### Note on Authentication

For the `MATOMO_TO_GSHEET_KEYFILEPATH` variable, it represents the path to the Google service account key file, which is required for authentication with the Google Sheets API. You can obtain this key file by following these steps:

1. Navigate to the Google Cloud Console.
2. Select the project associated with your Google Sheets account.
3. In the left sidebar, click on "IAM & admin" and then "Service accounts".
4. Find the service account you want to use or create a new one.
5. Click on the service account and then navigate to the "Keys" tab.
6. Click on "Add key" and select "JSON" format.
7. Save the downloaded JSON file securely to your local machine.
8. Set the `MATOMO_TO_GSHEET_KEYFILEPATH` variable in the `.env` file to the path of the downloaded JSON file.

Ensure that the service account has the necessary permissions to access the Google Sheets API and edit the specified spreadsheet.

## Installation

3. Run `npm install` to install all required dependencies.

## Running the Script

1. Run `npm run matomo-to-gsheet:run` to execute the script from the project's root directory.
2. The script will fetch data from the Matomo API and update the Google Sheets spreadsheet.

## Architecture

The project consists of several main components:

1. **Matomo Service**: Responsible for communicating with the Matomo API and fetching data according to specified parameters. Handles various types of queries, such as fetching action events, category events, etc.

2. **Google Sheet Service**: Manages the update of the Google Sheets spreadsheet. Retrieves data from the Matomo Service and updates the appropriate cells in the Google Sheets spreadsheet.

3. **Utils**: Set of utility functions, such as generating date ranges, validating date formats, etc.

4. **Environment Configuration**: The `.env` file where environment variables necessary for configuring the script are stored, such as API keys and Google Sheets identifiers.

### Enhancing Automation

For enhanced automation, consider transferring the script to GitHub Actions as a scheduled cron job. This will allow for periodic execution of the script without the need for manual intervention.
