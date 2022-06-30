type ModelKeys = 'eucalyptusClassifier' | 'wav2vec' | 'bertQA';

const modelAssets: {[key in ModelKeys]: number} = {
  eucalyptusClassifier: require('../assets/models/classifier.ptl'),
  wav2vec: require('../assets/models/wav2vec2.ptl'),
  bertQA: require('../assets/models/bert_qa.ptl'),
};

export default modelAssets;
