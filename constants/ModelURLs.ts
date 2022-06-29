type ModelKeys = 'eucalyptusClassifier' | 'wav2vec' | 'bertQA';

const MODEL_URLS: {[key in ModelKeys]: string} = {
  eucalyptusClassifier:
    'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/classifier.ptl',
  wav2vec:
    'https://github.com/pytorch/live/releases/download/v0.1.0/wav2vec2.ptl',
  bertQA:
    'https://github.com/pytorch/live/releases/download/v0.1.0/bert_qa.ptl',
};

export default MODEL_URLS;
