# Parse Text into CSV

This is a simple React application designed to parse raw text into CSV format. It utilizes React for the front-end and includes a component named `ProfileParser` for handling the parsing logic.

## How to Use

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/kgaban/parse-text-into-csv.git
    ```

2. Navigate to the project directory.

    ```bash
    cd parse-text-into-csv
    ```

3. Install dependencies.

    ```bash
    npm install
    ```

4. Start the development server.

    ```bash
    npm start
    ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to use the application.

## Features

- **Convert Raw Text to CSV:** Paste raw text, such as LinkedIn profile information, into the provided textarea, and the application will parse it into CSV format.

- **CSV Output:** The parsed results are displayed in CSV format, including columns for Last Name, First Name, and Role.

- **Filtering:** The application filters profiles based on certain conditions, such as the presence of the word "recruiter" in the role.

## Dependencies

- React: ^18.2.0
- React CSV: ^2.2.2

## Scripts

- **npm start:** Starts the development server.
- **npm run build:** Builds the production-ready application.
- **npm test:** Runs tests using React scripts.
- **npm run eject:** Ejects from create-react-app, providing full control over configurations.

## Deployment

The application is set up for deployment using GitHub Pages. You can deploy the application by running:

```bash
npm run deploy
```
This will build the application and publish it to the gh-pages branch.