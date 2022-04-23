/**
 * Lesson content for the Eucalyptus Lesson
 */
import type {Lesson} from './lessonTypes';

const PLACEHOLDER_FILENAME = '';

export const EucalyptusLesson: Lesson = {
  lessonID: 'eucalyptus',
  elements: [
    {
      __type: 'TitleElement',
      title: 'Learn about eucalyptus trees guided by audio.',
      imageFilename: PLACEHOLDER_FILENAME,
    },
    {
      __type: 'InstructionalElement',
      instructions: [
        {
          message:
            'Try using the shape of the leaves to help you identify eucalyptus.',
          imageFilename: PLACEHOLDER_FILENAME,
        },
        {
          message:
            'You might also notice that eucalyptus has a distinctive bark pattern. See if you can use the bark and the leaves to identify eucalyptus.',
          imageFilename: PLACEHOLDER_FILENAME,
        },
      ],
    },
    {
      __type: 'ObjectFinderElement',
      initialMessages: [
        'Go find and scan a eucalyptus tree to start the lesson',
      ],
      targetClassifierResult: '[PLACEHOLDER] Eucalyptus Tree', // TODO: add correct classifier output
      failureMessages: [
        "This doesn't seem like a eucalyptus tree. Keep searching.",
      ],
      successMessages: [
        "Great job! You've found a eucalyptus tree.",
        'Would you like to learn about the tree?',
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Great! you will learn about eucalyptus trees (copy about overarching goal). Ask any questions during the lesson by tapping the question button on the top right.',
      ],
      imageFilenames: [PLACEHOLDER_FILENAME],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Eucalyptus trees are native to Australia and the islands surrounding it. Famously, these trees are home to koalas in Australia. Their diet consists almost solely of eucalyptus leaves!',
      ],
      imageFilenames: [PLACEHOLDER_FILENAME],
    },
  ],
};
