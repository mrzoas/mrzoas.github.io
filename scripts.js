/* Глобальные переменные */
const context = window.AudioContext ? new AudioContext() : new webkitAudioContext();

const controctave = {
  'C': 32.703,
  'C#': 34.648,
  'D': 36.708,
  'D#': 38.891,
  'E': 41.203,
  'F': 43.654,
  'F#': 46.249,
  'G': 48.999,
  'G#': 51.913,
  'A': 55,
  'A#': 58.27,
  'B': 61.735,
};

var UserSong = [
  {octave: 5, note: 'C'},
  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},
  {octave: 5, note: 'F'},
  {octave: 5, note: 'C'}
];

const ForestRaisedXmasTree = [
  {octave: 5, note: 'C'}, //
  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'F'},  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},  {octave: 5, note: 'A#'},  {octave: 5, note: 'G'},
  {octave: 6, note: 'C'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'C'},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},  {octave: 5, note: 'A#'},  {octave: 5, note: 'A#'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'F'},  {octave: 5, note: 'C'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'C'},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},  {octave: 5, note: 'A#'},  {octave: 5, note: 'A#'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'F'},  {octave: 5, note: 'C'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
];

const JingleBells = [
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'G'},  {octave: 5, note: 'C'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},  {octave: 5, note: 'E'},
  {octave: 5, note: 'D'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -2, note: ''},

  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'G'},  {octave: 5, note: 'C'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},  {octave: 5, note: 'F'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: 4, note: 'G'},  {octave: 5, note: 'E'},  {octave: 5, note: 'D'},  {octave: 5, note: 'C'},
  {octave: 4, note: 'G'},  {octave: -1, note: ''},  {octave: 4, note: 'G'},  {octave: 5, note: 'E'},
  {octave: 5, note: 'D'},  {octave: 5, note: 'C'},  {octave: 4, note: 'A'},  {octave: -1, note: ''},
  {octave: 4, note: 'A'},  {octave: 5, note: 'F'},  {octave: 5, note: 'E'},  {octave: 5, note: 'D'},
  {octave: 4, note: 'B'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},
  {octave: 5, note: 'F'},  {octave: 5, note: 'D'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 4, note: 'G'},  {octave: 5, note: 'E'},  {octave: 5, note: 'D'},  {octave: 5, note: 'C'},
  {octave: 4, note: 'G'},  {octave: -1, note: ''},  {octave: 4, note: 'G'},  {octave: 5, note: 'E'},
  {octave: 5, note: 'D'},  {octave: 5, note: 'C'},  {octave: 4, note: 'A'},  {octave: -1, note: ''},
  {octave: 4, note: 'A'},  {octave: 5, note: 'F'},  {octave: 5, note: 'E'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},  {octave: 5, note: 'F'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'G'},  {octave: 5, note: 'C'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},  {octave: 5, note: 'F'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
];

