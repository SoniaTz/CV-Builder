import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;
const PDF_DIR = path.join(__dirname, 'pdfs');

if (!fs.existsSync(PDF_DIR)) {
  fs.mkdirSync(PDF_DIR);
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/convert-to-pdf', async (req, res) => {
  const { html, fileName } = req.body;
  
  if (!html) {
    return res.status(400).json({ error: 'HTML content is required' });
  }
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1
    });
    
    await page.setContent(html, {
      waitUntil: ['networkidle0', 'domcontentloaded']
    });
    
    // Add target="_blank" to all links
    await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });
    });
    
    await page.evaluate(async () => {
      return document.fonts.ready;
    });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });
    
    await browser.close();
    
    const timestamp = Date.now();
    const safeFileName = (fileName || 'cv').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filePath = path.join(PDF_DIR, `${safeFileName}_${timestamp}.pdf`);
    
    fs.writeFileSync(filePath, pdf);
    
    console.log(`PDF saved to: ${filePath}`);
    
    res.json({ 
      success: true, 
      filePath: filePath,
      fileName: `${safeFileName}_${timestamp}.pdf`
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF: ' + error.message });
  }
});

app.get('/api/download-pdf/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(PDF_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`PDF conversion server running on http://localhost:${PORT}`);
  console.log(`PDFs will be saved to: ${PDF_DIR}`);
});
