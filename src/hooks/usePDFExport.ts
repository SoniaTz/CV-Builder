import { useCallback, type RefObject } from 'react';

export const usePDFExport = () => {
  const exportToPDF = useCallback(async (event: React.MouseEvent, elementRef: RefObject<HTMLDivElement | null>, fileName: string = 'cv') => {
    event.preventDefault();
    event.stopPropagation();
    
    try {
      const element = elementRef.current;
      
      if (!element) {
        console.error('Element ref is not available');
        alert('Error: Element ref is not available');
        return;
      }
      
      // Clone the element to modify it for PDF export
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Remove transform and scale styles that were used for preview
      clonedElement.style.transform = 'none';
      clonedElement.style.transformOrigin = 'top left';
      clonedElement.style.marginBottom = '0';
      clonedElement.style.position = 'relative';
      clonedElement.style.left = 'auto';
      
      // Set proper A4 dimensions
      clonedElement.style.width = '210mm';
      clonedElement.style.minHeight = '297mm';
      clonedElement.style.maxWidth = '210mm';
      
      // Get all stylesheets from the document
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('\n');
          } catch {
            return '';
          }
        })
        .join('\n');
      
      // Create a complete HTML document with styles
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              width: 210mm;
              min-height: 297mm;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 11pt;
              line-height: 1.5;
              color: #111827;
              background: white;
            }
            ${styles}
          </style>
        </head>
        <body>
          ${clonedElement.outerHTML}
        </body>
        </html>
      `;
      
      console.log('Sending HTML to PDF server, length:', html.length);
      
      const response = await fetch('/api/convert-to-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, fileName })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate PDF');
      }
      
      console.log('PDF generated:', result.filePath);
      window.open(`/api/download-pdf/${result.fileName}`, '_blank');
      
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error exporting to PDF: ' + (error as Error).message);
    }
  }, []);

  return { exportToPDF };
};
