import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction} from '@esedit-md/shared-ui'
import {
  ACTION_ACTIVATE,
  ACTION_DEACTIVATE, ACTION_DELETE,
  ACTION_NOTIFY
} from "../../tables-samples/bl-datatable-sample/bl-factory-action-button";

@Component({
    selector: 'bl-vertical-menu-sample',
    templateUrl: './bl-vertical-menu-sample.component.html',
    styleUrls: ['./bl-vertical-menu-sample.component.scss']
})
export class BlVerticalMenuSampleComponent implements OnInit {
    public lstAction: BlAction[] = [];
    public data: any = [{id: 0, label: ' De Marie DUPONT', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        {id: 1, label: ' Jean DUMARIE', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
                        {id: 2, label: ' Karim LIPAN', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    ];
    public data2: any = [{id: 0, label: ' De Marie DUPONT', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blActions:[]},
                         {id: 1, label: ' Jean DUMARIE', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blActions:[]},
                         {id: 2, label: ' Karim LIPAN', data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',blActions:[]},
    ];
    public eventActivate = new EventEmitter();
    public eventDeactivate = new EventEmitter();
    public eventNotify = new EventEmitter();
    public eventDelete = new EventEmitter();
    public date: Date;
    public constructor(public toasterService: ToasterService, public changeDetectorRef:ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.date = new Date();
        this.lstAction.push({
            label: ACTION_ACTIVATE.label,
            disabled: true,
            eventEmitter: this.eventActivate
        });
        this.lstAction.push({
            label: ACTION_DEACTIVATE.label,
            eventEmitter: this.eventDeactivate,
        });
        this.lstAction.push({
            label: ACTION_NOTIFY.label,
            disabled: false,
            eventEmitter: this.eventNotify
        });
        this.lstAction.push({
            label: ACTION_DELETE.label,
            eventEmitter: this.eventDelete,
            confirmMessage: ACTION_DELETE.confirmMessage
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
            this.delete(data, this.lstAction[3], this.lstAction, this.data);
        });

        this.data2.forEach( (x : any)  => {
            x.blActions = [];
            this.lstAction.map(action=> {
                const blAction: BlAction = {};
                Object.keys(action).forEach((y:string) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    blAction[y] = action[y];
                });
                x.blActions.push(blAction);
                blAction.eventEmitter = new EventEmitter();
                this.attachEventEmitter(blAction,x.blActions);
            });
        })
    }

    private attachEventEmitter(blAction: BlAction, blActions: BlAction[]) {
        if(blAction.label === ACTION_ACTIVATE.label){
            blAction.eventEmitter?.subscribe((data: any) => {
                this.activate(data, blAction, blActions);
            });
        }
        if(blAction.label === ACTION_DEACTIVATE.label){
            blAction.eventEmitter?.subscribe((data: any) => {
                this.deactivate(data, blAction, blActions);
            });
        }
        if(blAction.label === ACTION_NOTIFY.label){
            blAction.eventEmitter?.subscribe((data: any) => {
                this.notify(data, blAction, blActions);
            });
        }
        if(blAction.label === ACTION_DELETE.label){
            blAction.eventEmitter?.subscribe((data: any, blAction: BlAction, blActions: BlAction[]) => {
                this.delete(data, blAction, blActions, this.data2);
            });
        }
    }

    private activate(data: any, blAction: BlAction, blActions: BlAction[]) {
        blActions.forEach(x=> x.disabled = false);
            blAction.disabled = true;
            this.toasterService.success('sample.datatable.event.activate');
    }

    private deactivate(data: any, blAction: BlAction, blActions: BlAction[]) {
            blActions.forEach(x=> {
                if(x.label !== ACTION_ACTIVATE.label){
                    x.disabled = true;
                }else {
                    x.disabled = false ;
                }
            });
            this.toasterService.success('sample.datatable.event.deactivate');
    }

    private notify(data: any, blAction: BlAction, blActions: BlAction[]) {
        this.toasterService.success('sample.datatable.event.notify');
        this.toasterService.success(data.id + '; ' + data.label + '; ' + data.data);
    }

    private delete(data: any, blAction: BlAction, blActions: BlAction[], source: any[]) {
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
