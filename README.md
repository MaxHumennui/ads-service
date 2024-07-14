# Ads Service

## Getting Started

Follow these steps to set up and run the project locally.

### Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:MaxHumennui/ads-service.git
    cd ads-service
    ```

2. **Install Dependencies**

    Using npm:
    
    ```bash
    npm install
    ```

    Using yarn:
    
    ```bash
    yarn install
    ```

### Running the Project

1. **Start the Development Server**

    Using npm:
    
    ```bash
    npm start
    ```

    Using yarn:
    
    ```bash
    yarn start
    ```

    The development server will start on `http://localhost:3000`.

### Project Structure

- **`/src`**: Contains the main source code for the React app.
  - **`/components`**: Contains reusable React components.
  - **`/context`**: Contains context providers for managing global state.
  - **`/services`**: Contains API service functions.
  - **`App.js`**: The main application component.
  - **`index.js`**: The entry point for the React app.

### Key Features

- **Ad Management**: Add, edit, and delete advertisements.
- **Tracking**: Track impressions and clicks for each ad.
- **Statistics**: View general statistics and detailed statistics by country, region, and city.

### Dependencies

- **React**: A JavaScript library for building user interfaces.
- **styled-components**: A library for styling React components using tagged template literals.
- **axios**: A promise-based HTTP client for making API requests.
- **react-chartjs-2**: A React wrapper for Chart.js, used for creating charts.
