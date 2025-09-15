# Kweli - Modern Feedback Collection Platform

Kweli is a responsive web application built with React, TypeScript, and Chakra UI for collecting and managing user feedback, bug reports, and feature requests. The platform provides an intuitive interface for users to submit feedback and for administrators to view and manage submissions.

## Features

- 🎨 **Modern UI/UX** - Built with Chakra UI for a clean, responsive design
- 🌓 **Dark/Light Mode** - Toggle between color schemes
- 📝 **Feedback Forms** - Easy-to-use forms for submitting feedback and bug reports
- 📊 **Dashboard** - View and manage all feedback submissions
- ⚡ **Fast** - Built with Vite for optimal performance
- 🔒 **Secure** - Type-safe with TypeScript
- 📱 **Mobile-First** - Optimized for low-bandwidth connections
- 📡 **Offline Support** - Submit feedback even without internet connection

## Tech Stack

- ⚛️ React 18 with TypeScript
- 🎨 Chakra UI for accessible components
- 🔄 React Query for data fetching and caching
- 📱 Vite for fast development and building
- 🔧 PWA with offline support
- 🌐 React Router for navigation

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
# Build the app for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── config/          # App configuration
├── features/        # Feature-based modules
│   ├── feedback/    # Feedback submission and management
│   ├── reports/     # Report generation and viewing
│   └── settings/    # User and app settings
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and API clients
├── providers/       # Context providers
├── routes/          # Route configurations
├── types/           # TypeScript type definitions
└── App.tsx          # Root component
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with ❤️ for communities in underserved regions
- Special thanks to all contributors and testers

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
