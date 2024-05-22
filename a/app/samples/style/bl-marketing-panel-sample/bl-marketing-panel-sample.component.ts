import { Component ,OnInit} from '@angular/core';
import {
  MarketingContainer,
  MarketingPanel
} from "../../../../../../../libs/shared-ui/src/lib/components/style/bl-marketing-panel/bl-marketing-panel.model";
import {IconClassEnum} from "@esedit-md/shared-ui";
import { ToasterService } from "@bl/shared";

@Component({
  selector: 'bl-marketing-panel-sample',
  templateUrl: './bl-marketing-panel-sample.component.html',
  styleUrls: ['./bl-marketing-panel-sample.component.scss'],
})
export class BlMarketingPanelSampleComponent implements OnInit{

  public marketingPanel : MarketingPanel ;
  public containers : MarketingContainer[];

  constructor(public toasterService: ToasterService
  ){
  }
  ngOnInit(){
   let container1 : MarketingContainer = { title :'Première fiche', icon:IconClassEnum.berger_levrault , iconSquare: false, iconColor : 'var(--bubble-icon-orange-color)',content: 'description de la fiche de publicité spécifique',link:"https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"};
   let container2 = { title :'Première fiche', icon:IconClassEnum.home ,content: 'description de la fiche de publicité spécifique',link:"https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"};
   let container3 = { title :'Première fiche', icon:IconClassEnum.home ,content: 'description de la fiche de publicité spécifique',link:"https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"};

   this.containers= [container1,container2,container3];
   this.marketingPanel = { title : 'Encore plus de service !', containers : this.containers};
  }

  emitClickEvent($event) {
    this.toasterService.success('link on marketing panel clicked ' + JSON.stringify($event));
  }
}
