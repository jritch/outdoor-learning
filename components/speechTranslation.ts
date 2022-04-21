import {Audio, MobileModel} from 'react-native-pytorch-core';

export default async function translate(audio: Audio) {
  const model =
    'https://github.com/pytorch/live/releases/download/v0.1.0/wav2vec2.ptl';
  var translatedText = undefined;
  var modelRunMetrics = undefined;
  if (audio != null) {
    const {
      result: {answer},
      metrics: m,
    } = await MobileModel.execute(model, {audio});
    translatedText = answer;
    modelRunMetrics = m;
  }
  return {text: translatedText.toLowerCase(), metrics: modelRunMetrics};
}
