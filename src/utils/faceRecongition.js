import * as faceapi from "face-api.js";

let modelsLoaded = false;

export const loadFaceModels = async () => {
  if (modelsLoaded) return;

  const MODEL_URL = "/models";

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

  modelsLoaded = true;

  console.log("✅ Face models loaded");
};

export const getFaceDescriptor = async (image) => {
  const detection = await faceapi
    .detectSingleFace(
      image,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return null;

  return Array.from(detection.descriptor);
};