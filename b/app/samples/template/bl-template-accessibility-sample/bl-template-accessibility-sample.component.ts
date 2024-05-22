import { Component } from '@angular/core';
import { IconClassEnum } from '@esedit-md/shared-ui';

@Component({
  selector: 'bl-template-accessibility-sample',
  templateUrl: 'bl-template-accessibility-sample.component.html',
  styleUrls: ['bl-template-accessibility-sample.component.scss'],
})
export class BlTemplateAccessibilitySampleComponent {
  pageTitle = 'Introduction';
  pageIcon = IconClassEnum.accessibility;
  titlesList: string[];
  removeheaderButton = false;
  constructor() {
    this.pageTitle = 'Accessibilité';
    this.titlesList = [
      'Introduction',
      "Déclaration d'accessibilité",
      'Etablissement de la déclaration',
      'Nous contacter',
      'Défenseur des droits',
    ];
  }
}
