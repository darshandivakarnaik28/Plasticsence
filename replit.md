# Smart Plastic Classification System

## Overview
An AI-powered real-time plastic detection and classification system that uses computer vision to identify plastic materials by their resin identification codes (1-7) and provides recycling information for sustainable waste management.

## Purpose
- Enable users to point their webcam at plastic items and receive instant classification
- Identify plastic types: PET, HDPE, PVC, LDPE, PP, PS, and Other
- Display recycling information including common uses, characteristics, and disposal tips
- Track detection history with timestamps and confidence scores

## Current State
**Status:** ✅ Fully functional MVP

The system is complete with:
- Real-time webcam integration with camera permissions handling
- OpenAI Vision API integration for plastic classification
- Interactive UI with detection results, recycling info, and history tracking
- Comprehensive error handling for camera access and API failures
- Dark mode support with theme toggle
- Responsive design for desktop and mobile devices

## Recent Changes (November 9, 2025)
- Implemented backend API endpoint using OpenAI GPT-4o-mini Vision model
- Connected frontend camera capture to classification API
- Added detection history tracking (up to 20 recent detections)
- Implemented statistics tracking (total detections, average confidence, processing time)
- Fixed average confidence calculation bug identified by code review
- Added comprehensive error handling with toast notifications
- Created reusable UI components following design guidelines

## Project Architecture

### Frontend Components
- **CameraFeed**: Displays webcam stream with detection box overlay
- **DetectionResults**: Shows resin code, plastic type, confidence, and recyclability
- **RecyclingInfo**: Displays common uses, characteristics, and recycling tips
- **DetectionHistory**: Scrollable list of past detections with timestamps
- **ControlPanel**: Camera controls (start/stop detection, capture & analyze)
- **StatsDisplay**: Shows detection statistics (count, avg confidence, processing time)
- **ThemeToggle**: Dark/light mode switcher

### Backend API
- **POST /api/classify**: Accepts base64 image data, returns plastic classification
  - Uses OpenAI GPT-4o-mini with vision capabilities
  - Returns: resinCode (1-7), confidence (0-100), plasticDetected, reasoning, processingTime

### Data Model (shared/schema.ts)
- **plasticTypes**: Reference data for 7 resin identification codes
- **DetectionResult**: Interface for classification responses
- **PlasticType**: Type definitions for plastic materials

### Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **AI**: OpenAI GPT-4o-mini Vision API
- **Storage**: In-memory (no database required for MVP)

## User Preferences
- Uses Inter font family for clean, modern typography
- Follows Material Design-inspired patterns for data-dense applications
- Green color scheme (primary: hsl(142, 70%, 45%)) representing environmental awareness
- Professional, scientific aesthetic that builds trust
- Real-time feedback with loading states and toast notifications

## How to Use

### Running the Application
1. The app runs on port 5000 (frontend and backend served together)
2. Command: `npm run dev`
3. Access at: http://localhost:5000

### Required Environment Variables
- `OPENAI_API_KEY`: OpenAI API key for vision classification (required)
- `SESSION_SECRET`: Session secret for Express (auto-generated)

### Using the System
1. Click "Start Detection" to activate your webcam
2. Grant camera permissions when prompted by the browser
3. Point camera at a plastic item
4. Click "Capture & Analyze" to classify the plastic
5. View results: resin code, type, recyclability, and detailed recycling info
6. Check detection history to see past classifications
7. Use "Clear" to reset history, "Stop Detection" to turn off camera

## Testing Notes
- Camera access requires user permission (browser security)
- AI classification works best with clear, well-lit images of plastic items
- Processing time typically 1-3 seconds depending on API response
- No plastic detected? Try different angles or better lighting

## Future Enhancements (Next Phase)
- Train custom deep learning model on plastic resin dataset for offline processing
- Add confidence score visualization and multiple object detection
- Implement export functionality for detection results (CSV/JSON)
- Create educational mode with expanded recycling guidelines
- Add continuous detection mode (auto-capture at intervals)
- Implement user accounts and cloud-based detection history

## Architecture Decisions
- **Why in-memory storage?** MVP doesn't require persistence; all state is session-based
- **Why OpenAI Vision API?** Rapid prototyping without training custom models; can be replaced later
- **Why base64 image encoding?** Simple HTTP transport; no file upload complexity
- **Why limit history to 20 items?** Prevents memory bloat; sufficient for demo purposes
