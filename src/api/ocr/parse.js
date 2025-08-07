// src/api/ocr/parse.js
import Tesseract from 'tesseract.js';

/**
 * Parses the uploaded image using OCR and returns structured NEET-style question data.
 * Handles diagrams as separate attachments and links them to question entries.
 * @param {File} file - Uploaded image or PDF file.
 * @returns {Promise<Array>} Extracted question objects with metadata.
 */
export function parseUploadedFile(file) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    )
      .then(({ data: { text } }) => {
         console.log("Raw OCR text:", text);
        const extractedQuestions = extractQuestionsFromText(text);
        resolve(extractedQuestions);
      })
      .catch((error) => {
        console.error('OCR Error:', error);
        reject(error);
      });
  });
}

/**
 * Parses plain OCR text into NEET-style structured question format.
 * @param {string} text - Raw OCR output text.
 * @returns {Array<Object>} Parsed question objects.
 */
function extractQuestionsFromText(text) {
  const lines = text.split('\n');
  const questions = [];
  let current = null;

  for (let line of lines) {
    line = line.trim();
    if (/^\d+\./.test(line)) {
      if (current) questions.push(current);
      current = { question: line, options: [], correct: null, diagram_attachment: null };
    } else if (/^[A-D][).]/.test(line)) {
      current?.options?.push(line);
    } else if (/^Answer[:\s]/i.test(line)) {
      current.correct = line.replace(/^Answer[:\s]*/i, '').trim();
    } else if (/\.(jpg|png|jpeg|webp)/i.test(line)) {
      current.diagram_attachment = line;
    } else if (current && line) {
      current.question += ' ' + line;
    }
  }

  if (current) questions.push(current);

  return questions;
}
