# MyHomepage API

MyHomepage API is a small Express.js backend that powers a landing page for the internet. This landing page serves as your homepage and provides various functionalities, including displaying the current date and time, managing a to-do list, and offering access to a Google search.

## Features

- Display the current date and time.
- Create and manage a to-do list.
- Access a Google search.

## Prerequisites

Make sure you have the following tools and software installed:

- Git
- Docker
- Node.js 18
- npm 9

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/rich-fs/myhomepage.api.git
   cd myhomepage.api
   ```

2. Create a .env file by copying the provided example:
    ```bash
    cp .env.example .env
    ```

3. Start the Docker containers:
    ```bash
    docker compose up
    ```

The API will be available at: http://localhost:3030

4. This project uses `eslint` with the Airbnb config. You can run the following command to lint the project:
    ```bash
    npm run lint
    ```

## Contributing

Contributions are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the GNU GPL3 License.
