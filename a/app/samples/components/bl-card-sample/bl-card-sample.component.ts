import {Component, EventEmitter, OnInit} from '@angular/core';
import {BlAction} from '@esedit-md/shared-ui';
import {ImageInfo} from 'libs/shared-ui/src/lib/components/basic/bl-card/bl-card-utilities/image-info-type';
import {CodeTabElement} from '../../../util/code-tab/code-tab.component';
import {
  Card_Close_event_HTML,
  Card_Close_event_TS,
  CARD_TEXT,
  COMPLEX_CARD_CODE_HTML,
  COMPLEX_CARD_CODE_TS,
  CUSTOM_CARD_COMPONENTS_HTML,
  CUSTOM_CARD_COMPONENTS_TS,
  CUSTOM_CARD_FORM_COMPONENTS_HTML,
  SIMPLE_CARD_CODE_HTML,
  SIMPLE_CARD_CODE_TS,
} from './card-constants';

@Component({
    selector: 'bl-card-sample',
    templateUrl: './bl-card-sample.component.html',
    styleUrls: ['./bl-card-sample.component.scss'],
})
export class BlCardSampleComponent implements OnInit {
    simpleCardCode: CodeTabElement[] = [];
    simpleCardCodeTs: string;
    simpleCardCodeHTML: string;

    complexCardCode: CodeTabElement[] = [];
    complexCardCodeTs: string;
    complexCardCodeHTML: string;

    exempleCardCode3: CodeTabElement[] = [];
    cardWithCloseTs: string;
    cardWithCloseHTML: string;

    exempleCardCode4: CodeTabElement[] = [];
    customCardTs: string;
    customCardHTML: string;

    exempleCardCode5: CodeTabElement[] = [];
    customCardFormHTML: string;

    // Simple Card
    cardId1: number; //TODO : be removed ? and use the event card
    simpleBody: string;
    cardStyle: string;

    // Complex Card
    cardId2: number;
    cardTitle: string;
    subTitle: string;
    longBody: string;
    imgBody: ImageInfo;
    cardStyle2: string;
    cardActions: BlAction[] = [];
    avatarImgUrl: string;

    // Card Exemple with close action
    cardId3: number;
    cardTitle3: string;
    cardBody3: string;
    subTitle3: string;
    cardFooter: string;

    constructor() {
        this.simpleCardCodeTs = SIMPLE_CARD_CODE_TS;
        this.simpleCardCodeHTML = SIMPLE_CARD_CODE_HTML;

        this.complexCardCodeTs = COMPLEX_CARD_CODE_TS;
        this.complexCardCodeHTML = COMPLEX_CARD_CODE_HTML;

        this.cardWithCloseTs = Card_Close_event_TS;
        this.cardWithCloseHTML = Card_Close_event_HTML;

        this.customCardTs = CUSTOM_CARD_COMPONENTS_TS;
        this.customCardHTML = CUSTOM_CARD_COMPONENTS_HTML;

        this.customCardFormHTML = CUSTOM_CARD_FORM_COMPONENTS_HTML;
    }

  ngOnInit(): void {
    // Simple Card params
    this.cardId1 = 1;
    this.simpleBody = 'Simple Card';
    this.cardStyle = 'width: 90%; height: 90px;';

    // Complex Card params
    this.cardId2 = 2;
    this.cardTitle = 'Shiba Inu';
    this.subTitle = 'Dog Breed';
    this.longBody = CARD_TEXT;
    this.imgBody = new ImageInfo(
      'https://material.angular.io/assets/img/examples/shiba2.jpg',
      'Photo of a Shiba Inu'
    );
    this.avatarImgUrl =
      'https://material.angular.io/assets/img/examples/shiba1.jpg';
    this.cardStyle2 = 'width:60%;';
    this.cardFooter = '<p>Footer</p>';

        // Actions LIKE and SHARE
        let cardActionLikeEvent = new EventEmitter<any>();
        let cardAction1: BlAction = {
            idAction: 'card_like',
            idSelector: 'card_action_like',
            label: 'LIKE',
            eventEmitter: cardActionLikeEvent,
            buttonType: 'mat-stroked-button',
            buttonFix: true,
            primary: true,
        };

        cardActionLikeEvent.subscribe((event) => {
            this.onLike(event);
        });

        let cardActionShareEvent = new EventEmitter<any>();
        let cardAction2: BlAction = {
            idAction: 'card_share',
            idSelector: 'card_action_share',
            label: 'SHARE',
            eventEmitter: cardActionShareEvent,
            buttonType: 'mat-stroked-button',
            buttonFix: true,
            primary: false,
        };

        cardActionShareEvent.subscribe((event) => {
            this.onShare(event);
        });

        this.cardActions.push(cardAction1);
        this.cardActions.push(cardAction2);

        // Card Exemple with close action
        this.cardId3 = 3;
        this.cardTitle3 = 'Entête de la carte';
        this.subTitle3 = 'Sous-titre de l\'entête de la carte';
        this.cardBody3 = 'Contenu de la carte';

        // Code of the exmples
        this.simpleCardCode.push(
            {name: 'TS', code: this.simpleCardCodeTs},
            {name: 'HTML', code: this.simpleCardCodeHTML}
        );
        this.complexCardCode.push(
            {name: 'TS', code: this.complexCardCodeTs},
            {name: 'HTML', code: this.complexCardCodeHTML}
        );
        this.exempleCardCode3.push(
            {name: 'TS', code: this.cardWithCloseTs},
            {name: 'HTML', code: this.cardWithCloseHTML}
        );

        this.exempleCardCode4.push(
            {name: 'HTML', code: this.customCardHTML},
            {name: 'TS', code: this.customCardTs}
        );

        this.exempleCardCode5.push({name: 'HTML', code: this.customCardFormHTML});
    }

    onLike = (event: any): any => {

    };

    onShare = (event: any): any => {

    };

    onCloseFun(event: any) {

    }
}
