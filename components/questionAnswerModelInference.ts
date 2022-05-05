import {torch, text} from 'react-native-pytorch-core';
import ModelCache from './ModelCache';

const spec = require('../assets/specs/bert_model_spec.json');

export default async function findAnswer(textString: string, question: string) {
  const MODEL_KEY = 'bertQA';
  const {WordPieceTokenizer} = text;
  const tokenizer = new WordPieceTokenizer({
    vocab: spec.vocabulary_bert,
  });
  const model =
    'https://github.com/pytorch/live/releases/download/v0.1.0/bert_qa.ptl';
  const inputText = `[CLS] ${question} [SEP] ${textString} [SEP]`;
  const arr = tokenizer.encode(inputText);
  const t = torch.tensor([arr], {dtype: torch.int});
  const modelPath = await ModelCache.getModelPath(MODEL_KEY);
  const nlpModel = await torch.jit._loadForMobile(modelPath);
  const output = await nlpModel.forward(t);
  const startId = output
    .toGenericDict()
    .start_logits.toTensor()
    .argmax()
    .item();
  const endId = output.toGenericDict().end_logits.toTensor().argmax().item();
  const res = tokenizer.decode(arr.slice(startId, endId + 1));
  return {text: res};
}
