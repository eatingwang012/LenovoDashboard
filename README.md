# Lenovo Dashboard

An interactive dashboard designed for Lenovo consumer notebook product managers, providing monthly market intelligence, consumer insights, and product performance analysis.

## Features

- **Shipment Landscape**: Track market trends and volume.
- **Consumer Insights**: Analyze buyer demographics, segmentation, and sentiment.
- **Product Analysis**: Detailed performance metrics for ThinkPad, Yoga, Legion, and more.
- **Real-time Data Simulation**: Driven by interactive filters to simulate various scenarios.

## Technical Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Animations**: Motion
- **Icons**: Lucide React
- **Charts**: Recharts & D3.js
- **UI Components**: Radix UI (Shadcn/UI components)

## Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone or download the project repository.
2. Navigate to the project directory in your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:
```bash
npm run build
```

The optimized files will be generated in the `build/` directory.

### Preview Production Build

To locally preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/components`: UI components and page views.
- `src/components/ui`: Reusable primitive components (Radix UI).
- `src/lib`: Utility functions.
- `index.html`: Entry point.
- `vite.config.ts`: Vite configuration.
- `metadata.json`: Application metadata.
