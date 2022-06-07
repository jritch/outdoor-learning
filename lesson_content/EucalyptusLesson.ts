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
        'Great! you will learn about eucalyptus trees and their connection to the Bay Area. Ask any questions during the lesson by tapping the question button on the top right.',
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
        'Take a look at this map of the distribution of eucalyptus trees in the United States. You’ll notice that there’s a huge concentration of eucalyptus in California specifically.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-map.png',
        },
      ],
    },

    {
      __type: 'QuizElement',
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-map.png',
        },
      ],
      messages: [
        'So if eucalyptus trees are originally from Australia, how do you think they ended up all the way here in California?',
      ],
      possibleAnswers: [
        {
          option: 'Their seeds spread here by wind.',
          response:
            'Not quite! California is too far away from Australia for that to be possible. Humans actually brought them here.',
        },
        {
          option: 'Their seeds floated across the ocean.',
          response:
            'Not quite! Some seeds, like coconuts, are adapted to long-distance travel over water, but not eucalyptus. Humans actually brought them here.',
        },
        {
          option: 'Humans brought them here.',
          response: 'That is correct!',
        },
      ],
      correctAnswerIndex: 2,
    },
    {
      __type: 'InformationalElement',
      messages: [
        'During the Gold Rush (circa 1850), settlers needed a lot of wood to build settlements and burn for fuel. Some of these settlers came from Australia, and they brought eucalyptus seeds with them to plant in California.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/gold-rush.jpg',
        },
      ],
    },
    // TODO (alan): update eucalyptus height video to youtube and embed here
    {
      __type: 'ImageCaptureElement',
      messages: [
        'What else makes eucalyptus trees unique? First, let’s take a closer look at their leaves. Take a close-up photo of their leaves for your records.',
      ],
      imagesCapturesRequired: 1,
      afterCaptureMessages: [
        'How would you describe these leaves? Please record your thoughts through typing or audio.',
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'You may have noticed that eucalyptus leaves are long and thin, with a slight bulge in the middle. In botany, this is called a lanceoate (lan-see-uh-lit) leaf—shaped like the head of a lance (the weapon).',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-leaf@3x.png',
        },
      ],
    },
    {
      __type: 'NoteTakingElement',
      messages: [
        'But there’s something else that’s special about eucalyptus leaves. Look for a fresh, green leaf on the tree and pick it off the tree. Then, break it in half and sniff it. What do you notice? Please record your thoughts.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-leaf@3x.png',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Did you notice a pungent medicinal aroma coming from the leaf? This is because these leaves contain eucalyptus oil, which has a distinctive scent. It’s a natural insect repellent and fungicide.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-oil@4x.png',
        },
      ],
    },
    {
      __type: 'ImageCaptureElement',
      messages: [
        'Next, let’s take a closer look at the bark. Go ahead and take a close-up photo of the bark on the tree’s trunk.',
      ],
      imagesCapturesRequired: 1,
      afterCaptureMessages: [
        'How would you describe eucalyptus bark? Please record your thoughts.',
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Many eucalyptus trees shed their bark in long strips and flakes. There are a few reasons for this. Because eucalyptus trees grow so quickly, their bark needs to come off as the tree grows thicker—similar to how reptiles molt their skin. Also, shedding bark helps get rid of moss, fungi, and other parasites that like to grow on the surface of trees.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-trunk.jpg',
        },
      ],
    },
    // TODO (alan): need a clearer prompt for triggering the overlay
    {
      __type: 'LiveCameraWithAROverlayElement',
      messages: [
        'Unfortunately, these unique properties of eucalyptus trees’ leaves and bark also lead them being extremely flammable. Point your camera to the tree and take a look at the ground around the base of the tree. Notice the dry leaves and bark that pile up there. This, combined with the oil in eucalyptus leaves, means that eucalyptus trees catch fire easily.',
      ],
    },
    // TODO (alan): find video and add YouTubeEmbedElement for australian bushfires
    {
      __type: 'InformationalElement',
      messages: [
        'Much like Australia, California is prone to wildfires. Because of this, eucalyptus trees in the Bay Area are a subject of intense debate.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/debate-both@3x.png',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        '“We should get rid of eucalyptus trees! They’re a non-native species that contribute to wildfires.”',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/debate-anti@3x.png',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        '“Trees actually don’t play a large role in wildfires in California, compared to grasses and bushes. These trees are an important part of our local history and heritage!”',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/debate-pro@3x.png',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Some debate about the aesthetics of the tree. Some think they’re an eyesore in towns like Palo Alto, especially because of all the dry leaves and bark that accumulate around them.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-litter.png',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Others enjoy their distinctive look. Leland and Jane Stanford, founders of Stanford University, loved these trees and planted thousands of them across campus.',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/leland-jane-stanford.JPG',
        },
      ],
    },
    {
      __type: 'NoteTakingElement',
      messages: [
        'What’s your take on the debate? Do you think eucalyptus trees in Palo Alto should be removed, or do you think they should be kept?',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-campus-1.jpg',
        },
      ],
    },
    {
      __type: 'InformationalElement',
      messages: [
        'Congratulations on completing the lesson! Next time you take a walk around the neighborhood, be on the lookout for eucalyptus trees. You’ll be surprised how many you find!',
      ],
      imageSources: [
        {
          uri: 'https://github.com/jritch/outdoor-learning/releases/download/v0.0.1-alpha/eucalyptus-campus-2.jpg',
        },
      ],
    },
  ],
};
