import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ITopic} from '../../../interfaces/topic.interface';
import {Router} from '@angular/router';
import {ButtonComponent} from '../button/button.component';
import {TruncatePipe} from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-topic',
  imports: [
    ButtonComponent,
    TruncatePipe
  ],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent implements OnInit, OnChanges {

  @Input({required: true}) topic!: ITopic
  @Input() subscribedToUser: boolean = false;
  @Input() subscribedTopic!: (id: number) => void;
  @Output() unsubscribeTopic = new EventEmitter<number>();
  @Output() subscribeTopic = new EventEmitter<number>();

  topicActionLabel!: "Se Désabonner" | "S'abonner" | "Déja abonné !";

  canUnsubscribe: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.canUnsubscribe = this.router.url.includes('/profile') && this.subscribedToUser;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canUnsubscribe'] || changes['subscribedToUser']) {
      this.topicActionLabel = this.getTopicActionLabel();
    }
  }

  getTopicActionLabel() {
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
      this.unsubscribeTopic.emit(Number(this.topic.id));
    } else {
      this.subscribeTopic.emit(Number(this.topic.id));
    }
  }
}
