import { Component } from '@angular/core';
import {IconClassEnum} from "@esedit-md/shared-ui";
import {Router} from "@angular/router";
import {ToasterService} from "@bl/shared";

@Component({
  selector: 'bl-button-link-sample',
  templateUrl: './bl-button-link-sample.component.html',
  styleUrls: ['./bl-button-link-sample.component.scss'],
})
export class BlButtonLinkSampleComponent {
  protected readonly IconClassEnum = IconClassEnum;
  showSpecificLinkStyle :boolean = false;
  constructor(private router: Router,public toasterService: ToasterService) {
  }
  goToHome(){
    this.router.navigate(['/']);
  }
  onClickBtn($event){
    this.toasterService.success('Action lancé ');

  }
}
