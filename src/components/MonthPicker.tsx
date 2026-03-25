import React from 'react';
import { useCV } from '../context/CVContext';

// Custom Month Picker component with Ongoing option
const MonthPicker: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showOngoing?: boolean;
}> = ({ label, value, onChange, placeholder = '', showOngoing = false }) => {
  const { language, t } = useCV();
  
  const months: Record<string, string[]> = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    el: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - 20 + i);
  const lang = (language || 'en') as keyof typeof months;
  const monthList = months[lang] || months.en;
  
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOngoing, setIsOngoing] = React.useState(value === 'ongoing');
  
  // Parse value to get initial month and year
  const parseValue = (val: string) => {
    if (val && val.includes('-')) {
      const parts = val.split('-');
      if (parts.length >= 2) {
        return { year: parts[0], month: parts[1] };
      }
    }
    return { year: '', month: '' };
  };
  
  const { year: initialYear, month: initialMonth } = parseValue(value);
  
  // Use state to track selected year and month locally
  const [selectedYear, setSelectedYear] = React.useState(initialYear || currentYear.toString());
  const [selectedMonth, setSelectedMonth] = React.useState(initialMonth);
  
  // Update state when value prop changes
  React.useEffect(() => {
    if (value === 'ongoing') {
      setIsOngoing(true);
    } else {
      setIsOngoing(false);
      const { year, month } = parseValue(value);
      if (year) setSelectedYear(year);
      if (month) setSelectedMonth(month);
    }
  }, [value]);
  
  const handleMonthChange = (monthIndex: number) => {
    const month = (monthIndex + 1).toString().padStart(2, '0');
    setSelectedMonth(month);
    setIsOngoing(false);
    onChange(`${selectedYear}-${month}`);
    setIsOpen(false);
  };
  
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setIsOngoing(false);
    const month = selectedMonth || '01';
    onChange(`${year}-${month}`);
  };
  
  const handleOngoingChange = (checked: boolean) => {
    setIsOngoing(checked);
    if (checked) {
      onChange('ongoing');
    } else {
      onChange('');
    }
  };
  
  // Build display value from current state
  const displayValue = (() => {
    if (isOngoing) {
      return t.ongoing || 'Ongoing';
    }
    if (!selectedMonth || !selectedYear) return '';
    const monthIndex = parseInt(selectedMonth) - 1;
    if (monthIndex < 0 || monthIndex >= monthList.length) return '';
    return `${monthList[monthIndex]} ${selectedYear}`;
  })();
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-left flex justify-between items-center"
        >
          <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
            {displayValue || placeholder || 'Select month and year'}
          </span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
            <div className="mb-3">
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {monthList.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthChange(index)}
                  className={`px-2 py-2 text-sm rounded-lg transition-colors ${
                    selectedMonth === (index + 1).toString().padStart(2, '0')
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {month.substring(0, 3)}
                </button>
              ))}
            </div>
            {showOngoing && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOngoing}
                    onChange={(e) => handleOngoingChange(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{t.ongoing || 'Ongoing'}</span>
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthPicker;
