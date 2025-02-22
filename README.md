# Tasky AI - Modern Task Management App

![Tasky AI Banner](./tasky-ai.gif)

A modern task management application with AI capabilities, beautiful UI, and seamless user experience. Built with React, TypeScript, and powered by Appwrite backend and Google Gemini AI.

[![Watch Tutorial](https://img.shields.io/badge/Watch%20Tutorial-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=SjCGjT_Fdfg)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://taskly-ai.vercel.app)

## ✨ Features

- 🤖 AI-powered task suggestions and management with Google Gemini
- 📝 Create, edit, and organize tasks
- 🏷️ Tag system for better organization
- 📅 Due date scheduling with natural language processing
- 📁 Project management with color coding
- 📱 Responsive design for all devices
- 🔒 Secure authentication with Clerk
- ⚡ Real-time updates

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- NPM or Yarn
- Appwrite Instance
- Clerk Account
- Google Gemini API Key

### Installation

1. Clone the repository
```bash
git clone https://github.com/pakagronglb/tasky-ai-task-management-app.git
cd tasky-ai-task-management-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory
```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_ENDPOINT=your_endpoint
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── layouts/          # Layout components
├── lib/             # Utility functions and configurations
├── pages/           # Page components
├── routes/          # Route configurations
│   ├── actions/     # Route actions
│   └── loaders/     # Route loaders
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## 🔧 Configuration

### Appwrite Setup

1. Create a new project in Appwrite
2. Create a new database
3. Create the following collections:
   - tasks
   - projects
   - tags

### Clerk Setup

1. Create a new application in Clerk
2. Configure OAuth providers (if needed)
3. Add your domain to the allowed origins

### Google Gemini Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the API key to your `.env` file as `VITE_GEMINI_API_KEY`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- Tutorial by [CodeWithSadee](https://www.youtube.com/@codewithsadee)
- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- AI Powered by [Google Gemini](https://deepmind.google/technologies/gemini/)

## 📧 Contact

CodeWithSadee - [@codewithsadee](https://twitter.com/codewithsadee)

Project Link: [https://github.com/yourusername/taskly-ai-task-management-app](https://github.com/yourusername/taskly-ai-task-management-app)
