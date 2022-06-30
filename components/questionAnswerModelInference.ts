import {torch, text, Tensor} from 'react-native-pytorch-core';
import * as ModelCache from './ModelCache';
import ModelURLs from '../constants/ModelURLs';

const spec = require('../assets/specs/bert_model_spec.json');

export default async function findAnswer(textString: string, question: string) {
  function process(answer: string) {
    // Answers with tokens present in them imply no valid answer found.
    if (answer.indexOf('[SEP]') >= 0 || answer.indexOf('[CLS]') >= 0) {
      return '';
    }
    return answer;
  }

  const {WordPieceTokenizer} = text;
  const tokenizer = new WordPieceTokenizer({
    vocab: spec.vocabulary_bert,
  });

  const inputText = `[CLS] ${question} [SEP] ${textString} [SEP]`;
  const arr = tokenizer.encode(inputText);
  const t = torch.tensor([arr], {dtype: torch.int});

  const modelPath = await ModelCache.getExpoAssetPathWithoutSchema(
    require('../assets/models/bert_qa.ptl'),
  );
  const nlpModel = await torch.jit._loadForMobile(modelPath);
  const output = await nlpModel.forward<Tensor, {[key: string]: Tensor}>(t);
  const startId = output.start_logits.argmax().item();
  const endId = output.end_logits.argmax().item();
  const res = tokenizer.decode(arr.slice(startId, endId + 1));
  return {text: process(res)};
}
