import {AfterContentInit, Component, ViewChild} from '@angular/core';
import { BlDialogService, BlGenericDialogComponent } from '@esedit-md/shared-ui';
import { TranslateService } from '@ngx-translate/core';
import {
  NavCardGroup
} from "../../../../../../../../libs/shared-ui/src/lib/components/style/bl-nav-card/nav-card-content.model";

@Component({
  selector: 'bl-nav-card-dialog-sample',
  templateUrl: './bl-nav-card-dialog-sample.component.html',
})
export class BlNavCardDialogSampleComponent implements AfterContentInit{

  @ViewChild('navCardDialog', {static: true}) dialog: BlGenericDialogComponent;
  groups: NavCardGroup[];

  constructor() {

  }

  ngAfterContentInit(): void {
    this.groups = this.dialog.dialogConfig.data;
    console.log('groups :',this.groups);
  }

}
