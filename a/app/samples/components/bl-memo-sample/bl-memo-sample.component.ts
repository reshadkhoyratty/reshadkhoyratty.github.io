import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BlAction, BlSnackbarService, IconClassEnum,} from '@esedit-md/shared-ui';
import {BlNoteModel, NoteColor,} from '../../../../../../../libs/shared-ui/src/lib/models/bl-note.model';

@Component({
  selector: 'bl-memo-sample',
  templateUrl: 'bl-memo-sample.component.html',
  styleUrls:['bl-memo-sample.component.scss']
})
export class BlMemoSampleComponent implements OnInit {
  @Input() public accessibilityParam = false;
  noteInformation: BlNoteModel = {
    text: "Ce n'était qu'un renard semblable à cent mille autres. Mais j'en ai fait mon ami, et il est maintenant unique.",
    account: { firstName: 'Petit Prince', lastName: 'Le ' },
    createdDate: new Date('1943-06-04'),
    isImportant: true,
    color: NoteColor.Pink,
  };
  noteInformation1: BlNoteModel = {
    text: 'Aider nos clients à aligner les promesses du numérique avec les exigences de transformations des utilisateurs et usagers',
    account: { firstName: 'LEVRAULT', lastName: 'BERGER' },
    createdDate: new Date(),

    color: NoteColor.Blue,
  };
  noteInformation2: BlNoteModel = {
    text: 'Lorem ipsum dolor sit amtet consteteur sadispicng elit',
    account: { firstName: 'Keihanaikukauakahihuliheekahaunaele', lastName: 'Nom Plus Longs' },
    createdDate: new Date(),
    isImportant: true,
    color: NoteColor.Green,
  };
  noteInformation3: BlNoteModel = {
    text: 'Lorem ipsum dolor sit amtet consteteur sadispicng elit Lorem ipsum dolor sit amtet consteteur sadispicng eli Lorem ipsum dolor sit amtet consteteur sadispicng eli Lorem ipsum dolor sit amtet consteteur sadispicng eli Lorem ipsum dolor sit amtet consteteur sadispicng eli',
    account: { firstName: 'Dev', lastName: 'Equipe' },
    createdDate: new Date(),
  };
  buttonHeader1: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Modifier le mémo',
    idSelector: 'exampleSelector',
  };
  buttonHeader2: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Archiver',
    idSelector: 'exampleSelector',
  };
  buttonHeader3: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Supprimer',
    idSelector: 'exampleSelector',
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
  public plus = IconClassEnum.plus;

  //pass your buttons into a list of BlActions[] // read the input of this page
  headerButtons: BlAction[] = [];

  // Don't forget to pass events to your buttons. In this example, I have chosen to show a snackBar.
    cardStyle: string;

  event1Clicked() {
    this.snackBarService.openSuccessSnackBar(
      'Modification en cours de traitement',
      this.accessibilityParam
    );
  }
  event2Clicked() {
    this.snackBarService.openWarningSnackbar(
      'Archivage en cours',
      this.accessibilityParam
    );
  }
  event3Clicked() {
    this.snackBarService.openErrorSnackbar(
      'Suppression en cours',
      this.accessibilityParam
    );
  }
  eventadd() {
    this.snackBarService.openSuccessSnackBar(
      'Validation en cours',
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

  constructor(private snackBarService: BlSnackbarService) {}
  ngOnInit(): void {
    this.addEvent1();
    this.addEvent2();
    this.addEvent3();
    this.cardStyle = "width: 90%;"
    this.headerButtons.push(
      this.buttonHeader1,
      this.buttonHeader2,
      this.buttonHeader3
    );
  }
}
