import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import chatPage from '../../client/chat.html';

export const virgil_chat_page = UiPage({
  $id: Now.ID['virgil-chat'],
  endpoint: 'x_9418_virgil_chat.do',
  description: 'Virgil Chat - AI Advisor Interface',
  category: 'general',
  html: chatPage,
  direct: true
});