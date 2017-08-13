import uirouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import HomeConfig from './home.config';

export default angular
  .module('main.view.home', [
    uirouter,
    ngMessages,
  ])
  .config(HomeConfig);