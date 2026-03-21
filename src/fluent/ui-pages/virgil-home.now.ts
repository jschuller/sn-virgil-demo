import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import homePage from '../../client/home.html';

export const virgil_home_page = UiPage({
  $id: Now.ID['virgil-home'],
  endpoint: 'x_9418_virgil_home.do',
  description: 'Virgil Architecture and Pricing Intelligence Platform - Home',
  category: 'general',
  html: homePage,
  direct: true
});