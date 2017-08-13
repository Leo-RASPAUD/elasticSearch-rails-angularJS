import './bootstrap.component.scss';
import '../../assets/spinner.css';
import template from './bootstrap.component.html';

export default class BootstrapComponent {
  constructor() {
    this.template = template;
    this.restrict = 'E';
  }
}