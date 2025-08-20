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
  /** Current logged-in user */
  @Input({required: true}) user!: IUser;

  /** Array of topics to display */
  @Input({required: true}) topics!: ITopic[];

  constructor(private topicService: TopicService, private sessionService: SessionService) {
  }

  /** Subscribes the user to a topic and updates the session user */
  public subscribeTopic(topicId: number): void {
    this.topicService.subscribeTopic(topicId).subscribe({
      next: (response) => {
        const updatedUser: IUser = {...this.user, topics: response};
        this.sessionService.updateUser(updatedUser);
      },
    });
  }

  /** Unsubscribes the user from a topic and updates the session user */
  public unsubscribeTopic(topicId: number): void {
    this.topicService.unsubscribeTopic(topicId).subscribe({
      next: (response) => {
        const updatedUser: IUser = {...this.user, topics: response};
        this.sessionService.updateUser(updatedUser);
      },
    });
  }

  /** Checks if the user is subscribed to the specified topic */
  public isSubscribedTopic(topicId: string): boolean {
    return this.user.topics.map(topic => topic.id).includes(topicId);
  }
}
