import {Component, OnInit} from '@angular/core';
import {TopicListComponent} from '../../shared/components/topic-list/topic-list.component';
import {ITopic} from '../../interfaces/topic.interface';
import {TopicService} from '../../core/services/topic.service';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';
import {SessionService} from '../../core/services/session.service';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-topics',
  imports: [
    TopicListComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {
  public user$!: Observable<IUser | undefined>;
  public topics!: ITopic[];

  constructor(private topicService: TopicService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.user$ = this.sessionService.user$;
    this.topicService.getAllTopics().subscribe({
      next: (topics: ITopic[]) => this.topics = topics
    });
  }
}
