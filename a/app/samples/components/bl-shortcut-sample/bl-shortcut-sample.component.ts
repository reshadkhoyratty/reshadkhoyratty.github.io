import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BlAction, BlSnackbarService } from '@esedit-md/shared-ui';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'bl-shortcut-sample',
  templateUrl: './bl-shortcut-sample.component.html',
  styleUrls: ['./bl-shortcut-sample.component.scss'],
})
export class BlShortcutSampleComponent implements OnInit {
  @Input() public accessibilityParam = false;
  public light_icons = [
    'ph ph-house-line',
    'ph ph-stack',
    'ph ph-globe',
    'ph ph-chart-line',
    'ph ph-bug',
    'ph ph-paint-bucket',
  ];
  public filled_icons = [
    'ph-fill ph-house-line',
    'ph-fill ph-stack',
    'ph-fill ph-globe',
    'ph-fill ph-chart-line',
    'ph-fill ph-bug',
    'ph-fill ph-paint-bucket',
  ];
  public shortcut_icons = this.light_icons;
  shortcutList: {
    icon: string;
    text: string;
    link: string;
    queryParams?: { [key:string] : string | string[] };
    categorie: string;
  }[] = [];

  //When there are more than 3 header buttons, an icon list is displayed, which can be opened.
  buttonHeader1: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Minimiser les couts ',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-file-minus',
      tooltip: 'Minimiser',
    },
  };
  buttonHeader2: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Boire un café ',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-coffee',
      tooltip: 'Bois ton café',
    },
  };
  buttonHeader3: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: "consulter l'état",
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-battery-warning',
      tooltip: "consulter l'état",
    },
  };
  buttonHeader4: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Envoyer un message',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-envelope-open',
      tooltip: 'Envoie un message',
    },
  };

  //pass your buttons into a list of BlActions[] // read the input of this page
  headerButtons1: BlAction[] = [];
  headerButtons2: BlAction[] = [];

  // Don't forget to pass events to your buttons. In this example, I have chosen to show a snackBar.
  event1Clicked() {
    this.snackBarService.openSuccessSnackBar(
      'Minimisation en cours de traitement',
      this.accessibilityParam
    );
  }
  event2Clicked() {
    this.snackBarService.openWarningSnackbar(
      'Veuillez consulter la console du navigateur',
      this.accessibilityParam
    );
    console.log(
      "Avez-vous beaucoup codé aujourd'hui ? Prenez une pause pour savourer votre café..."
    );
  }
  event3Clicked() {
    this.snackBarService.openErrorSnackbar(
      "La consultation de l'état nécéssite la confirmation de votre administrateur",
      this.accessibilityParam
    );
  }
  event4Clicked() {
    this.snackBarService.openSuccessSnackBar(
      'Envoi  de message ',
      this.accessibilityParam
    );
  }
  addEvent1() {
    this.buttonHeader1.eventEmitter?.subscribe(() => this.event1Clicked());
  }
  addEvent2() {
    this.buttonHeader2.eventEmitter?.subscribe(() => this.event2Clicked());
  }
  addEvent3() {
    this.buttonHeader3.eventEmitter?.subscribe(() => this.event3Clicked());
  }
  addEvent4() {
    this.buttonHeader4.eventEmitter?.subscribe(() => this.event4Clicked());
  }

  constructor(private snackBarService: BlSnackbarService) {}
  ngOnInit(): void {
    this.addEvent1();
    this.addEvent2();
    this.addEvent3();
    this.addEvent4();
    this.headerButtons1.push(
      this.buttonHeader1,
      this.buttonHeader2,
      this.buttonHeader3
    );

    this.headerButtons2.push(
      this.buttonHeader1,
      this.buttonHeader2,
      this.buttonHeader3,
      this.buttonHeader4
    );
    if (environment.iconsFilled) {
      this.shortcut_icons = this.filled_icons;
    }
    this.defineShortCutList();
  }

  defineShortCutList() {
    //give the list of shortcuts in order that the component will display them

    this.shortcutList = [
      {
        icon: this.shortcut_icons[0],
        text: 'Accueil',
        link: '',
        categorie: 'blank',
      },
      {
        icon: this.shortcut_icons[1],
        text: 'Consulter BL.MD',
        link: 'blmd',
        categorie: 'blank',
      },
      {
        icon: this.shortcut_icons[2],
        text: 'i18n',
        link: 'i18n',
        categorie: 'blank',
      },
      {
        icon: this.shortcut_icons[3],
        text: 'Filtres',
        link: 'template/filter',
        queryParams: { 'id': '1' , 'name': 'test'},
        categorie: 'blank',
      },
      {
        icon: this.shortcut_icons[4],
        text: 'Route introuvable ',
        link: 'randomRoute',
        categorie: 'blank',
      },
      {
        icon: this.shortcut_icons[5],
        text: 'Apparence',
        link: 'style/matformfield',
        categorie: 'blank',
      },
    ];
  }
}