const DanceOfFairy = [
                                                    {octave: 6, note: 'G'},  {octave: 6, note: 'E'},
  {octave: 6, note: 'G'},  {octave: -1, note: ''},  {octave: 6, note: 'F#'},  {octave: -1, note: ''},
  {octave: 6, note: 'D#'},  {octave: -1, note: ''},  {octave: 6, note: 'E'},  {octave: -1, note: ''},
  {octave: 6, note: 'D'},  {octave: 6, note: 'D'},  {octave: 6, note: 'D'},  {octave: -1, note: ''},
  {octave: 6, note: 'C#'},  {octave: 6, note: 'C#'},  {octave: 6, note: 'C#'},  {octave: -1, note: ''},
  {octave: 6, note: 'C'},  {octave: 6, note: 'C'},  {octave: 6, note: 'C'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: 6, note: 'E'},  {octave: 6, note: 'C'},  {octave: 6, note: 'E'},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: 5, note: 'E'},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 6, note: 'C'},  {octave: -1, note: ''},  {octave: 5, note: 'B'},  {octave: -1, note: ''},
  {octave: 6, note: 'G'},  {octave: 6, note: 'G'},  {octave: 6, note: 'G'},  {octave: -1, note: ''},
  {octave: 6, note: 'F#'},  {octave: 6, note: 'F#'},  {octave: 6, note: 'F#'},  {octave: -1, note: ''},
  {octave: 6, note: 'E'},  {octave: 6, note: 'E'},  {octave: 6, note: 'E'},  {octave: -1, note: ''},
  {octave: 6, note: 'D#'},  {octave: 6, note: 'F#'},  {octave: 6, note: 'E'},  {octave: 6, note: 'F#'},
  {octave: 6, note: 'D#'},  {octave: -1, note: ''},  {octave: -2, note: ''},
  
  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'G'},  {octave: 6, note: 'E'},
  {octave: 6, note: 'G'},  {octave: -1, note: ''},  {octave: 6, note: 'F#'},  {octave: -1, note: ''},
  {octave: 6, note: 'D#'},  {octave: -1, note: ''},  {octave: 6, note: 'E'},  {octave: -1, note: ''},
  {octave: 6, note: 'D'},  {octave: 6, note: 'D'},  {octave: 6, note: 'D'},  {octave: -1, note: ''},
  {octave: 6, note: 'C#'},  {octave: 6, note: 'C#'},  {octave: 6, note: 'C#'},  {octave: -1, note: ''},
  {octave: 6, note: 'C'},  {octave: 6, note: 'C'},  {octave: 6, note: 'C'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: 6, note: 'E'},  {octave: 6, note: 'C'},  {octave: 6, note: 'E'},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'E'},  {octave: 6, note: 'C#'},
  {octave: 6, note: 'E'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'D'},  {octave: 5, note: 'B'},
  {octave: 6, note: 'D'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 6, note: 'C'},  {octave: 5, note: 'A'},
  {octave: 6, note: 'C'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 4, note: 'B'},  {octave: 5, note: 'F#'},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: 3, note: 'E'},
]

const WeWishYouAMerryChristmas = [
  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: 5, note: 'F#'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'A'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: 5, note: 'B'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: 5, note: 'B'},  {octave: 6, note: 'C'},
  {octave: 5, note: 'B'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: -2, note: ''},
  
  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},
  {octave: 6, note: 'D'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: -2, note: ''},
  
  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: -1, note: 'F#'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'A'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: 5, note: 'B'},
  {octave: 5, note: 'A'},  {octave: 5, note: 'G'},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: 5, note: 'B'},  {octave: 6, note: 'C'},
  {octave: 5, note: 'B'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'B'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: 5, note: 'A'},
  {octave: 5, note: 'G'},  {octave: 5, note: 'G'},
  {octave: 6, note: 'D'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'D'},  {octave: 5, note: 'D'},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F#'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''}
  

];

const AIWFCIY = [
  {octave: 5, note: 'G'},  {octave: 5, note: 'B'},  {octave: 6, note: 'D'},  {octave: 6, note: 'F#'},
  {octave: 6, note: 'G'},  {octave: 6, note: 'F#'},  {octave: 6, note: 'D'},  {octave: 5, note: 'B'},
  {octave: 5, note: 'G'},  {octave: 6, note: 'C'},  {octave: 6, note: 'D'},  {octave: 6, note: 'G'},
  {octave: 6, note: 'D'},  {octave: -1, note: ''},
];

const LIS = [
  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 6, note: 'C'},  {octave: -1, note: ''},
  {octave: 5, note: 'A#'}, {octave: -1, note: ''},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'G'},  {octave: -1, note: ''},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: 5, note: 'E'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},
];

