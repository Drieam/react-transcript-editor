/**
 * Convert VTT to draftJS
 * see `sample` folder for example of input and output as well as `example-usage.js`
 */

import generateEntitiesRanges from '../generate-entities-ranges/index';
import webvtt from 'node-webvtt';

const vttToDraft = (text) => {
  if (typeof text === 'object') {
    text = text.text;
  }

  const parsed = webvtt.parse(text);
  const results = [];

  parsed.cues.forEach((cue, i) => {
    const cueDuration = cue.end - cue.start - 0.01;
    const words = cue.text.split(/\s+/);
    const durationPerWord = cueDuration / words.length;
    // The words are required and they need to be separate words with a separate timestamp, so we'll estimate
    // it based on the number of words. A better way would be to also take into account the word length, but this
    // can be implemented in the future.
    const timedWords = words.map((word, j) => ({
      text: word,
      start: cue.start + durationPerWord * j,
      end: cue.start + durationPerWord * (j + 1),
      confidence: 1
    }));

    const draftJsContentBlockParagraph = {
      text: cue.text,
      type: 'paragraph',
      data: {
        speaker: `TBC ${ i }`,
        words: words,
        start: cue.start
      },
      // the entities as ranges are each word in the space-joined text,
      // so it needs to be compute for each the offset from the beginning of the paragraph and the length
      entityRanges: generateEntitiesRanges(timedWords, 'text'),
    };
    results.push(draftJsContentBlockParagraph);
  });

  return results;
};

export default vttToDraft;
