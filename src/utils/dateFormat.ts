// Date formatting utilities for localization

const MONTHS: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  el: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
};

const MONTHS_SHORT: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  el: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαϊ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
};

export type Language = 'en' | 'el' | 'es' | 'fr' | 'de';

/**
 * Format a date string (YYYY-MM) to localized format
 * @param dateStr - Date string in YYYY-MM format
 * @param lang - Language code
 * @param short - Use short month format
 * @returns Formatted date string
 */
export function formatDate(dateStr: string, lang: Language = 'en', short: boolean = true): string {
  if (!dateStr) return '';
  
  // Handle 'ongoing' case
  if (dateStr === 'ongoing') {
    const ongoingTranslations: Record<Language, string> = {
      en: 'Ongoing',
      el: 'Συνεχίζεται',
      es: 'En curso',
      fr: 'En cours',
      de: 'Laufend',
    };
    return ongoingTranslations[lang];
  }
  
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  
  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return dateStr;
  
  const months = short ? (MONTHS_SHORT[lang] || MONTHS_SHORT.en) : (MONTHS[lang] || MONTHS.en);
  return `${months[monthIndex]} ${year}`;
}

/**
 * Format a date range
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format (or 'present')
 * @param lang - Language code
 * @returns Formatted date range string
 */
export function formatDateRange(startDate: string, endDate: string, lang: Language = 'en'): string {
  const start = formatDate(startDate, lang);
  const ongoingTranslations: Record<Language, string> = {
    en: 'Ongoing',
    el: 'Συνεχίζεται',
    es: 'En curso',
    fr: 'En cours',
    de: 'Laufend',
  };
  const end = endDate === 'present' || endDate === 'ongoing' 
    ? ongoingTranslations[lang] 
    : formatDate(endDate, lang);
  return `${start} - ${end}`;
}
