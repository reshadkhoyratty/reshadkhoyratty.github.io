import {Component} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ToasterService} from '@bl/shared';
import {NotifDisplayMode, NotificationItem} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../services/static-bdd.service';

@Component({
    selector: 'bl-notification-sample',
    templateUrl: './bl-notification-sample.component.html',
    styleUrls: ['./bl-notification-sample.component.scss'],
})
export class BlNotificationSampleComponent {
    public dataSource: NotificationItem[] = [];
    public dataSourceDeletable: NotificationItem[] = [];

    public count = 0;
    public pageIndex = 0;
    public pageSize = 10;

    public constructor(
        public BddService: StaticBddService,
        private toasterService: ToasterService)
    {
        this.BddService.initListNotification(false);
        this.refreshData();
    }

    consultItem(notificationItem: NotificationItem) {
        this.toasterService.success("Consultation: "+ notificationItem.description)
    }

    deleteNotificationItem(notificationItem: NotificationItem) {
      this.toasterService.warning("Suppression: "+ notificationItem.title)

        this.BddService.deleteNotificationItem(notificationItem);
        this.refreshData();
    }

    readNotificationItem(notification: NotificationItem) {
        this.BddService.readNotificationItem(notification);
        this.refreshData();
    }

    unreadNotificationItem(notification: NotificationItem) {
        this.BddService.unreadNotificationItem(notification);
        this.refreshData();
    }

    deleteAll($event: boolean) {
        this.BddService.destroyNotifications();
        this.refreshData();
    }

    refresh(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.refreshData();
    }

    private refreshData() {
        this.count = this.BddService.getCountNotification();
        if (this.pageIndex * this.pageSize >= this.count) { // if we delete the last item of the last page
            this.pageIndex -= 1;
        }
        this.dataSource = this.BddService.getListNotificationItem(this.pageIndex, this.pageSize);
    }

  protected readonly NotifDisplayMode = NotifDisplayMode;
}
