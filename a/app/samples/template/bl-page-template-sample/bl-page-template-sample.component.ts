import {Component, OnInit} from '@angular/core';
import {ImageInfo} from '@esedit-md/shared-ui';
import {CodeTabElement} from '../../../util/code-tab/code-tab.component';

@Component({
    selector: 'bl-page-template-sample',
    templateUrl: './bl-page-template-sample.component.html',
    styleUrls: ['./bl-page-template-sample.component.scss'],
})
export class BlPageTemplateSampleComponent implements OnInit {

  imgExempleSimple : ImageInfo;

  simpleTemplateCode : CodeTabElement[] = [];

  tempSimpleCodeHtml = `
  <bl-page-template [pageIcon]="pageIcon" [pageTitle]="'Formulaire simple'" >
    <div body> --> The content of your body
        <form [formGroup]="formGroup" >
          .. your form

        </form>
    </div>

    <div footer> --> The footer
        <bl-button
          (click)="onSubmitForm()"
          title="{{ 'sample.button.save' | translate }}"
          [primary]="true"
          type="submit"
          [disabled]="formGroup.invalid"
          [testLabelValue]="'save_action'"
          style="margin-right: 10px;"
        ></bl-button>
    </div>
  </bl-page-template>`;

  ngOnInit(){


    this.imgExempleSimple = new ImageInfo(
      'assets/img/template/simple-template.png',
      "Exemple d'implémentation du template dans une page simple"
     );

        this.simpleTemplateCode.push(
            {name: 'page.componant.html', code: this.tempSimpleCodeHtml});

  }


}
