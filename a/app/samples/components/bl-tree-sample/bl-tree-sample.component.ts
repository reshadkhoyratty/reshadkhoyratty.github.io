import {Component, EventEmitter} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlAction, FlatNode, TreeModel} from '@esedit-md/shared-ui';
import {ACTION_ADD, getButtonInstance} from '../../components/tables-samples/bl-datatable-sample/bl-factory-action-button';

@Component({
    selector: 'bl-tree-sample',
    templateUrl: './bl-tree-sample.component.html'
})
export class BlTreeSampleComponent {
    public data: TreeModel[];
    public actions: BlAction [];

    public constructor(public toasterService: ToasterService) {
        const addAction = getButtonInstance(ACTION_ADD);
        addAction.eventEmitter = new EventEmitter<FlatNode>();
        addAction.eventEmitter.subscribe(() => {
            this.toasterService.success('sample.datatable.action.call.event');
        });
        this.actions = [addAction];
        this.data = [
            {
                key: 1,
                name: 'Fruit',
                displayAction: false,
                children: [{key: 11, name: 'Apple', limitedAcces: [{idAction: 'add', disabled: true}]}, {
                    key: 12,
                    name: 'Banana'
                }, {key: 13, name: 'Fruit loops'}],
            },
            {
                key: 2,
                name: 'Vegetables',
                displayAction: false,
                children: [
                    {
                        key: 21,
                        name: 'Green',
                        displayAction: false,
                        children: [{key: 221, name: 'Broccoli'}, {key: 222, name: 'Brussels sprouts'}],
                    },
                    {
                        key: 3,
                        name: 'Orange',
                        displayAction: false,
                        children: [{
                            key: 31,
                            name: 'Pumpkins',
                            limitedAcces: [{idAction: 'add', disabled: true}]
                        }, {key: 32, name: 'Carrots'}],
                    },
                ],
            }, {
                key: 4, name: 'vehicle', displayAction: false, children: [{
                    key: 41, name: 'engine', displayAction: false, children:
                        [{
                            key: 411,
                            name: '4 wheel',
                            displayAction: false,
                            children: [{key: 4111, name: 'car'}, {key: 4112, name: 'bus'}]
                        },
                            {key: 412, name: '2 wheel', displayAction: false, children: [{key: 4121, name: 'moto'}]}
                        ]
                }]
            }

        ];
    }

}
