export const CARD_TEXT = '<p>The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.<br>A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally <br>bred for hunting.</p>'

export const SIMPLE_CARD_CODE_TS =
    `export class BlCardSampleComponent implements OnInit {
    simpleBody : string;
    cardStyle : string;

  ngOnInit(): void {
    this.simpleBody = "Simple Card";
    this.cardStyle = "width: 90%; height: 50px;"
  };
`
export const SIMPLE_CARD_CODE_HTML = `<bl-card [cardStyle]="cardStyle" [body]="simpleBody"></bl-card>`

export const COMPLEX_CARD_CODE_TS = `export class BlCardSampleComponent implements OnInit {
    cardTitle : string;
    subTitle : string;
    longBody : string;
    imgBody : ImageInfo;
    cardStyle2 : string;
    cardActions : CardActions[] = [];
    avatarImgUrl : string;

  ngOnInit(): void {
    this.cardTitle = "Shiba Inu";
    this.subTitle = "Dog Breed";
    this.longBody = CARD_TEXT;
    this.imgBody = new ImageInfo ("https://material.angular.io/assets/img/examples/shiba2.jpg","Photo of a Shiba Inu");
    this.avatarImgUrl = "https://material.angular.io/assets/img/examples/shiba1.jpg"
    this.cardStyle2 = "width:60%;";

    // Actions LIKE and SHARE
    let cardActionLikeEvent = new EventEmitter<any>();
    let cardAction1: BlAction = {
      idAction: 'card_like',
      idSelector: 'card_action_like',
      label: 'LIKE',
      eventEmitter : cardActionLikeEvent,
      buttonType: 'mat-stroked-button',
      buttonFix: true,
      primary: true
    }

    cardActionLikeEvent.subscribe((event)=>{
      this.onLike(event);
    });

    let cardActionShareEvent = new EventEmitter<any>();
    let cardAction2: BlAction = {
      idAction: 'card_share',
      idSelector: 'card_action_share',
      label: 'SHARE',
      eventEmitter : cardActionShareEvent,
      buttonType: 'mat-stroked-button',
      buttonFix: true,
      primary: false
    }

   cardActionShareEvent.subscribe((event)=>{
      this.onShare(event);
    });

    this.cardActions.push(cardAction1);
    this.cardActions.push(cardAction2);

  }; `;

export const COMPLEX_CARD_CODE_HTML = `
<bl-card [cardStyle]="cardStyle2"
  [title]="cardTitle"
  [subTitle]="subTitle"
  [body]="longBody"
  [imgBody]="imgBody"
  [headerDevider]="false"
  [avatarImg]="avatarImgUrl"
  [cardActions]="cardActions">
</bl-card>`;

export const Card_Close_event_TS = ` export class BlCardSampleComponent implements OnInit {

    cardTitle3 : string;
    subTitle3 : string;
    cardBody3 : string;
    cardFooter : string;

    ngOnInit(): void {
        this.cardTitle3 ="Entête de la carte";
        this.subTitle3 = "Sous-titre de l'entête de la carte";
        this.cardBody3 = "Contenu de la carte";
        this.cardFooter = "<p>Footer</p>";
    }

    onCloseFun(event :any){

    }

        `

export const Card_Close_event_HTML = `
<bl-card
  [showCloseBtn]="true"
  [title]="cardTitle3"
  [subTitle]="subTitle3"
  [footerDivider]="true"
  [body]="cardBody3"
  [footer]="cardFooter"
  (onCloseCard)="onCloseFun($event)">
</bl-card>`

export const CUSTOM_CARD_COMPONENTS_TS = ` export class BlCardSampleComponent implements OnInit {

  cardTitle3 : string;
  subTitle3 : string;
  avatarImgUrl : string;

  ngOnInit(): void {
      this.cardTitle3 ="Entête de la carte";
      this.subTitle3 = "Sous-titre de l'entête de la carte";
      this.avatarImgUrl = "https://material.angular.io/assets/img/examples/shiba1.jpg"
  }

  onCloseFun(event :any){

  }
  `

export const CUSTOM_CARD_COMPONENTS_HTML = `
<bl-card>
        <bl-card-header
        [title]="cardTitle3"
        [subTitle]="subTitle3"
        [avatarImg]="avatarImgUrl"
        [showCloseBtn]="true" (onCloseEvent)="onCloseFun($event)">
        </bl-card-header>
        <bl-card-body [style] ="'m-2'">
            <span>Contenue spécifique ...</span>
            <bl-card-actions [classStyle]="'mb-2'">
              <bl-button (click)="onShare($event)" [id]="'share_btn'" [primary]="false"
                  [testLabelValue]="'_button_share'" [title]="'SHARE'">
              </bl-button>
          </bl-card-actions>
        </bl-card-body>
        <bl-card-footer>Footer</bl-card-footer>
</bl-card>
`
export const CUSTOM_CARD_FORM_COMPONENTS_HTML = `
    <bl-card [headerDevider]="true" [title]="'Coordonnées contact'">
        <form class="mt-3">
            <bl-text-field [label]="'Nom'" [placeholder]="'Nom'"></bl-text-field>
        </form>
    </bl-card>
`
