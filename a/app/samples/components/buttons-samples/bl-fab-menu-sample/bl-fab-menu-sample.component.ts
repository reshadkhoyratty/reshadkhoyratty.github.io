import {Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction} from '@esedit-md/shared-ui';
import {BlFabMenu, BlFabMenuDirection,} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-fab-menu.model';

@Component({
    selector: 'bl-fab-menu-sample',
    templateUrl: './bl-fab-menu-sample.component.html',
    styleUrls: ['./bl-fab-menu-sample.component.scss'],
})
export class BlFabMenuSampleComponent implements OnInit {
    public fabButtons: BlFabMenu[] = [];
    public top: BlFabMenuDirection = 'top';
    public bottom: BlFabMenuDirection = 'bottom';
    public left: BlFabMenuDirection = 'left';
    public right: BlFabMenuDirection = 'right';

    public buttonActions: BlAction[] = [];
    public addEvent = new EventEmitter();
    public saveEvent = new EventEmitter();
    public saveCopyEvent = new EventEmitter();
    public deleteEvent = new EventEmitter();

    public constructor(private toasterService: ToasterService) {
        this.fabButtons = [
            {
                id: 1,
                icon: 'plus',
                tooltip: 'Ajouter',
                action: {
                    eventEmitter: this.addEvent,
                },
            },
            {
                id: 2,
                icon: 'check',
                tooltip: 'Enregistrer',
                action: {
                    eventEmitter: this.saveEvent,
                },
            },
            {
                id: 3,
                icon: 'archive',
                tooltip: 'Archiver',
                action: {
                    eventEmitter: this.saveCopyEvent,
                },
            },
            {
                id: 4,
                icon: 'delete',
                tooltip: 'Supprimer',
                action: {
                    eventEmitter: this.deleteEvent,
                },
            },
        ];
    }

    ngOnInit(): void {
        this.addEvent.subscribe(() => {
            this.toasterService.success('sample.fab-menu.event.add');
        });
        this.saveEvent.subscribe(() => {
            this.toasterService.success('sample.fab-menu.event.save');
        });
        this.saveCopyEvent.subscribe(() => {
            this.toasterService.success('sample.fab-menu.event.save-copy');
        });
        this.deleteEvent.subscribe(() => {
            this.toasterService.success('sample.fab-menu.event.delete');
        });
    }
}
