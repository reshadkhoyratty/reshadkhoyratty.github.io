import {ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {
  BlBasicObject,

  BlCalloutObject, BlComponentConfig, BlDataTableFilters,
  BlQuickSearchMultipleAbstractComponent, BlTableComponent,
  BlTableConfig, BlTableSource,
  CalloutClassEnum, IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../../services/static-bdd.service';

import {
    BlSampleDialogVrComponent
} from '../../tables-samples/bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component';
import { BlDialogContentComponent } from './bl-dialog-content.component';

@Component(
    {
        selector:'bl-quick-search-multiple-templateMode',
        template:`
        <bl-quick-search-multiple-abstract
        [callOutBodyComponents]="callOuts" [modalTitle]="modalTitle"
        [testLabelValue]="testLabelValue"
        [templateMode]="true"
        [formControl]="formControl"
        [dialogComponent]="dialogToOpen"
        (autocompleteFunction)="autocomplete($event)"
        [placeholder]="'Entrez une valeur'"
        [label]="'Entrez une valeur'"
        >

        </bl-quick-search-multiple-abstract>

        `,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => BlQuickSearchMultipleTemplateModeComponent),
                multi: true
            }
        ]
    }
)
export class BlQuickSearchMultipleTemplateModeComponent extends BlQuickSearchMultipleAbstractComponent implements OnInit{
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
