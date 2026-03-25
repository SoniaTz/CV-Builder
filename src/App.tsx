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

      {/* Mobile Export Button - visible on small screens */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-full font-medium shadow-lg hover:bg-blue-600 transition-colors touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{t.exportPdf}</span>
        </button>
      </div>

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