const HappyBirthday = [
  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'}, {octave: -1, note: ''},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''}, {octave: -1, note: ''}, {octave: -1, note: ''},
  {octave: 5, note: 'C'}, {octave: 5, note: 'C'},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'}, {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 6, note: 'C'},  {octave: -1, note: ''},
  {octave: 5, note: 'A'}, {octave: -1, note: ''},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'A#'}, {octave: 5, note: 'A#'},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'}, {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},

  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'}, {octave: -1, note: ''},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''}, {octave: -1, note: ''}, {octave: -1, note: ''},
  {octave: 5, note: 'C'}, {octave: 5, note: 'C'},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'}, {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -1, note: ''},
  {octave: 5, note: 'C'},  {octave: 5, note: 'C'},  {octave: 6, note: 'C'},  {octave: -1, note: ''},
  {octave: 5, note: 'A'}, {octave: -1, note: ''},  {octave: 5, note: 'F'},  {octave: -1, note: ''},
  {octave: 5, note: 'E'},  {octave: -1, note: ''},  {octave: 5, note: 'D'},  {octave: -1, note: ''},
  {octave: 5, note: 'A#'}, {octave: 5, note: 'A#'},  {octave: 5, note: 'A'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'},  {octave: -1, note: ''},  {octave: 5, note: 'G'},  {octave: -1, note: ''},
  {octave: 5, note: 'F'}, {octave: -1, note: ''},  {octave: -1, note: ''},  {octave: -2, note: ''},
];

UserMap = new Map();
UserMap.set('R',   {octave: 5, note: 'F'});
UserMap.set('R\'', {octave: 4, note: 'A'});
UserMap.set('L',   {octave: 5, note: 'D'});
UserMap.set('L\'', {octave: 4, note: 'B'});
UserMap.set('U',   {octave: 5, note: 'E'});
UserMap.set('U\'', {octave: 6, note: 'F'});
UserMap.set('D',   {octave: 4, note: 'G'});
UserMap.set('D\'', {octave: 5, note: 'G'});
UserMap.set('B',   {octave: 5, note: 'C'});
UserMap.set('B\'', {octave: 5, note: 'A'});
UserMap.set('F',   {octave: 5, note: 'A#'});
UserMap.set('F\'', {octave: 6, note: 'C'});

JingleBellsMap = new Map();
JingleBellsMap.set('R',   {octave: 5, note: 'C'});
JingleBellsMap.set('R\'', {octave: 4, note: 'A'});
JingleBellsMap.set('L',   {octave: 5, note: 'D'});
JingleBellsMap.set('L\'', {octave: 4, note: 'B'});
JingleBellsMap.set('U',   {octave: 5, note: 'E'});
JingleBellsMap.set('U\'', {octave: 5, note: 'F'});
JingleBellsMap.set('D',   {octave: 4, note: 'G'});
JingleBellsMap.set('D\'', {octave: 5, note: 'G'});
JingleBellsMap.set('B',   {octave: 5, note: 'G#'});
JingleBellsMap.set('B\'', {octave: 5, note: 'A'});
JingleBellsMap.set('F',   {octave: 5, note: 'A#'});
JingleBellsMap.set('F\'', {octave: 6, note: 'C'});

DanceOfFairyMap = new Map();
DanceOfFairyMap.set('R',   {octave: 6, note: 'G'});
DanceOfFairyMap.set('R\'', {octave: 6, note: 'D#'});
DanceOfFairyMap.set('L',   {octave: 5, note: 'B'});
DanceOfFairyMap.set('L\'', {octave: 6, note: 'C'});
DanceOfFairyMap.set('U',   {octave: 6, note: 'E'});
DanceOfFairyMap.set('U\'', {octave: 6, note: 'F#'});
DanceOfFairyMap.set('D',   {octave: 6, note: 'D'});
DanceOfFairyMap.set('D\'', {octave: 6, note: 'C#'});
DanceOfFairyMap.set('B',   {octave: 5, note: 'F#'});
DanceOfFairyMap.set('B\'', {octave: 5, note: 'A'});
DanceOfFairyMap.set('F',   {octave: 5, note: 'G'});
DanceOfFairyMap.set('F\'', {octave: 5, note: 'E'});

WishYouMap = new Map();
WishYouMap.set('R',   {octave: 5, note: 'E'});
WishYouMap.set('R\'', {octave: 5, note: 'G'});
WishYouMap.set('L',   {octave: 6, note: 'D'});
WishYouMap.set('L\'', {octave: 6, note: 'C'});
WishYouMap.set('U',   {octave: 5, note: 'D'});
WishYouMap.set('U\'', {octave: 2, note: 'F#'});
WishYouMap.set('D',   {octave: 5, note: 'A'});
WishYouMap.set('D\'', {octave: 5, note: 'B'});
WishYouMap.set('B',   {octave: 2, note: 'F#'});
WishYouMap.set('B\'', {octave: 2, note: 'A'});
WishYouMap.set('F',   {octave: 5, note: 'F#'});
WishYouMap.set('F\'', {octave: 2, note: 'B'});

