import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {StaticBddService} from "../../../services/static-bdd.service";
import {ToasterService} from "@bl/shared";
import {PageEvent} from "@angular/material/paginator";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {BlAction} from "@esedit-md/shared-ui";

@Component({
  selector: 'bl-notification-modal-sample',
  templateUrl: './bl-notification-modal-sample.component.html',
  styleUrls: ['./bl-notification-modal-sample.component.scss'],
})
export class BlNotificationModalSampleComponent implements OnDestroy{
  public dataSource1;
  public count1 = 0;
  public pageIndex1 = 0;
  public pageSize1 = 5;

  public dataSource2;
  public count2 = 0;
  public pageIndex2 = 0;
  public pageSize2 = 3;

  public dataSource3;
  public count3 = 0;
  public pageIndex3 = 0;
  public pageSize3 = 3;

  public actionsHeader : BlAction[] = [];
  destroyEventsSubject$: Subject<void> = new Subject();
  public constructor(
    public BddService: StaticBddService,
    private toasterService: ToasterService,
    private router : Router)
  {
    this.BddService.initListNotification(true);
    this.refreshData(1, this.count1, this.pageIndex1, this.pageSize1);
    this.refreshData(2, this.count2, this.pageIndex2, this.pageSize2);
    this.refreshData(3, this.count3, this.pageIndex3, this.pageSize3);

    this.initActionsHeader();
  }
  private initActionsHeader() {
    const deleteAllAction : BlAction = {
      label: 'notification.button.deleteall',
      disabled: false,
      eventEmitter: new EventEmitter(),
    };
    deleteAllAction.eventEmitter?.pipe(takeUntil(this.destroyEventsSubject$))
      .subscribe((data: any) => {
        this.deleteAllnotifs2(data);
      });
    this.actionsHeader.push(deleteAllAction);

    const showAll : BlAction = {
      label: 'notification.button.seeAll',
      disabled: false,
      eventEmitter: new EventEmitter(),
    };
    showAll.eventEmitter?.pipe(takeUntil(this.destroyEventsSubject$))
      .subscribe((data: any) => {
        this.navigateNotifPage(data);
      });
    this.actionsHeader.push(showAll);

  }

  navigateNotifPage(data: any) {
    this.router.navigate(['/notif']);
  }
  consultItem(notificationItem) {
    this.toasterService.success("Consultation: "+notificationItem?.title)
  }

  deleteNotificationItem1(notificationItem) {
    this.BddService.deleteNotificationItem(notificationItem);
    this.refreshData(1, this.count1, this.pageIndex1, this.pageSize1);
  }
  deleteNotificationItem2(notificationItem) {
    this.BddService.deleteNotificationItem(notificationItem);
    this.refreshData(2, this.count2, this.pageIndex2, this.pageSize2);
  }
  deleteNotificationItem3(notificationItem) {
    this.BddService.deleteNotificationItem(notificationItem);
    this.refreshData(3, this.count3, this.pageIndex3, this.pageSize3);
  }
  readNotificationItem1(notification) {
    this.BddService.readNotificationItem(notification);
    this.refreshData(1, this.count1, this.pageIndex1, this.pageSize1);
  }
  readNotificationItem2(notification) {
    this.BddService.readNotificationItem(notification);
    this.refreshData(2, this.count2, this.pageIndex2, this.pageSize2);
  }
  readNotificationItem3(notification) {
    this.BddService.readNotificationItem(notification);
    this.refreshData(3, this.count3, this.pageIndex3, this.pageSize3);
  }
  unreadNotificationItem1(notification) {
    this.BddService.unreadNotificationItem(notification);
    this.refreshData(1, this.count1, this.pageIndex1, this.pageSize1);
  }
  unreadNotificationItem2(notification) {
    this.BddService.unreadNotificationItem(notification);
    this.refreshData(2, this.count2, this.pageIndex2, this.pageSize2);
  }
  unreadNotificationItem3(notification) {
    this.BddService.unreadNotificationItem(notification);
    this.refreshData(3, this.count3, this.pageIndex3, this.pageSize3);
  }
  /** used in the first exemple
   * @param event
   */
  deleteAllnotifs1(event: boolean) {
    this.BddService.destroyNotifications();
    this.refreshData(1, this.count1, this.pageIndex1, this.pageSize1);
  }
  deleteAllnotifs2(event: boolean) {
    this.BddService.destroyNotifications();
    this.refreshData(2, this.count2, this.pageIndex2, this.pageSize2);
  }

  refresh(event: PageEvent,sampleNumber:number) {
    console.log("event", event);
    this['pageIndex' + sampleNumber] = event.pageIndex;
    this['pageSize' + sampleNumber] = event.pageSize;
    this.refreshData(sampleNumber, this['count' + sampleNumber], this['pageIndex' + sampleNumber], this['pageSize' + sampleNumber]);
  }
  private refreshData(sampleNumber, count, pageIndex, pageSize) {
    count = this.BddService.getCountNotification();
    if (pageIndex * pageSize >= count) { // if we delete the last item of the last page
      pageIndex -= 1;
    }
    this['dataSource' + sampleNumber ]= this.BddService.getListNotificationItem(pageIndex, pageSize);

    //console.log("dataSource: ", this.dataSource)

  }

  clickMenu(event){
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroyEventsSubject$.next();
  }



}

