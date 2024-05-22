import {Component, ContentChild, EventEmitter, Inject, OnInit, ViewChild,} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {
  BlDialogService,
  BlGenericDialogComponent,
  BlGenericDialogConfig,
  IconClassEnum,
  IconInfos,
  WaitDialogConfigModel
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {BlNavCardDialogSampleComponent} from './bl-nav-card-dialog-sample/bl-nav-card-dialog-sample.component';
import {NavCardGroup, NavCardLink} from 'libs/shared-ui/src/lib/components/style/bl-nav-card/nav-card-content.model';
import {
  MarketingContainer,
  MarketingPanel
} from "../../../../../../../libs/shared-ui/src/lib/components/style/bl-marketing-panel/bl-marketing-panel.model";
import {CodeTabElement} from "../../../util/code-tab/code-tab.component";
import {DOCUMENT} from '@angular/common';
import Stringifier from "postcss/lib/stringifier";

@Component({
  selector: 'bl-nav-card-sample',
  templateUrl: './bl-nav-card-sample.component.html',
  styleUrls: ['./bl-nav-card-sample.component.scss'],
})
export class BlNavCardSampleComponent implements OnInit {
  //@ContentChild('navCardDialog',{static: true, descendants : true}) navCardDialog: BlGenericDialogComponent;

  groups: NavCardGroup[];
  nine_point: IconClassEnum;

  hideExempl1 ;

  public dialogCode: CodeTabElement [] = [];

  dialogTsCode = `@Component({
  selector: 'bl-nav-card-content-sample',
  templateUrl: './bl-nav-card-content-sample.component.html',
})
export class BlNavCardContentSampleComponent implements AfterContentInit{

  @ViewChild('navCardDialog', {static: true}) dialog: BlGenericDialogComponent;
  groups: NavCardGroup[];

  constructor() {

  }

  ngAfterContentInit(): void {
    this.groups = this.dialog.dialogConfig.data;
    console.log('groups :',this.groups);
  }

}`;

  dialogHtmlCode = `<bl-generic-dialog #navCardDialog>
  <!--Nav Card Content -->
  <div bl-generic-dialog__content>
    <bl-nav-card [groupsData]="groups"></bl-nav-card>
  </div>
</bl-generic-dialog>`;

  constructor(
    @Inject(DOCUMENT) private _document: any,
    private blDialogService: BlDialogService,
    private ts: ToasterService,
    private translateService: TranslateService,
    public toasterService: ToasterService,
  ) {
    this.nine_point = IconClassEnum.nine_dots;
    // code of the dialog exemple
    this.dialogCode = [
      {name: "TS", code: this.dialogTsCode},
      {name: "HTML", code: this.dialogHtmlCode},

    ];
  }

  emitClickEvent($event) {
    this.toasterService.success('link clicked ' + JSON.stringify($event.title));
  }

  ngOnInit(): void {
    this.hideExempl1 = false;
    // init test Data
    let emptyLinks : NavCardLink[] = [];
    let linksGroup1: NavCardLink[] = [
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien1"),
        squareIcon : false,
        icon: IconClassEnum.berger_levrault_fill,
        iconColor: 'var(--bs-danger)',
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link1',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien2"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link2',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien3"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link3',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien4"),
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'groupe_recent_link4',
        infoBull: 'infobulle text',
        squareIcon : false,
        icon: IconClassEnum.puzzle_fill,
        iconColor: '#372E95',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien5"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link5',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien6"),
        icon: IconClassEnum.calendar,
        iconColor: '#372E95',
        infoBull: 'infobulle text',
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'groupe_recent_link6',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien7"),
        icon: IconClassEnum.book,
        iconColor: '#372E95',
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link7',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien8"),
        icon: IconClassEnum.users,
        iconColor: '#372E95',
        path: 'https://material.angular.io/components/sidenav/examples',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link8',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien9"),
        icon: IconClassEnum.euro,
        iconColor: '#372E95',
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link9',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien10"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link10',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien11"),
        icon: IconClassEnum.euro,
        iconColor: '#372E95',
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link9',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien12"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link10',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien13"),
        icon: IconClassEnum.euro,
        iconColor: '#372E95',
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link9',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie1.liens.lien14"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        infoBull: 'infobulle text',
        testLabel: 'groupe_recent_link10',
      },
    ];

    let linksGroup2: NavCardLink[] = [
      {
        title: this.translateService.instant("pages.style.nav-card.categorie2.liens.lien1"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_weMagnus_link1',
      },
    ];
    let linksGroup3: NavCardLink[] = [
      {
        title: this.translateService.instant("pages.style.nav-card.categorie3.liens.lien1"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weGf_link1',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie3.liens.lien2"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weGf_link2',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie3.liens.lien3"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weGf_link3',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie3.liens.lien4"),
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weGf_link4',
        icon: IconClassEnum.arrow_up_right,
      },

    ];
    let linksGroup4: NavCardLink[] = [
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien1"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weRh_link1',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien2"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weRh_link2',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien3"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weRh_link3',
      },
      {
        title:this.translateService.instant("pages.style.nav-card.categorie4.liens.lien4"),
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weRh_link4',
        icon: IconClassEnum.arrow_up_right,
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien5"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weRh_link5',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien6"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weRh_link6',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien7"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weRh_link7',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien8"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weRh_link8',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien9"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'icon-weRh_link9',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie4.liens.lien10"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'icon-weRh_link10',
      },
    ];

    let linksGroup5: NavCardLink[] = [
      {
        title: this.translateService.instant("pages.style.nav-card.categorie5.liens.lien1"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_WeRH_link1',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie5.liens.lien2"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'groupe_WeRH_link2',
      },
      {
        title: this.translateService.instant("pages.style.nav-card.categorie5.liens.lien3"),
        icon: IconClassEnum.arrow_up_right,
        path: 'https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/',
        infoBull: 'infobulle text',
        testLabel: 'groupe_WeRH_link3',
      },
      {
        title:this.translateService.instant("pages.style.nav-card.categorie5.liens.lien4"),
        path: 'https://material.angular.io/components/sidenav/examples',
        testLabel: 'groupe_WeRH_link4',
        icon: IconClassEnum.arrow_up_right,
      },

    ];
    let linksGroup6: NavCardLink[] = [];

    // define  icone's group
    let recentIcon: IconInfos = {
      class: IconClassEnum.star_fill,
      size: 2,
      color: 'var(--primary-color)',
      testLabel: 'icon-recent',
    };
    let weMagIcon: IconInfos = {
      class: IconClassEnum.dollar_fill,
      size: 2,
      color: 'var(--primary-color)',
      testLabel: 'icon-weMagnus',
    };
    let weGfIcon: IconInfos = {
      class: IconClassEnum.book_fill,
      size: 2,
      color: 'var(--primary-color)',
      testLabel: 'icon-weGf',
    };
    let weRhIcon: IconInfos = {
      class: IconClassEnum.user_circle_fill,
      size: 2,
      color: 'var(--primary-color)',
      testLabel: 'icon-weRh',
    };
    let weGRCIcon: IconInfos = {
      class: IconClassEnum.clock_fill,
      size: 2,
      color: 'var(--primary-color)',
      testLabel: 'icon-weGRC',
    };

    // marketing panels objects
    let marketingPanel1: MarketingPanel;
    let marketingPanel2 : MarketingPanel;
    let containers: MarketingContainer[];
    let container1: MarketingContainer = {
      title: this.translateService.instant("pages.style.nav-card.marktng-panel.card1"),
      icon: IconClassEnum.home,
      content: this.translateService.instant("pages.style.nav-card.marktng-panel.card-text"),
      link: "https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"
    };
    let container2 = {
      title:  this.translateService.instant("pages.style.nav-card.marktng-panel.card2"),
      icon: IconClassEnum.home,
      content:  this.translateService.instant("pages.style.nav-card.marktng-panel.card-text"),
      link: "https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"
    };
    let container3 = {
      title:  this.translateService.instant("pages.style.nav-card.marktng-panel.card3"),
      icon: IconClassEnum.home,
      content:  this.translateService.instant("pages.style.nav-card.marktng-panel.card-text"),
      link: "https://blog.logrocket.com/inject-dynamic-content-angular-components-with-portals/"
    };

    containers = [container1, container2, container3];
    marketingPanel1 = {title: 'Encore plus de service !', containers: containers};
    marketingPanel2 = {title: 'Encore plus de service !', containers: containers};

    // défine groups
    this.groups = [
      {
        id: 'groupe_recent',
        name: 'Récents',
        icon: recentIcon,
        links: linksGroup1,
        testLabel: 'groupe_recent',
        marketingPanel: marketingPanel1
      },
      {
        id: 'groupe_weMagnus',
        name: 'WeMagnus',
        icon: weMagIcon,
        links: emptyLinks,
        emptyMessage : 'Aucune application disponible',
        testLabel: 'groupe_WeMagnus',
        marketingPanel: marketingPanel1
      },
      {
        id: 'groupe_WeGF',
        name: 'WeGF',
        icon: weGfIcon,
        links: linksGroup3,
        testLabel: 'groupe_WeGF',
        marketingPanel: marketingPanel2
      },
      {
        id: 'groupe_weRH',
        name: 'WeRH',
        icon: weRhIcon,
        links: linksGroup4,
        testLabel: 'groupe_WeRH',
      },
      {
        id: 'groupe_weGRC',
        name: 'WeGRC',
        icon: weGRCIcon,
        links: linksGroup5,
        testLabel: 'groupe_WeGRC',
      },
      {
        id: 'groupe_transvers',
        name: 'Transvers',
        links: linksGroup6,
        testLabel: 'groupe_transvers',
      },
    ];
  }

// generique dialogue use case
  openMenuCard() {
    const blGenericDialogSample1Config: BlGenericDialogConfig = {
      title: 'Toutes vos applications',
      data: this.groups,
      isCardMenu: true,
      isButtonWithIcon: true,
      closeButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.closeButtonTxt')},
      testLabel: 'nav-card-dialogue',
      waitDialogConfig: new WaitDialogConfigModel(this.translateService.instant('sample.generic-dialog.waitTitle'), this.translateService.instant('sample.generic-dialog.waitMessage'), 1000)
    };

    // action on close dialog
    const closeEvent = new EventEmitter();
    closeEvent.subscribe((resp)=>{
      this.ts.success('Event: '.concat(resp));
      window.location.reload()
    });
    this.blDialogService.openGenericDialog(BlNavCardDialogSampleComponent, blGenericDialogSample1Config, closeEvent);
    this.hidePageExemple();
  }

  /** hide the first nav-card exemple for ids unicity
   *
   * @private
   */
  private hidePageExemple() {

    var element = this._document.getElementById('nav-card-exempl1');
    this.hideExempl1 = true;

  }
}
