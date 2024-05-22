import {Component, EventEmitter,  OnInit} from '@angular/core';
import {BlAction, BlDashboardData, BlSnackbarService} from '@esedit-md/shared-ui';

@Component(
  {
    selector:'bl-dashboard-list-sample',
    templateUrl:'bl-dashboard-list-sample.component.html',
    styleUrls:['bl-dashboard-list-sample.component.scss']
  }
)
export class BlDashboardListSampleComponent implements  OnInit{
    routingModeData: Map<any, BlDashboardData> = new Map<string, BlDashboardData>() ;
    routingModeDataV2: Map<any, BlDashboardData> = new Map<string, BlDashboardData>() ;
    eventData:Map<any,BlDashboardData> = new Map<number,BlDashboardData>();
    searchButon :BlAction = {idAction:'exampleId',eventEmitter:new EventEmitter<any>};
    userSelected = new Map<any,BlDashboardData> ;
    constructor(private snackbarService: BlSnackbarService) {
     this.setData1();
     this.setData1V2();
     this.setData2();
        this.searchButon.eventEmitter?.subscribe(()=>this.researchClicked());

    }
    ngOnInit() {}

    setData1(){
        /** The key dosen't have a specefic type  **/
        this.routingModeData.set(1, {router: 'style/button', value: ['Boutons','normal']});
        this.routingModeData.set('key2', {router: 'style/split-button', value: ['Boutons', ' menu ']});
        this.routingModeData.set(true, {router: 'basic/decimal', value: ['Base', 'Décimal']});
        this.routingModeData.set('key4', {router: 'basic/year-picker', value: ['Date ', 'Picker']});
    }
    setData1V2(){
        /** The key dosen't have a specefic type  **/
        this.routingModeDataV2.set(1, {router: 'style/button', value: ['Boutons',' normal','normal']});
        this.routingModeDataV2.set('key2', {router: 'style/split-button', value: ['Boutons', 'menu ','menu']});
        this.routingModeDataV2.set(true, {router: 'basic/decimal', value: ['Base', 'Décimal','decimal']});
        this.routingModeDataV2.set('key4', {router: 'basic/year-picker', value: ['Date ', 'Picker','picker']});
    }
    setData2(){
        this.eventData.set('FD1', {value: ['Jon', 'Jones','DNR2001','F01']});
        this.eventData.set('FD2', {value: ['Dustin', 'Poirier','DNR2002','F333']});
        this.eventData.set(false, { value: ['TOM', 'HANKS','DNR2003','F22']});
        this.eventData.set('AV002', { value: ['Ritual ', 'Alfred','MCC','En cours']});
        this.eventData.set('AV502', { value: ['Berger ', 'Levrault','GFA1','F5677']});
        this.eventData.set(99, { value: ['ADS ', 'WPA','GFA1','F5677']});
    }
    openSuccessSnackBar(){
     this.snackbarService.openSuccessSnackBar("événement en cours",false);
    }
    researchClicked(){this.searchButon.eventEmitter?.subscribe(()=>this.openSuccessSnackBar())};

    handleRowClick($event: Map<any, BlDashboardData>) {
        /**You get the row (key,value) as output then can do treatment based on that
         * For the example we will just show a snackBar
        **/
        this.snackbarService.openSuccessSnackBar("événement en cours",false);
    }
}
