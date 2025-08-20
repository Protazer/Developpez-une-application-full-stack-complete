import {Component, OnInit} from '@angular/core';
import {ITopic} from '../../interfaces/topic.interface';
import {TopicService} from '../../core/services/topic.service';
import {Observable} from 'rxjs';
import {IUser} from '../../interfaces/user.interface';
import {SessionService} from '../../core/services/session.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoaderComponent} from '../../shared/components/loader/loader.component';
import {TopicsListComponent} from '../../shared/components/topics-list/topics-list.component';

@Component({
  selector: 'app-topics',
  imports: [
    TopicsListComponent,
    AsyncPipe,
    NgIf,
    LoaderComponent,
    TopicsListComponent
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {

  /** Observable of the current logged user, or undefined if none */
  public user$!: Observable<IUser | undefined>;

  /** List of available topics */
  public topics!: ITopic[];

  /**
   * Creates an instance of TopicsComponent.
   * @param topicService Service for fetching topics
   * @param sessionService Service managing user session
   */
  constructor(private topicService: TopicService, private sessionService: SessionService) {
  }

  /**
   * Initializes component data by subscribing to user session and fetching topics.
   */
  ngOnInit() {
    this.user$ = this.sessionService.user$;
    this.topicService.getAllTopics().subscribe({
      next: (topics: ITopic[]) => this.topics = topics
    });
  }
}
