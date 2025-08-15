import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ITopic} from '../../../interfaces/topic.interface';
import {TopicComponent} from '../topic/topic.component';
import {IUser} from '../../../interfaces/user.interface';
import {TopicService} from '../../../core/services/topic.service';
import {SessionService} from '../../../core/services/session.service';

@Component({
  selector: 'app-topics-list',
  imports: [
    NgForOf,
    TopicComponent
  ],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.scss'
})
export class TopicsListComponent {
  @Input() user!: IUser;
  @Input() topics!: ITopic[];


  constructor(private topicService: TopicService, private sessionService: SessionService) {
  }


  public subscribeTopic(topicId: number): void {
    this.topicService.subscribeTopic(topicId).subscribe(({
      next: (response) => {
        const updatedUser: IUser = {...this.user, topics: response};
        this.sessionService.updateUser(updatedUser);
      },
    }))
  }

  public unsubscribeTopic(topicId: number): void {
    this.topicService.unsubscribeTopic(topicId).subscribe({
      next: (response) => {
        const updatedUser: IUser = {...this.user, topics: response};
        this.sessionService.updateUser(updatedUser);
      },
    });
  }

  public isSubscribedTopic(topicId: string): boolean {
    return this.user.topics.map(topic => topic.id).includes(topicId);
  }


}
