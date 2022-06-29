import {Audio, media, Tensor, torch} from 'react-native-pytorch-core';
import * as ModelCache from './ModelCache';
import ModelURLs from '../constants/ModelURLs';

export default async function translate(audio: Audio) {
  const MODEL_KEY = 'wav2vec';
  if (audio != null) {
    const modelPath = await ModelCache.getModelPath(ModelURLs[MODEL_KEY]);

    // Convert the audio data to a blob
    const blob = media.toBlob(audio);

    // Get a tensor of shorts (int16) for the audio data
    const tensor = torch.fromBlob(blob, [1, blob.size / 2], {
      dtype: 'int16',
    });

    // Convert the tensor to a float tensor since the Wav2Vec model requires the input
    // tensor in float32 format
    const floatTensor = tensor.to({dtype: 'float32'});

    // Load the model
    const speechModel = await torch.jit._loadForMobile(modelPath);

    // Run inference with the given tensor
    const result = await speechModel.forward<Tensor, string>(floatTensor);
    return {text: result.toLowerCase()};
  }
  return {text: ''};
}
