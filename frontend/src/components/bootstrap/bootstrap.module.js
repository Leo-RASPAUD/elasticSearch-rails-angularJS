import BootstrapComponent from './bootstrap.component';
import BootstrapConfig from './bootstrap.config';
import BootstrapRun from './bootstrap.run';
import ngMaterial from 'angular-material';
import '../../services/histogram/histogram.module';
import '../../views/home/home.module';

export default angular
  .module('main.component.bootstrap', [
    ngMaterial,
    'main.view.home',
    'main.service.histogram',
  ])
  .config(BootstrapConfig)
  .run(BootstrapRun)
  .directive('mainBootstrap', () => new BootstrapComponent());