import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import plutusPage from '../../client/plutus.html';

export const virgil_plutus_page = UiPage({
  $id: Now.ID['virgil-plutus'],
  endpoint: 'x_9418_virgil_plutus.do',
  description: 'Virgil Plutus - WDF Credit Sizing Engine',
  category: 'general',
  html: plutusPage,
  direct: true
});