import {Component, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlChipsOption, Chip} from '@esedit-md/shared-ui';

@Component({
    selector: 'bl-chips-sample',
    templateUrl: './bl-chips-sample.component.html',
})
export class BlChipSampleComponent implements OnInit {
    options: BlChipsOption[] = [
        {
            label: 'Un poisson',
            value: '1',
            selected: true,
        },
        {
            label: 'Deux poisson',
            value: '2',
        },
        {
            label: 'Poisson accentué',
            value: '3',
            color: 'accent',
        }
    ]
    chips: Chip[] = [
        {name: 'Lemon'},
        {name: 'Lime'},
        {name: 'Apple'},
        {name: 'Watch'}
    ];

    constructor(public toasterService: ToasterService) {
    }

    ngOnInit(): void {
        this.ngOnInit()
    }

    public showToastClicChip(): void {
        this.toasterService.success('sample.datatable.event.chip-click');
    }

    public showToastClickCroix(): void {
        this.toasterService.success('sample.datatable.event.close');
    }

    selected(option: BlChipsOption) {
        this.toasterService.success('Option ' + option.value + (option.selected ? ' selected' : ' unselected'));
    }
}

