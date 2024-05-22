import {AfterViewInit, ChangeDetectorRef, Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlBasicObject, BlMultiComboAbstractComponent} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../../services/static-bdd.service';

@Component({
  selector: 'bl-multi-combo-search-statut',
  template: `
    <bl-multi-combo-search-abstract [label]="'sample.status.list.title' "
                             [data]="lst"
                             [displayCode]="displayCode"
                             [placeholder]="'sample.status.list.none' "
                             [formControl]="formControl"
                             [id]="id"
                             [testLabelValue]="testLabelValue"
                             [appearance]="appearance"
                             [readOnly]="readOnly"
                             (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
    >
    </bl-multi-combo-search-abstract>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BlMultiComboSearchStatutComponent),
      multi: true
    }
  ]
})
export class BlMultiComboSearchStatutComponent extends BlMultiComboAbstractComponent implements AfterViewInit {

  public lst: BlBasicObject[];

  constructor(private staticBddService: StaticBddService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.id = 'mcStatut';
  }

  ngAfterViewInit(): void {
    this.loadList();
  }

  private loadList(): void {
    this.staticBddService.listStatus().subscribe((c: BlBasicObject[]) => {
      this.lst = c;
      this.changeDetectorRef.detectChanges();
    });
  }

}
