import Tesseract from 'tesseract.js';

const worker = Tesseract.createWorker();

const recognize = async (imagePath) => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();

  return text;
};

export default recognize;