import {Component} from '@angular/core';
import {BubbleColor, BubbleDirection, BubbleSize, IconClassEnum} from '@esedit-md/shared-ui';

@Component(
    {
        selector:'bl-bubble-icon-sample',
        templateUrl:'bl-bubble-icon-sample.component.html',
        styleUrls:['bl-bubble-icon-sample.component.scss']
    }
)
export class BlBubbleIconSampleComponent{
    redColor = BubbleColor.Red;
    orangeColor = BubbleColor.Orange;
    rightRotation = BubbleDirection.RIGHT;
    leftRotation = BubbleDirection.LEFT;
    upRotation = BubbleDirection.TOP;
    billyIcon = IconClassEnum.notify_fill;
    iconExample = IconClassEnum.video_fill;
    ninedoatsIcon = IconClassEnum.timer_fill;
    small= BubbleSize.S;
    medium = BubbleSize.M;
    large = BubbleSize.L;
  protected readonly BubbleDirection = BubbleDirection;
}
