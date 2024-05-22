import { Component, OnInit } from '@angular/core';
import { IconClassEnum, ImageInfo } from '@esedit-md/shared-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'bl-forms-panels-sample',
  templateUrl: 'bl-sample-template-expension-panels.component.html',
})
export class BlSampleTemplateExpensionPanelsComponent implements OnInit {
  viewIcon = IconClassEnum.visible;
  imgExempleWithCard: ImageInfo;
  ngOnInit() {
    this.imgExempleWithCard = new ImageInfo(
      'assets/img/template/panelFormsTemplate.png',
      "Exemple d'implémentation du template dans une page avec carte"
    );
  }

  constructor(private router: Router) {}
  goToExample() {
    this.router.navigate(['/bl-expansion-forms-sample']);
  }
}
