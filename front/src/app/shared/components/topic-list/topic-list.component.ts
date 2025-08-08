import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {IUserTopic} from '../../../interfaces/topic.interface';
import {TopicComponent} from '../topic/topic.component';
import {IUser} from '../../../interfaces/user.interface';
import {TopicService} from '../../../core/services/topic.service';
import {SessionService} from '../../../core/services/session.service';

@Component({
  selector: 'app-topic-list',
  imports: [
    NgForOf,
    TopicComponent
  ],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss'
})
export class TopicListComponent implements OnInit {
  @Input() user!: IUser;
  @Input() topics!: IUserTopic[];
  userTopicsIds!: string[];


  constructor(private topicService: TopicService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.userTopicsIds = this.user.topics.map(topic => topic.id);
  }


  public unsubscribeTopic(topicId: number): void {
    this.topicService.unsubscribeTopic(Number(topicId)).subscribe({
      next: (value) => {
        console.log(value);
        const updatedUser: IUser = {...this.user, topics: value.topics};
        this.sessionService.updateUser(updatedUser);
      },
      error: (error: any) => {
        console.log("error : ", error);
      }
    });
  }


}
