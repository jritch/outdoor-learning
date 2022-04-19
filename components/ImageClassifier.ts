import {
    Image,
    MobileModel,
    torch,
    torchvision,
    media,
    Module,
  } from 'react-native-pytorch-core';

  // Alias for torchvision transforms
  const T = torchvision.transforms;

  // Load the model file and the associated classes returned as inference
  const MODEL_URL = "https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/classifier.ptl";
  const IMAGE_CLASSES = [
      "background",
      "eucalyptus tree",
      "other tree"
  ]

  // 4. Variable to hold a reference to the loaded ML model
  let model: Module | null = null;

  // The classifyImage function that will process an image and return the top
  // class label
  export default async function classifyImage(image: Image) {
    // Get image width and height
    const width = image.getWidth();
    const height = image.getHeight();

    // Convert image to blob, which is a byte representation of the image
    // in the format height (H), width (W), and channels (C), or HWC for short
    const blob = media.toBlob(image);

    // Get a tensor from image the blob and also define in what format
    // the image blob is.
    let tensor = torch.fromBlob(blob, [height, width, 3]);

    // Rearrange the tensor shape to be [CHW]
    tensor = tensor.permute([2, 0, 1]);

    // Divide the tensor values by 255 to get values between [0, 1]
    tensor = tensor.div(255);

    // Crop the image in the center to be a squared image
    const centerCrop = T.centerCrop(Math.min(width, height));
    tensor = centerCrop(tensor);

    // Resize the image tensor to 3 x 224 x 224
    const resize = T.resize(224);
    tensor = resize(tensor);

    // Normalize the tensor image with mean and standard deviation
    const normalize = T.normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]);
    tensor = normalize(tensor);

    // Unsqueeze adds 1 leading dimension to the tensor
    tensor = tensor.unsqueeze(0);

    // 5. If the model has not been loaded already, it will be downloaded from
    // the URL and then loaded into memory.
    if (model == null) {
      const filePath = await MobileModel.download(MODEL_URL);
      model = await torch.jit._loadForMobile(filePath);
    }

    // 6. Run the ML inference with the pre-processed image tensor
    const result = await model.forward(tensor);

    // 7. Get the inference result as a tensor
    const resultTensor = result.toTensor();

    // 8. Get the index of the value with the highest probability
    const maxIdx = resultTensor.argmax();

    // 9. Resolve the most likely class label and return it
    return IMAGE_CLASSES[maxIdx];
  }
