const emojis = ['👍', '👏', '💯'];
const doReact = async (emoji, message, Matrix) => {
  try {
    await Matrix.sendMessage(message.key.remoteJid, {
      react: {
        text: emoji,
        key: message.key,
      },
    });
    console.log(`Reacted with ${emoji} to message from ${message.key.remoteJid}`);
  } catch (error) {
    console.error('Error reacting to message:', error);
  }
};

const checkMentionedJid = (jid, mentionedJid) => {
  return jid === mentionedJid;
};

const checkIsMedia = (message) => {
  return message.message && message.message.type === 'media';
};

const checkIsImage = (message) => {
  return checkIsMedia(message) && message.message.mediaType === 'image';
};

const checkIsVideo = (message) => {
  return checkIsMedia(message) && message.message.mediaType === 'video';
};

const checkIsDocument = (message) => {
  return checkIsMedia(message) && message.message.mediaType === 'document';
};

const checkIsAudio = (message) => {
  return checkIsMedia(message) && message.message.mediaType === 'audio';
};

export { emojis, doReact, checkMentionedJid, checkIsMedia, checkIsImage, checkIsVideo, checkIsDocument, checkIsAudio };