import {MobileModel} from 'react-native-pytorch-core';

export default async function findAnswer(text: string, question: string) {
  const model =
    'https://github.com/pytorch/live/releases/download/v0.1.0/bert_qa.ptl';
  var answer = undefined;
  var modelRunMetrics = undefined;
  const inputText = `[CLS] ${question} [SEP] ${text} [SEP]`;
  if (text != null && question != null) {
    const {
      result: {answer: ans},
      metrics: m,
    } = await MobileModel.execute(model, {text: inputText});
    if (ans != null) {
      answer = ans;
      modelRunMetrics = m;
    }
  }
  return {text: answer, metrics: modelRunMetrics};
}
