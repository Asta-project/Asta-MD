import { MessageType } from '@whiskeysockets/baileys';

export const Handler = async (chatUpdate, Matrix, logger) => {
  try {
    const mek = chatUpdate.messages[0];
    const from = mek.key.remoteJid;
    const type = Object.keys(mek.message)[0];
    const isGroup = from.endsWith('@g.us');
    const isPrivate = from.endsWith('@s.whatsapp.net');
    const sender = isGroup ? mek.participant : from;
    const command = mek.message[type].text || '';

    logger.info({
      from,
      type,
      isGroup,
      isPrivate,
      sender,
      command,
    });

    // Command handling
    switch (command.toLowerCase()) {
      case '!ping':
        Matrix.sendMessage(from, { text: 'Pong!' });
        break;
      case '!hello':
        Matrix.sendMessage(from, { text: 'Hello!' });
        break;
      default:
        // Handle unknown commands
        break;
    }
  } catch (error) {
    logger.error('Error handling message:', error);
  }
};

export const Callupdate = async (json, Matrix) => {
  try {
    const callerId = json[2][0][1].from;
    const callType = json[2][0][1][2];

    if (callType === 'offer') {
      // Handle incoming call
      Matrix.sendMessage(callerId, { text: 'Call received!' });
    } else if (callType === 'end') {
      // Handle call end
      Matrix.sendMessage(callerId, { text: 'Call ended!' });
    }
  } catch (error) {
    logger.error('Error handling call update:', error);
  }
};

export const GroupUpdate = async (Matrix, messag) => {
  try {
    const groupId = messag[2][0][1].gjid;
    const eventType = messag[2][0][1][2];

    if (eventType === 'promote') {
      // Handle promote event
      Matrix.sendMessage(groupId, { text: 'Congratulations on being promoted!' });
    } else if (eventType === 'demote') {
      // Handle demote event
      Matrix.sendMessage(groupId, { text: 'You have been demoted!' });
    } else if (eventType === 'welcome') {
      // Handle welcome event
      Matrix.sendMessage(groupId, { text: 'Welcome to the group!' });
    }
  } catch (error) {
    logger.error('Error handling group update:', error);
  }
};