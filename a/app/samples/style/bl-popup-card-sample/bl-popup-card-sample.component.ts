import { AfterContentInit, Component } from '@angular/core';
import { BlAction, IconClassEnum } from '@esedit-md/shared-ui';
import { ConfigLink } from 'libs/shared-ui/src/lib/components/basic/bl-card/bl-card-utilities/link-info-type';
import { BehaviorSubject } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'bl-popup-card-sample',
  templateUrl: './bl-popup-card-sample.component.html',
  styleUrls: ['./bl-popup-card-sample.component.scss'],
})
export class BlPopupCardSampleComponent implements AfterContentInit{
  headerLink : ConfigLink;
  cardTitle : string;

  public visible_popup1 = new BehaviorSubject(false);
  public visible_popup2 = new BehaviorSubject(false);
  public visible_popup3 = new BehaviorSubject(false);

  nine_point : IconClassEnum;
  smallStyle : string;
  largeStyle : string;

  actionsList: BlAction[] = []; // liste de boutons

  constructor(translate : TranslateService){

    this.headerLink = new ConfigLink("Link","/someLink","Cutom Link","custom-link","'inline-flex'");
    this.cardTitle = translate.instant("pages.style.popup-card.title");
    this.nine_point = IconClassEnum.nine_dots;
    this.largeStyle = "margin-top:5px;"
    this.smallStyle = "margin-top:5px; width:40%;"

  }
  ngAfterContentInit(): void {

  }
  onpenPopupCard1(){
    this.visible_popup1.next(!this.visible_popup1.getValue()) ;
  }
  onpenPopupCard2(){
    this.visible_popup2.next(!this.visible_popup2.getValue()) ;
  }
  onpenPopupCard3(){
    this.visible_popup3.next(!this.visible_popup3.getValue()) ;
  }
}
