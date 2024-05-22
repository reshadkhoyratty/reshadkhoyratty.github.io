import {Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction} from '@esedit-md/shared-ui';
import {BlMenuAction} from '../../../../../../../libs/shared-ui/src/lib/models/bl-menu-action';

@Component({
    selector: 'bl-action-banner-sample',
    templateUrl: './bl-action-banner-sample.component.html',
})
export class BlActionBannerSampleComponent implements OnInit {
    public buttonActions: BlAction[] = [];
    private eventNotify = new EventEmitter();

    constructor(public toasterService: ToasterService) {
        // populate list of buttons
        const bl_button_1: BlAction = {
            idAction: '',
            label: 'Button1',
            eventEmitter: this.eventNotify,
            primary: true,
            idSelector: 'btn_1',
            buttonType: 'mat-stroked-button',
            componentType: 'bl-button',
            icon: {
                icon: 'ph ph-plus', // added icon for demonstration
            },
            testLabelValue: 'Button1'
        };

        const bl_button_2: BlAction = {
            idAction: '',
            label: 'Button2',
            eventEmitter: this.eventNotify,
            primary: false,
            idSelector: 'btn_2',
            buttonType: 'mat-stroked-button',
            componentType: 'bl-button',
            icon: {
                icon: 'ph ph-minus', // added icon for demonstration
            },
            testLabelValue: 'Button2'
        };

        const split_list = this.initSplitButtons();

        const bl_transverse_menu_4: BlAction = {
            idAction: '',
            label: 'Menu4',
            idSelector: 'btn_4',
            buttonType: 'mat-stroked-button',
            primary: false,
            componentType: 'bl-transverse-menu',
            listAction: [
                {
                    idAction: 'notify',
                    label: 'Menu6',
                    eventEmitter: this.eventNotify,
                },
            ],
            icon: {
                icon: 'ph ph-gear', // added icon for demonstration
            },
            testLabelValue: 'Menu4'
        };

        this.buttonActions.push(bl_button_1, bl_button_2, split_list, bl_transverse_menu_4);
    }

    initSplitButtons(): BlAction {
        // actions related to the menu of the split-button
        const split_button_3: BlAction = {
            idAction: '',
            label: 'Split Button3',
            eventEmitter: this.eventNotify,
            idSelector: 'btn_3',
            primary: false,
            icon: {
                icon: 'ph-light ph-check', // added icon for demonstration
            },
        };
        const split_menu_5: BlAction = {
            idAction: '',
            label: 'Menu5',
            eventEmitter: this.eventNotify,
            idSelector: 'btn_5',
            testLabelValue: 'Menu5'
        };
        const split_menu_6: BlAction = {
            idAction: '',
            label: 'Menu6',
            eventEmitter: this.eventNotify,
            idSelector: 'btn_6',
            testLabelValue: 'Menu6'
        };
        // buttonActions property
        const btns_menu: BlAction = {
            idAction: '',
            label: '',
            idSelector: 'btn_3',
            componentType: 'bl-split-button',
            buttonActions: [split_button_3, split_menu_5, split_menu_6],
            primary: false,
            testLabelValue: 'Split_Button3'
        };
        return btns_menu;
    }

    ngOnInit(): void {
        this.eventNotify.subscribe((data: any) => {
            this.notify(data, null, null);
        });
    }

    private notify(
        data: any,
        blMenuAction: BlMenuAction,
        blMenuActions: BlMenuAction[]
    ) {
        this.toasterService.success('sample.datatable.event.notify');
    }
}
