# Military Trading Card Web Application

This project is a web application that showcases a military trading card with interactive features. Users can flip the card to view its front and back sides using touch and drag gestures or by clicking a button.

## Project Structure

```
military-card-webapp
├── src
│   ├── index.html        # HTML structure of the web application
│   ├── styles.css       # CSS styles for the web application
│   ├── script.js        # JavaScript code for interactivity
│   └── types
│       └── index.ts     # TypeScript types and interfaces
├── package.json          # npm configuration file
├── tsconfig.json         # TypeScript configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd military-card-webapp
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the application:**
   You can use a local server to serve the application. For example, you can use `live-server` or any other static server:
   ```bash
   npx live-server src
   ```

4. **Open in a browser:**
   Navigate to `http://localhost:8080` (or the port specified by your server) to view the application.

## Usage Guidelines

- **Flipping the Card:** 
  - Click the "Flip Card" button to flip the card.
  - On touch devices, you can touch and drag to rotate the card or swipe to flip it.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.