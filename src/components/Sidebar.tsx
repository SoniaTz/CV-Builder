import React from 'react';
import { useCV } from '../context/CVContext';
import { SECTIONS, LANGUAGES, FONTS, TRANSLATIONS } from '../types';
import type { Language, FontType } from '../types';

// Sidebar component - displays sections list
const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, cvData, resetCV, language, setLanguage, reorderSections, font, setFont, fontSize, setFontSize, titleSize, setTitleSize, color, setColor, textColor, setTextColor, titleMarginTop, setTitleMarginTop, sectionTitleMarginTop, setSectionTitleMarginTop, t } = useCV();

  // Move section up in order
  const moveSectionUp = (index: number) => {
    if (index <= 0) return;
    const newOrder = [...cvData.sectionOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    reorderSections(newOrder);
  };

  // Move section down in order
  const moveSectionDown = (index: number) => {
    if (index >= cvData.sectionOrder.length - 1) return;
    const newOrder = [...cvData.sectionOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    reorderSections(newOrder);
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">CV Builder</h1>
        <p className="text-sm text-gray-500 mt-1">{t.createCV}</p>
      </div>



      {/* Language Selector */}
      <div className="p-2 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          {t.language}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="w-full px-2 py-1.5 text-xs rounded border border-gray-200 bg-white text-gray-900"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>

      {/* Font Selector */}
      <div className="p-2 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          {t.font}
        </label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value as FontType)}
          className="w-full px-2 py-1.5 text-xs rounded border border-gray-200 bg-white text-gray-900"
        >
          {FONTS.map((fnt) => (
            <option key={fnt.id} value={fnt.id} style={{ fontFamily: fnt.family }}>
              {fnt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Size & Color Selector */}
      <div className="p-2 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          {t.fontTitleSize}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min="8"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value) || 12)}
            className="w-1/3 px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-900"
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-gray-200"
            title="Text Color"
          />
          <input
            type="number"
            min="12"
            max="36"
            value={titleSize}
            onChange={(e) => setTitleSize(parseInt(e.target.value) || 18)}
            className="w-1/3 px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-900"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-gray-200"
            title="Title Color"
          />
        </div>
      </div>

      {/* Title & Section Margin */}
      <div className="p-2 border-b border-gray-200">
        <label className="text-xs font-medium text-gray-500 mb-1 block">
          {t.titleMarginTop || 'Title Margin Top'}
        </label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min="0"
            max="48"
            value={titleMarginTop}
            onChange={(e) => setTitleMarginTop(parseInt(e.target.value) || 16)}
            className="w-1/2 px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-900"
            placeholder="Header"
          />
          <input
            type="number"
            min="0"
            max="48"
            value={sectionTitleMarginTop}
            onChange={(e) => setSectionTitleMarginTop(parseInt(e.target.value) || 8)}
            className="w-1/2 px-2 py-1 text-xs rounded border border-gray-200 bg-white text-gray-900"
            placeholder="Sections"
          />
        </div>
      </div>

      {/* Sections List */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {cvData.sectionOrder.map((sectionId, index) => {
            const section = SECTIONS.find(s => s.id === sectionId);
            const translations = TRANSLATIONS[language];
            if (!section) return null;
            
            const isActive = activeSection === section.id;
            const hasContent = section.id === 'personalInfo' 
              ? cvData.personalInfo.fullName || cvData.personalInfo.email
              : cvData[section.id as keyof typeof cvData] && 
                (cvData[section.id as keyof typeof cvData] as unknown[]).length > 0;

            return (
              <li key={section.id} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{translations[section.id as keyof typeof translations] || section.title}</span>
                  {hasContent && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-blue-500"></span>
                  )}
                </button>
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveSectionUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveSectionDown(index)}
                    disabled={index === cvData.sectionOrder.length - 1}
                    className="p-1 text-gray-400 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Reset Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={resetCV}
          className="w-full py-2 px-4 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          Reset CV
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;