AIWFCIYMap = new Map();
AIWFCIYMap.set('R',   {octave: 6, note: 'D'});
AIWFCIYMap.set('R\'', {octave: 6, note: 'D#'});
AIWFCIYMap.set('L',   {octave: 6, note: 'G'});
AIWFCIYMap.set('L\'', {octave: 5, note: 'G'});
AIWFCIYMap.set('U',   {octave: 5, note: 'B'});
AIWFCIYMap.set('U\'', {octave: 6, note: 'F#'});
AIWFCIYMap.set('D',   {octave: 3, note: 'D'});
AIWFCIYMap.set('D\'', {octave: 6, note: 'C'});
AIWFCIYMap.set('B',   {octave: 3, note: 'F#'});
AIWFCIYMap.set('B\'', {octave: 5, note: 'A'});
AIWFCIYMap.set('F',   {octave: 2, note: 'G'});
AIWFCIYMap.set('F\'', {octave: 2, note: 'F#'});

LISMap = new Map();
LISMap.set('R',   {octave: 5, note: 'A'});
LISMap.set('R\'', {octave: 5, note: 'E'});
LISMap.set('L',   {octave: 5, note: 'C'});
LISMap.set('L\'', {octave: 6, note: 'C'});
LISMap.set('U',   {octave: 5, note: 'A#'});
LISMap.set('U\'', {octave: 5, note: 'G'});
LISMap.set('D',   {octave: 5, note: 'F'});
LISMap.set('D\'', {octave: 4, note: 'C'});
LISMap.set('B',   {octave: 3, note: 'F#'});
LISMap.set('B\'', {octave: 3, note: 'A'});
LISMap.set('F',   {octave: 2, note: 'G'});
LISMap.set('F\'', {octave: 2, note: 'F#'});

HappyMap = new Map();
HappyMap.set('R',   {octave: 5, note: 'D'});
HappyMap.set('R\'', {octave: 5, note: 'A#'});
HappyMap.set('L',   {octave: 6, note: 'C'});
HappyMap.set('L\'', {octave: 5, note: 'E'});
HappyMap.set('U',   {octave: 5, note: 'C'});
HappyMap.set('U\'', {octave: 5, note: 'F'});
HappyMap.set('D',   {octave: 5, note: 'A'});
HappyMap.set('D\'', {octave: 5, note: 'G'});
HappyMap.set('B',   {octave: 3, note: 'F#'});
HappyMap.set('B\'', {octave: 3, note: 'A'});
HappyMap.set('F',   {octave: 2, note: 'G'});
HappyMap.set('F\'', {octave: 2, note: 'F#'});

const songsMap = new Map();
songsMap.set('user', { name: "Своя мелодия", var: UserSong, map: UserMap });
songsMap.set('JingleBells', { name: "Jingle Bells", var: JingleBells, map: JingleBellsMap });
songsMap.set('DanceOfFairy', { name: "Танец Феи Драже", var: DanceOfFairy, map: DanceOfFairyMap });
songsMap.set('XmasTree', { name: "В лесу родилась ёлочка", var: ForestRaisedXmasTree, map: JingleBellsMap });
songsMap.set('WishYou', { name: "We Wish You a Merry Christmas", var: WeWishYouAMerryChristmas, map: WishYouMap });
songsMap.set('test1', { name: "Угадай мелодию 1", var: AIWFCIY, map: AIWFCIYMap });
songsMap.set('test2', { name: "Угадай мелодию 2", var: LIS, map: LISMap });

songsMap.set('happy', { name: "Happy Birthday", var: HappyBirthday, map: HappyMap });

/* Конец секции глобальных переменных */



class MyPiano extends HTMLElement {
  listeners = [];

