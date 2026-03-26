# PlasticSense

PlasticSense is a web application that uses machine learning to detect and classify different types of plastics from images captured via your device's camera. It leverages TensorFlow.js and the MobileNet model to analyze images and map them to common plastic types, providing information on recyclability and usage.

## Features

- **Real-time Camera Input**: Capture images directly from your device's camera.
- **Plastic Classification**: Uses AI to classify plastics into types (e.g., PET, HDPE, PVC, etc.).
- **Recyclability Information**: Displays whether the detected plastic is recyclable and provides a description.
- **User-Friendly Interface**: Built with React and styled with Tailwind CSS for a modern, responsive UI.

## Technologies Used

- **Frontend**: React, Vite
- **Machine Learning**: TensorFlow.js, MobileNet
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd PlasticSense/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

1. Allow camera access when prompted.
2. Point your camera at a plastic item.
3. Capture an image by clicking the capture button.
4. View the classification results, including the plastic type, recyclability status, and description.

## Building for Production

To build the app for production:

```
npm run build
```

Then, preview the build:

```
npm run preview
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
