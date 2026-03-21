import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import minosPage from '../../client/minos.html';

export const virgil_minos_page = UiPage({
  $id: Now.ID['virgil-minos'],
  endpoint: 'x_9418_virgil_minos.do',
  description: 'Virgil Minos - Architecture Scan Engine',
  category: 'general',
  html: minosPage,
  direct: true
});