  render() {
    if (!this.shadow)
      this.shadow = this.attachShadow({mode: 'closed'});
    
    while (this.shadow.firstChild) {
      this.shadow.removeChild(this.shadow.firstChild);
    }

    let style = document.createElement('style');
    let textStyle = "\n" +
      ":host {\n  position: relative;\n  display: block;\n" +
      "  width: " + (this.getAttribute('width') || "100%") + ";\n" +
      "  height: " + (this.getAttribute('height') || "100px") + ";\n" +
      "}\n";
    style.appendChild(document.createTextNode(textStyle));
    this.shadow.appendChild(style);

    let computedStyle = window.getComputedStyle(this);  
    let width = parseInt(computedStyle.width);
    let height = parseInt(computedStyle.height);
  
    const NUMBEROFWHITEKEYS = 52 - 14;
    const WIDTHWHITEKEY = Math.floor(width / NUMBEROFWHITEKEYS * 100) / 100;
    const OCTAVE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    textStyle = "\n" +
      "div.key {\n  cursor: pointer;\n  border: 1px solid black;\n  position: absolute;\n}\n" + 
      "div.blackKey {\n  background-color: black;\n  z-index: 10;\n" +
      "  height: " + 0.6 * height + "px;\n  width: " + WIDTHWHITEKEY / 2 + "px;\n}\n" +
      "div.whiteKey {  background-color: white;\n" +
      "  height: " + height + "px;\n  width: " + (WIDTHWHITEKEY-1) + "px;\n}\n" +
      "div.blackKey:hover {\n  background-color: rgb(134, 221, 199);\n}\n" +
      "div.whiteKey:hover {\n  background-color: rgb(134, 221, 199);\n}\n";
    style.appendChild(document.createTextNode(textStyle));
    this.shadow.appendChild(style);
    
    let newKeyDOMelem;
    for (var keyNumber = 24, octaveNumber = 2, whitekeys = 0; keyNumber < 88; keyNumber++) {
      if (OCTAVE[keyNumber % 12] == 'C') octaveNumber++;
  
      newKeyDOMelem = document.createElement('div');
      newKeyDOMelem.id = OCTAVE[keyNumber % 12] + octaveNumber;
      newKeyDOMelem.dataset.octave = octaveNumber;
      newKeyDOMelem.dataset.note = OCTAVE[keyNumber % 12];
      newKeyDOMelem.classList.add("key");
  
      if (OCTAVE[keyNumber % 12][1] == '#') {
        newKeyDOMelem.classList.add("blackKey");
        newKeyDOMelem.style.left = ((WIDTHWHITEKEY * whitekeys) - (WIDTHWHITEKEY / 4)) + 'px';
      } else {
        newKeyDOMelem.classList.add("whiteKey");
        newKeyDOMelem.style.left = (WIDTHWHITEKEY * whitekeys) + 'px';
        whitekeys++;
      }
      this.shadow.appendChild(newKeyDOMelem);
    }
  }

  constructor() {
    super();
  }
  
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.shadow.addEventListener('click', this.onClick.bind(this));
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ['width', 'height'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.rendered)
      return;
    if (oldValue != newValue)
      this.render();
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }

  onClick(event) {
    for (let l of this.listeners) {
      l({
        octave: event.target.dataset.octave,
        note: event.target.dataset.note
      });
    }
  }
}



class MyMapTable extends HTMLElement {
  listeners = [];
  
