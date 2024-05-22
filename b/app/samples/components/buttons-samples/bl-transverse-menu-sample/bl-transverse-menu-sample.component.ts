import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction} from '@esedit-md/shared-ui';
import {BlMenuAction} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-menu-action';
import {
  ACTION_ACTIVATE,
  ACTION_DEACTIVATE, ACTION_DELETE,
  ACTION_NOTIFY
} from "../../tables-samples/bl-datatable-sample/bl-factory-action-button";

@Component({
    selector: 'bl-transverse-menu-sample',
    templateUrl: './bl-transverse-menu-sample.component.html',
    styleUrls: ['./bl-transverse-menu-sample.component.scss']
})
export class BlTransverseMenuSampleComponent implements OnInit {
    public lstAction: BlMenuAction[] = [];
    public data: any = [{id: 0, label: ' De Marie DUPONT', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        {id: 1, label: ' Jean DUMARIE', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        {id: 2, label: ' Karim LIPAN', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    ];
    public data2: any = [{id: 0, label: ' De Marie DUPONT', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blMenuActions:[]},
                         {id: 1, label: ' Jean DUMARIE', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blMenuActions:[]},
                         {id: 2, label: ' Karim LIPAN', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blMenuActions:[]},
    ];
    public eventDeactivate = new EventEmitter();
    public eventActivate = new EventEmitter();
    public eventNotify = new EventEmitter();
    public eventDelete = new EventEmitter();
    public date: Date;

    public constructor(public toasterService: ToasterService, public changeDetectorRef: ChangeDetectorRef) {
    }
    public ngOnInit(): void {
        this.date = new Date();
        this.lstAction.push({
            idAction: "Activation",
            label: ACTION_ACTIVATE.label!,
            disabled: true,
            subMenu:
                [
                    {
                        idAction: "Activer",
                        label: ACTION_ACTIVATE.label!,
                        eventEmitter: this.eventActivate,
                    },
                ]
        });
        this.lstAction.push({
            idAction: "Deactivation",
            label: ACTION_DEACTIVATE.label!,
            subMenu: [
                {
                    idAction: "Deactivate",
                    label: ACTION_DEACTIVATE.label!,
                    eventEmitter: this.eventDeactivate
                },
            ]
        });
        this.lstAction.push({
            disabled: false,
            idAction: "Notification",
            label: ACTION_NOTIFY.label!,
            eventEmitter: this.eventNotify
        });
        this.lstAction.push({
            idAction: "Delete",
            label: ACTION_DELETE.label!,
            eventEmitter: this.eventDelete
        });
        this.eventActivate.subscribe((data: any) => {
            this.activate(data, this.lstAction[0], this.lstAction);
        });
        this.eventDeactivate.subscribe((data:any) => {
            this.deactivate(data, this.lstAction[1], this.lstAction);
        });
        this.eventNotify.subscribe((data:any) => {
            this.notify(data, this.lstAction[2], this.lstAction);
        });
        this.eventDelete.subscribe((data: any) => {
            this.delete(data, this.lstAction[2], this.lstAction, this.data);
        });

        this.data2.forEach( (x : any)  => {
            x.blMenuActions = [];
            this.lstAction.map(action=> {
                const blMenuAction: BlMenuAction = {
                    idAction: action.label,
                    label: action.label};
                Object.keys(action).forEach((y:string) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    blMenuAction[y] = action[y];
                });
                x.blMenuActions.push(blMenuAction);
                blMenuAction.eventEmitter = new EventEmitter();
                this.attachEventEmitter(blMenuAction,x.blMenuActions);
            });
        })
    }

    private attachEventEmitter(blMenuAction: BlMenuAction, blMenuActions: BlMenuAction[]) {
        if(blMenuAction.label === ACTION_ACTIVATE.label){
            blMenuAction.eventEmitter?.subscribe((data: any) => {
                this.activate(data, blMenuAction, blMenuActions);
            });
        }
        if(blMenuAction.label === ACTION_DEACTIVATE.label){
            blMenuAction.eventEmitter?.subscribe((data: any) => {
                this.deactivate(data, blMenuAction, blMenuActions);
            });
        }
        if(blMenuAction.label === ACTION_NOTIFY.label){
            blMenuAction.eventEmitter?.subscribe((data: any) => {
                this.notify(data, blMenuAction, blMenuActions);
            });
        }
        if(blMenuAction.label === ACTION_DELETE.label){
            blMenuAction.eventEmitter?.subscribe((data: any, blAction: BlAction, blActions: BlAction[]) => {
                this.delete(data, blMenuAction, blMenuActions, this.data2);
            });
        }
    }

    private activate(data: any, blMenuAction: BlMenuAction, blMenuActions: BlMenuAction[]) {
        if(data.blMenuActions) {
            data.blMenuActions.forEach((x: BlMenuAction) => {
                if (x.label !== ACTION_ACTIVATE.label){
                    x.disabled = false;
                } else {
                    x.disabled = true;
                }
            });
        } else {
            blMenuActions.forEach(x => x.disabled = false);
            blMenuAction.disabled = true;
        }

            this.toasterService.success('sample.datatable.event.activate');
    }

    private deactivate(data: any, blMenuAction: BlMenuAction, blMenuActions: BlMenuAction[]) {
        if(data.blMenuActions){
            data.blMenuActions.forEach( (x:BlMenuAction) => {
                if(x.label !== ACTION_ACTIVATE.label){
                    x.disabled = true;
                }else {
                    x.disabled = false;
                }
            });
        } else {
            blMenuActions.forEach(x=> {
                if(x.label !== ACTION_ACTIVATE.label){
                    x.disabled = true;
                }else {
                    x.disabled = false ;
                }
            });
        }
        this.toasterService.success('sample.datatable.event.deactivate');
    }

    private notify(data: any, blMenuAction: BlMenuAction, blMenuActions: BlMenuAction[]) {
        this.toasterService.success('sample.datatable.event.notify');
        this.toasterService.success(data.id + '; ' + data.label + '; ' + data.data);
    }

    private delete(data: any, blMenuAction: BlMenuAction, blMenuActions: BlMenuAction[], source: any[]) {
        let id: number;
        source.forEach(x => {
            if (x.id === data.id){
                id = source.indexOf(x);
                source.splice(id,1);
            }
        });
        this.toasterService.success('sample.datatable.event.delete');
        this.toasterService.success(data.id + '; ' + data.label + '; ' + data.data);
        this.changeDetectorRef.detectChanges();
    }
}
