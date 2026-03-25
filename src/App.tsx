import React, { useRef, useState } from 'react';
import { CVProvider, useCV } from './context/CVContext';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { usePDFExport } from './hooks/usePDFExport';

type MobileTab = 'sidebar' | 'editor' | 'preview';

const AppContent: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { exportToPDF } = usePDFExport();
  const { t } = useCV();
  const [activeTab, setActiveTab] = useState<MobileTab>('editor');

  const handleExportPDF = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('handleExportPDF called');
    const fileName = 'my-cv';
    exportToPDF(event, previewRef, fileName);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Mobile Navigation Tabs - visible on small screens */}
      <nav className="lg:hidden flex border-b border-gray-200 bg-white shrink-0 sticky top-0 z-50">
        <button
          onClick={() => setActiveTab('sidebar')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
            activeTab === 'sidebar'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="block text-lg mb-1">⚙️</span>
          {t.settings}
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
            activeTab === 'editor'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="block text-lg mb-1">✏️</span>
          {t.edit}
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
            activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span className="block text-lg mb-1">👁️</span>
          {t.livePreview}
        </button>
      </nav>

      {/* Desktop Layout - 3 columns on large screens */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Section list - hidden on mobile when not active */}
        <div className={`${activeTab === 'sidebar' ? 'flex' : 'hidden'} lg:flex`}>
          <Sidebar />
        </div>
        
        {/* Editor - Form inputs - hidden on mobile when not active */}
        <div className={`${activeTab === 'editor' ? 'flex' : 'hidden'} lg:flex flex-1`}>
          <Editor />
        </div>
        
        {/* Preview - Live CV display - hidden on mobile when not active */}
        <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex`}>
          <Preview ref={previewRef} onExportPDF={handleExportPDF} />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CVProvider>
      <AppContent />
    </CVProvider>
  );
};

export default App;