  render() {
    if (!this.shadow)
      this.shadow = this.attachShadow({mode: 'closed'});
    
    while (this.shadow.firstChild) {
      this.shadow.removeChild(this.shadow.firstChild);
    }
    
    let style = document.createElement('style');
    let textStyle = "\n" +
      "table {\n  border-spacing: 0.0em;\n}\n" +
      "tr {\n  cursor: pointer;\n}\n" +
      "tr:hover {\n  background: rgb(134, 221, 199);\n}\n" +
      "td {\n padding: 0.3em 0.4em;\n}";
    style.appendChild(document.createTextNode(textStyle));
    this.shadow.appendChild(style);

    let table = document.createElement('table');
    this.shadow.append(table);

    let TURNS = ['R', 'R\'', 'L', 'L\'', 'F', 'F\'', 'D', 'D\'', 'U', 'U\'', 'B', 'B\''];
    let row, td0, td1, td2;
    for (let turn = 0; turn < 12; turn++) {
      row = document.createElement('tr');
      row.id = TURNS[turn];

      let note = this.funcTurnNote.get(TURNS[turn]).note;
      let octave = this.funcTurnNote.get(TURNS[turn]).octave;

      row.dataset.turn = TURNS[turn];
      row.dataset.note = note;
      row.dataset.octave = octave;

      td0 = document.createElement('td');
      td0.innerHTML = TURNS[turn];
      td1 = document.createElement('td');
      td1.innerHTML = "&#8594;";
      td2 = document.createElement('td');
      td2.innerHTML =  note + octave;
  
      row.appendChild(td0);
      row.appendChild(td1);
      row.appendChild(td2);
  
      table.appendChild(row);
    }
  }

  constructor() {
    super();
    this.funcTurnNote = UserMap;
  }

  
  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.shadow.addEventListener('click', this.onClick.bind(this));
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.rendered)
      return;
    if (oldValue != newValue)
      this.render();
  }

  addEventListener(listener) {
    this.listeners.push(listener);
  }

  onClick(event) {
    let tr = event.target.closest('tr');
    if (!tr) return;

    for (let l of this.listeners) {
      l({
        turn: tr.dataset.turn,
        octave: tr.dataset.octave,
        note: tr.dataset.note
      });
    }
  }

  turnToNote(turn) {
    return this.funcTurnNote.get(turn);
  }

  setFunc(value) {
    if (!value)
      value = this.customMap;
    this.funcTurnNote = value;
    this.render();
  }

  getFunc() {
    return this.funcTurnNote;
  }
}


class MyNotePad extends HTMLElement {
  listeners = [];
  
  render() {
    if (!this.shadow)
      this.shadow = this.attachShadow({mode: 'closed'});
    
    while (this.shadow.firstChild) {
      this.shadow.removeChild(this.shadow.firstChild);
    }
    
    let style = document.createElement('style');
    let textStyle = "\n" +
      "div.birka {\n  display: inline-block;\n  cursor: pointer;\n" +
      "  user-select: none;\n  margin: 0.5em 0.2em;\n" +
      "  width: 2em;\n  text-align: center;\n}\n" +
      "div.active {\n  border-radius: 3em;\n" +
      "  background: #ddd;\n animation: shadow-animate 10s linear infinite;}\n" +
      "@keyframes shadow-animate {\n" +
      "  0% {box-shadow: 0 0 3px 2px #27a;}" +
      "  50% {box-shadow: 0 0 4px 3px #dde;}" +
      "  100% {box-shadow: 0 0 3px 2px #27a;}}" +
      "div.turn {\n  position: relative;\n  width: 2em;\n  height: 2em;\n" +
      "  line-height: 2em;\n  border-radius: 2em;\n" +
      "  box-shadow: 0 0 0px 1px #000, -2px 1px 3px #000;\n}\n" +
      "div.R {background: rgb(233, 169, 219);}\n" +
      "div.L {background: rgb(192,  83,  32);}\n" +
      "div.U {background: rgb(255, 255, 255);}\n" +
      "div.F {background: rgb(134, 221, 199);}\n" +
      "div.D {background: rgb(240, 227,  44);}\n" +
      "div.B {background: rgb( 67, 147, 194);}\n" +
      "div.br {\n  display:inline-block;\n  background: #fff4;\n" +
      "  width: 100%;\n  height: 0.3em;\n}\n" +
      "div.note {\n  font-size: 0.7em;\n  color: rgba(0, 0, 0, 0.5);\n}\n";
      // "div.direction {\n  position: absolute;\n  top: -1em;\n  right: 0.74em;\n" +
      // "  font-weight: bold;\n  color: #000;\n}";
    style.appendChild(document.createTextNode(textStyle));
    this.shadow.appendChild(style);

    let div, divT, divN, divD;
    for (let n of this.song) {
      div = document.createElement('div');
      divT = document.createElement('div');
      divN = document.createElement('div');
      //divD = document.createElement('div');
      
      let note = n.note;
      let octave = n.octave;
      let turn = "?";
      if (this.funcTurnNote) {
        for (let t of this.funcTurnNote) {
          if (t[1].note == note && t[1].octave == octave)
            turn = t[0];
        }
      }

      div.classList.add("birka");
      div.dataset.turn = turn;
      div.dataset.note = note;
      div.dataset.octave = octave;


      divT.innerHTML =  turn;
      divT.classList.add("turn");
      divT.classList.add(turn[0]);
      // if (turn[1] == '\'')
      //   divD.innerHTML = "<";
      // else
      //   divD.innerHTML = ">";
      divN.innerHTML =  note + octave;
      divN.classList.add("note");
      // divD.classList.add("direction");
      // divT.appendChild(divD);

      if (octave >= 0) {
        div.appendChild(divT);
        div.appendChild(divN);
      }

      this.shadow.appendChild(div);
      if (octave == -2) {
        div = document.createElement("div");
        div.classList.add("br");
        div.dataset.octave = -2;
        this.shadow.appendChild(div);
      }
    }
  }

