import vttToDraft from './index.js';
import draftTranscriptExample from './sample/vttToDraft.sample.js';
import vttTedTalkTranscript from './sample/vttTedTalkTranscript.sample.vtt.json';

describe('vttToDraft', () => {
  const result = vttToDraft(vttTedTalkTranscript, 'text');
  it('Should be defined', ( ) => {
    expect(result).toBeDefined();
  });

  it('Should be equal to expected value', ( ) => {
    expect(result).toEqual(draftTranscriptExample);
  });
});
