import {Component, TemplateRef, ViewChild} from '@angular/core';
import { CodeTabElement } from '../../../util/code-tab/code-tab.component';
import { TranslateService } from '@ngx-translate/core';
import {IconClassEnum, IconInfos} from "@esedit-md/shared-ui";

@Component({
  selector: 'bl-card-expension-panel-sample',
  templateUrl: './bl-card-expension-panel-sample.component.html',
  styleUrls: ['./bl-card-expension-panel-sample.scss'],
})
export class BlCardExpensionPanelSampleComponent {
  @ViewChild('header') header: TemplateRef<any>;
  title: string;
  description: string;

  iconHeader:IconInfos = {
    class: IconClassEnum.user_circle_fill,
    color: 'var(--bubble-icon-orange-color)',
    size: 2,
    testLabel: 'expendtion-icon-user'
  };
  iconTitle:IconInfos = {
    class: IconClassEnum.one_circle_fill,
    color: 'var(--bs-green)',
    size: 1,
    testLabel: 'expendtion-icon-user'
  };
  constructor(translateService: TranslateService) {
    this.title = translateService.instant(
      'pages.variables.card-expansion-panel.libelle'
    );
    this.description = translateService.instant(
      'pages.variables.card-expansion-panel.content'
    );
  }

    protected readonly IconClassEnum = IconClassEnum;
}