  constructor() {
    super();
    this.song = UserSong;
    this.pointer = 0;
  }

  
  connectedCallback() {
    if (!this.rendered) {
      this.funcTurnNote = this.customMap;
      this.render();
      this.shadow.addEventListener('click', this.onClick.bind(this));
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.rendered)
      return;
    if (oldValue != newValue)
      this.render();
  }

  addEventListener(listener) {
    //this.listeners.push(listener);
  }

  onClick(event) {
    let birka = event.target.closest('div.birka');
    if (!birka) return;

    for (let i = 1; i < this.shadow.childNodes.length; i++) {
      if (birka == this.shadow.childNodes[i]) {
        if (this.Active)
          this.shadow.childNodes[this.pointer].classList.remove("active");
        this.pointer = i;
        this.shadow.childNodes[this.pointer].classList.add("active");
        break;
      }
    }

    for (let l of this.listeners) {
      l({
        turn: tr.dataset.turn,
        octave: tr.dataset.octave,
        note: tr.dataset.note
      });
    }
  }

  setFunc(value) {
    this.funcTurnNote = value;
    this.render();
  }

  setSong(value) {
    this.song = value;
    this.render();
  }

  pointerStart() {
    this.render();
    this.pointer = 1;
    this.shadow.childNodes[this.pointer].classList.add("active");
  }

  pointerNext() {
    if (this.pointer + 1 >= this.shadow.childNodes.length)
      this.pointerStop();
    if (!(this.pointer > 0))
      return;
    this.shadow.childNodes[this.pointer].classList.remove("active");
    this.pointer++;
    this.shadow.childNodes[this.pointer].classList.add("active");
    if (this.shadow.childNodes[this.pointer].dataset.octave < 0) {
      this.pointerNext();
    }
  }

  pointerStop() {
    if (!(this.pointer > 0))
      return;
    this.shadow.childNodes[this.pointer].classList.remove("active");
    this.pointer = 0;
  }

  pointerGetNote() {
    if (!(this.pointer > 0))
      return;
    return {
      octave: Number.parseInt(this.shadow.childNodes[this.pointer].dataset.octave),
      note: this.shadow.childNodes[this.pointer].dataset.note
    };
  }

  get Active() {
    if (this.pointer > 0)
      return true;
    else
      return false;
  }

}


customElements.define("my-piano", MyPiano);
customElements.define("my-map-table", MyMapTable);
customElements.define("my-note-pad", MyNotePad);


function playNote(e)
{
  let octave = e.octave;
  let note = e.note;
  console.log("Octave: " + octave + "; note: " + note);

  let oscillator = context.createOscillator();
  let gainNode = context.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.type = "sine";

  let frequency = controctave[note] * Math.pow(2, octave - 1);
  oscillator.frequency.value = frequency;
  oscillator.start(0);
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1);

  setTimeout(function() {
    oscillator.stop(0);
    gainNode.disconnect(context.destination);
  }, 1000);

}

