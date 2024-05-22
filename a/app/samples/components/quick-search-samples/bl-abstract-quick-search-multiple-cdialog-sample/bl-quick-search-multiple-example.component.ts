import { ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BlBasicObject,
  BlCalloutObject,
  BlQuickSearchMultipleAbstractComponent,
  CalloutClassEnum
} from '@esedit-md/shared-ui';
import { BlDialogContentComponent } from '../bl-abstract-quick-search-multiple-sample/bl-dialog-content.component';
import { ToasterService } from '@bl/shared';
import { TranslateService } from '@ngx-translate/core';
import { StaticBddService } from '../../../../services/static-bdd.service';
import { MatDialog } from '@angular/material/dialog';
import { LayoutService } from '@bl/bl-app-layout';

@Component(
  {selector: 'bl-quick-search-multiple-example'
    ,template:`
        <bl-quick-search-multiple-abstract
        [callOutBodyComponents]="callOuts" [modalTitle]="modalTitle"
        [testLabelValue]="testLabelValue"
        [templateMode]="true"
        [formControl]="formControl"
        [dialogComponent]="dialogToOpen"
        (autocompleteFunction)="autocomplete($event)"
        >

        </bl-quick-search-multiple-abstract>

        `,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => BlQuickSearchMultipleExampleComponent),
        multi: true
      }
    ]
  }

)

export class BlQuickSearchMultipleExampleComponent extends BlQuickSearchMultipleAbstractComponent implements OnInit {
  override modalTitle = '';
  callOuts: BlCalloutObject[]= [];
  public lst: BlBasicObject[];

  private rowClickEvent = new EventEmitter<any>();
  dialogToOpen = BlDialogContentComponent;

  constructor(private toasterService: ToasterService,
              public override translateService: TranslateService,
              private staticBddService: StaticBddService,
              public  override dialog: MatDialog,
              override changeDetectorRef: ChangeDetectorRef,
              public layoutService: LayoutService) {
    super(translateService, dialog,changeDetectorRef);





  }
  override ngOnInit(): void {

    this.modalTitle = 'Modal Title';
    this.callOuts = [
      {
        calloutCLass: CalloutClassEnum.information,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title: 'Information',
        enablePicto: true
      },
      {
        calloutCLass: CalloutClassEnum.warning,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title: 'Warning',
        enablePicto: true

      }
    ]
  }

  public autocomplete(a: string): void {
    this.staticBddService.autocompleteUser(a).subscribe((result: BlBasicObject[]) => {
      this.lst = result;
    });

  }
}
