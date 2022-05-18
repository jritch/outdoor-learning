/**
 * Lesson content for the Eucalyptus Lesson
 */
import type {Lesson} from './lessonTypes';

export const EucalyptusLesson: Lesson = {
  lessonID: 'eucalyptus',
  elements: [
    {
      __type: 'InformationalElement',
      messages: [
        'Great! you will learn about eucalyptus trees (copy about overarching goal). Ask any questions during the lesson by tapping the question button on the top right.',
      ],
      imageSources: [require('assets/images/GettyImages-480806545.jpeg')],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Eucalyptus trees are native to Australia and the islands surrounding it. Famously, these trees are home to koalas in Australia. Their diet consists almost solely of eucalyptus leaves!',
      ],
      imageSources: [require('assets/images/GettyImages-153500925.jpeg')],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Take a look at this map of the distribution of eucalyptus trees in the United States. You’ll notice that there’s a huge concentration of eucalyptus in California specifically',
      ],
      imageSources: [require('assets/images/usmap-placeholder.jpg')],
    },
    {
      __type: 'LiveCameraWithAROverlayElement',
      messages: [
        'Unfortunately, these unique properties of eucalyptus trees’ leaves and bark also lead them being extremely flammable. Point your camera to the tree and take a look at the ground around the base of the tree. Notice the dry leaves and bark that pile up there. This, combined with the oil in eucalyptus leaves, means that eucalyptus trees catch fire easily.',
      ],
    },
    {
      __type: 'ImageCaptureElement',
      messages: [
        'What else makes eucalyptus trees unique? First, let’s take a closer look at their leaves. Take three close-up photos of their leaves for your records.',
      ],
      imagesCapturesRequired: 1,
      afterCaptureMessages: [
        'How would you describe these leaves? Please record your thoughts through typing or audio.',
      ],
    },
    {
      __type: 'QuizElement',
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/quiz-map-screenshot.jpg',
        },
      ],
      messages: [
        'So if eucalyptus trees are originally from Australia, how did they end up all the way here in California?',
      ],
      possibleAnswers: [
        {
          option: 'Their seeds spread here by wind',
          response: 'Nope. Not quite!',
        },
        {
          option: 'Their seeds floated across the ocean',
          response: 'That is correct! 🤓',
        },
      ],
      correctAnswerIndex: 1,
    },
  ],
};
