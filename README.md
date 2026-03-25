n# CV Builder

A modern, responsive CV/Resume builder built with React, TypeScript, and Tailwind CSS.

## Features

- 📝 **Real-time Preview** - See your CV update as you type
- 🌐 **Multi-language Support** - Available in English, Greek, Spanish, French, and German
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🎨 **Customizable** - Change fonts, colors, font sizes, and section order
- 📄 **PDF Export** - Export your CV to PDF format
- 💾 **Drag & Drop** - Reorder sections easily
- **Bold Text** - Make text bold in various fields

## Sections Available

- Personal Information
- Profile/Summary
- Education
- Experience
- Skills
- Projects
- Languages
- Voluntary Work
- Conferences
- Certifications
- Achievements
- Publications
- Interests
- References

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd cv-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Starting the PDF Server

For PDF export functionality, you need to run the PDF server in a separate terminal:

```bash
cd server
node pdf-server.js
```

## Project Structure

```
cv-builder/
├── src/
│   ├── components/
│   │   ├── Editor.tsx       # Main form editor
│   │   ├── Preview.tsx      # Live CV preview
│   │   ├── Sidebar.tsx      # Settings & sections
│   │   └── MonthPicker.tsx  # Date picker component
│   ├── context/
│   │   └── CVContext.tsx    # Global state management
│   ├── hooks/
│   │   └── usePDFExport.ts  # PDF export functionality
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── utils/
│   │   └── dateFormat.ts    # Date formatting utilities
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── server/
│   └── pdf-server.js        # Express server for PDF generation
└── package.json
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Puppeteer** - PDF generation
- **Express** - PDF server

## Customization

### Changing Language

Use the language dropdown in the sidebar to switch between:
- English
- Greek (Ελληνικά)
- Spanish (Español)
- French (Français)
- German (Deutsch)

### Customizing Appearance

In the sidebar settings panel, you can:
- Change the main font
- Adjust font sizes (title, body)
- Change primary and text colors
- Adjust section margins
- Reorder sections via drag and drop

### Adding Bold Text

In supported fields (institution, company, project name, etc.), use the **B** button to toggle bold formatting.

## License

MIT
