## Node.js Authentication and Authorization API

This project is a simple Node.js API for user registration, authentication, and authorization using Express, JWT, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:

   \`\`\`
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   \`\`\`

2. Install dependencies:

   \`\`\`
   npm install
   \`\`\`

3. Set up MongoDB:

   - Create a MongoDB Atlas account: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster and obtain the connection string.
   - Replace the connection string in \`auth.js\` with your own.

4. Run the application:

   \`\`\`
   node auth.js
   \`\`\`

## Usage

### User Registration

Endpoint: \`POST /registration\`

\`\`\`
curl -X POST -H \"Content-Type: application/json\" -d '{\"username\":\"newuser\", \"password\":\"newpassword\"}' http://localhost:3000/registration
\`\`\`

### User Login

Endpoint: \`POST /login\`

\`\`\`
curl -X POST -H \"Content-Type: application/json\" -d '{\"username\":\"newuser\", \"password\":\"newpassword\"}' http://localhost:3000/login
\`\`\`

### Protected Route

Endpoint: \`GET /protected\`

\`\`\`
curl -H \"Authorization: Bearer YOUR_TOKEN\" http://localhost:3000/protected
\`\`\`

Replace \`YOUR_TOKEN\` with the token obtained during login.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details." > README.md
