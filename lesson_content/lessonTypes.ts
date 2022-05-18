import {ImageSourcePropType} from 'react-native';

/**
import { ImageSourcePropType } from 'react-native';
 * A lesson is a sequence of elements: informational, interactive, quizzes, etc
 */
export type Lesson = {
  lessonID: string;
  elements: Array<
    | TitleElement
    | InstructionalElement
    | ObjectFinderElement
    | ImageCaptureElement
    | YouTubeEmbedElement
    | InformationalElement
    | QuizElement
    | NoteTakingElement
    | LiveCameraWithAROverlayElement
  >;
};

export type Messages = Array<string>;

/**
 * Images should be specified as either a direct require statement to a local asset
 * or as a ImageSource URI object. Example:
 *
 *    imageSources: [
        require('assets/images/GettyImages-480806545.jpeg'),
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/microphone_active.png',
        },
      ],
 *
 */
type ImageReference = ImageSourcePropType;

export interface GenericElement {
  __type: string;
}

export interface GenericElementWithImages extends GenericElement {
  imageSources: Array<ImageReference> | null;
}

/**
 * An Informational element simply displays 1+ pictures and provides 1+ messages of information
 */
export interface InformationalElement extends GenericElementWithImages {
  __type: 'InformationalElement';
  messages: Messages;
}

/**
 * An Image Capture element prompts the user to capture 1+ images for their journal,
 * but does not run any ML models on them
 */
export interface ImageCaptureElement extends GenericElement {
  __type: 'ImageCaptureElement';
  messages: Messages;
  imagesCapturesRequired: number;
  afterCaptureMessages: Messages;
}

/**
 * This element shows a live camera view that displays an AR overlay of fire
 * when the correct object is detected
 */
export interface LiveCameraWithAROverlayElement extends GenericElement {
  __type: 'LiveCameraWithAROverlayElement';
  messages: Messages;
}

/**
 * A YouTube embed element shows an embedded youtube video with messages below it
 */
export interface YouTubeEmbedElement extends GenericElementWithImages {
  __type: 'YouTubeEmbedElement';
  youTubeURL: string;
  messages: Messages;
}

/**
 * A quiz element shows the message and provides the possible answers.
 * If the correct answer is chosen we say something like "That is correct!"
 * If the wrong answer is chosen we say "That is incorrect", and then in the next
 * message we provide the correct answer.
 */
export interface QuizElement extends GenericElementWithImages {
  __type: 'QuizElement';
  messages: Messages;
  possibleAnswers: Array<{option: string; response: string}>;
  correctAnswerIndex: number;
}

/**
 * A NoteTaking element shows one or more images and prompts the user to record
 * their observations through typing or speech to text.
 */
export interface NoteTakingElement extends GenericElementWithImages {
  __type: 'NoteTakingElement';
  messages: Messages;
}

/**
 * ****************************************************************************************
 * Unused elements
 * ****************************************************************************************
 */

/**
 * A Title element shows a title with a large picture and a start button
 */
export interface TitleElement extends GenericElement {
  __type: 'TitleElement';
  title: string;
  imageFilename: ImageReference;
}

/**
 * An Instructional element shows text followed by a picture 1+ times
 */
export interface InstructionalElement extends GenericElement {
  __type: 'InstructionalElement';
  instructions: Array<{message: string; imageFilename: ImageReference}>;
}

/**
 * An ObjectFinder element is the initial element in the lesson where a user is prompted to find
 * something and get a positive match from the image classifier using the camera. Once found we
 * show the success messages and prompt Yes/No to enter the lesson.
 */
export interface ObjectFinderElement extends GenericElement {
  __type: 'ObjectFinderElement';
  initialMessages: Messages;
  targetClassifierResult: string;
  failureMessages: Messages;
  successMessages: Messages;
}
