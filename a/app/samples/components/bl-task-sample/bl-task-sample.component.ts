import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction, TaskModel} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {TaskDomainEnum} from '../../../../../../../libs/shared-ui/src/lib/models/bl-task/enum/task-domain.enum';
import {TaskStatusEnum} from '../../../../../../../libs/shared-ui/src/lib/models/bl-task/enum/task-status.enum';
import {TaskTypeEnum} from '../../../../../../../libs/shared-ui/src/lib/models/bl-task/enum/task-type.enum';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'bl-task-sample',
    templateUrl: './bl-task-sample.component.html',
})
export class BlTaskSampleComponent {

    myActionsList: BlAction[] = [];

    showBusinessImplementation = false;
    public delayedTask: TaskModel = {
        id: '1234-4567-7897-123a',
        domain: TaskDomainEnum.FAMILY,
        object: 'Objet de la tâche',
        dateMax: new Date('09/29/2023'),
        status: TaskStatusEnum.TODO,
        type: TaskTypeEnum.MUNICIPAL,
    };
    public notDelayedTask: TaskModel = {
        id: '1234-4567-7897-123a',
        domain: TaskDomainEnum.ENVIRONMENT,
        object: 'Objet de la tâche',
        dateMax: new Date('03/26/2024'),
        status: TaskStatusEnum.TODO,
        type: TaskTypeEnum.MUNICIPAL,
    };
    public taskDone: TaskModel = {
        id: '1234-4567-7897-123a',
        domain: TaskDomainEnum.TECHNICAL_SERVICES,
        object: 'Objet de la tâche',
        dateMax: new Date('03/12/2023'),
        status: TaskStatusEnum.DONE,
        type: TaskTypeEnum.MUNICIPAL,
        dateDone: new Date('03/26/2013')
    };
    public taskWithCustomDateMax: TaskModel = {
        id: '1234-4567-7897-123a',
        domain: TaskDomainEnum.FAMILY,
        object: 'Si la tâche à une date personnalisée, la date fin qui s\'affiche est celle personnalisée',
        dateMax: new Date('09/29/2023'),
        customDateMax: new Date('11/29/2023'),
        status: TaskStatusEnum.PENDING,
        type: TaskTypeEnum.MUNICIPAL,
    };
    public taskWithInitials: TaskModel = {
        id: '1234-4567-7897-123b',
        domain: TaskDomainEnum.FAMILY,
        object: 'Objet de la tâche',
        dateMax: new Date('10/29/2024'),
        status: TaskStatusEnum.TODO,
        type: TaskTypeEnum.MUNICIPAL,
        assignedTo: {
            firstName: 'FirstName',
            lastName: 'LastName'
        }
    };
    costumIconImageStyle = 'width: 24px; height: 24px;'

    public constructor(public toasterService: ToasterService,
                       private translateService: TranslateService,
    ) {
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.retake'),
                eventEmitter: new EventEmitter()
            })
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.end'),
                eventEmitter: new EventEmitter()
            })
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.delete'),
                eventEmitter: new EventEmitter()
            })
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.put-on-hold'),
                eventEmitter: new EventEmitter()
            })
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.duplicate'),
                eventEmitter: new EventEmitter()
            })
        this.myActionsList.push(
            {
                label: this.translateService.instant('bl-task.actions.add-favorites'),
                eventEmitter: new EventEmitter()
            })

    }

    emitClickEvent($event) {
        this.toasterService.success('button + clicked');
    }

    emitClickCheckButtonEvents($event) {
        this.toasterService.success('button valide');
    }

    emitClickUpdateButtonEvents($event) {
        this.toasterService.success('update button clicked');
    }

}
