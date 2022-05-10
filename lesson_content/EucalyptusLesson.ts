/**
 * Lesson content for the Eucalyptus Lesson
 */
import type {Lesson} from './lessonTypes';

const PLACEHOLDER_FILENAME = '';

export const EucalyptusLesson: Lesson = {
  lessonID: 'eucalyptus',
  elements: [
    {
      __type: 'InformationalElement',
      messages: [
        'Great! you will learn about eucalyptus trees (copy about overarching goal). Ask any questions during the lesson by tapping the question button on the top right.',
      ],
      imageFilenames: [require('assets/images/GettyImages-480806545.jpeg')],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Eucalyptus trees are native to Australia and the islands surrounding it. Famously, these trees are home to koalas in Australia. Their diet consists almost solely of eucalyptus leaves!',
      ],
      imageFilenames: [require('assets/images/GettyImages-153500925.jpeg')],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Take a look at this map of the distribution of eucalyptus trees in the United States. You’ll notice that there’s a huge concentration of eucalyptus in California specifically',
      ],
      imageFilenames: [require('assets/images/usmap-placeholder.jpg')],
    },
    {
      __type: 'ImageCaptureElement',
      messages: [
        'What else makes eucalyptus trees unique? First, let’s take a closer look at their leaves. Take three close-up photos of their leaves for your records.',
      ],
      imageFilenames: [require('assets/images/GettyImages-480806545.jpeg')],
      imagesCapturesRequired: 1,
      afterCaptureMessages: [
        'How would you describe these leaves? Please record your thoughts through typing or audio.',
      ],
    },
  ],
};
