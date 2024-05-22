import {Component} from '@angular/core';
import {BreadcrumbParent} from "@esedit-md/shared-ui";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'bl-bread-crumb-sample',
    templateUrl: './bl-bread-crumb-sample.component.html'
})
export class BlBreadCrumbSampleComponent {

    public breadcrumbParents: BreadcrumbParent[] = [
      {
        text: this.translateService.instant('menu.home'),
        link: '/',
        testlabel: 'Accueil_1'
      },
      {
        text: this.translateService.instant('menu.styles'),
        link: '/style',
        testlabel: 'Style_2'
      }
    ];
    public currentPage=this.translateService.instant('menu.component.bread-crumb');
    public bgColor='#FFFFFF';

    public constructor(public translateService: TranslateService) {
    }

}
