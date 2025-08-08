import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUserTopic} from '../../../interfaces/topic.interface';
import {Router} from '@angular/router';
import {ButtonComponent} from '../button/button.component';
import {TruncatePipe} from '../../pipes/truncate.pipe';
import {TopicService} from '../../../core/services/topic.service';

@Component({
  selector: 'app-topic',
  imports: [
    ButtonComponent,
    TruncatePipe
  ],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent implements OnInit {

  @Input({required: true}) topic!: IUserTopic
  @Input() subscribedToUser: boolean = false;
  @Input() subscribedTopic!: (id: number) => void;
  @Output() unsubscribedTopic = new EventEmitter<number>();

  canUnsubscribe: boolean = false;

  constructor(private router: Router, private topicService: TopicService) {
  }

  ngOnInit() {
    this.canUnsubscribe = this.router.url.includes('/profile') && this.subscribedToUser;
  }

  getTopicAction() {
    if (this.canUnsubscribe && this.subscribedToUser) {
      return "Se Désabonner";
    } else if (!this.canUnsubscribe && !this.subscribedToUser) {
      return "S'abonner"
    } else {
      return "Déja abonné !"
    }
  }

  handleOnSubscribe() {
    if (this.subscribedToUser && this.canUnsubscribe) {
      console.log("Unsubscribe to User");
      this.unsubscribedTopic.emit(Number(this.topic.id))
    } else {
      console.log("subscribe to User");
      this.topicService.subscribeTopic(Number(this.topic.id));
    }

  }

}
