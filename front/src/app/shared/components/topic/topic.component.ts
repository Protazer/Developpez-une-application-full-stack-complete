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

  /** Topic data input, required */
  @Input({required: true}) topic!: ITopic;

  /** Indicates if the user is subscribed to this topic */
  @Input({required: true}) subscribedToUser: boolean = false;

  /** Event emitted when unsubscribing */
  @Output() unsubscribeTopic = new EventEmitter<number>();

  /** Event emitted when subscribing */
  @Output() subscribeTopic = new EventEmitter<number>();

  /** Label for the topic action button */
  topicActionLabel!: "Se Désabonner" | "S'abonner" | "Déja abonné !";

  /** Flag indicating if unsubscribe action is allowed */
  canUnsubscribe: boolean = false;

  constructor(private router: Router) {
  }

  /** Initialize unsubscribe flag based on current route and subscription */
  ngOnInit() {
    this.canUnsubscribe = this.router.url.includes('/profile') && this.subscribedToUser;
  }

  /** Update the topic action label when inputs change */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canUnsubscribe'] || changes['subscribedToUser']) {
      this.topicActionLabel = this.getTopicActionLabel();
    }
  }

  /** Returns the appropriate label for the subscribe/unsubscribe button */
  getTopicActionLabel() {
    if (this.canUnsubscribe && this.subscribedToUser) {
      return "Se Désabonner";
    } else if (!this.canUnsubscribe && !this.subscribedToUser) {
      return "S'abonner";
    } else {
      return "Déja abonné !";
    }
  }

  /** Handles subscribe or unsubscribe button click */
  handleOnSubscribe() {
    if (this.subscribedToUser && this.canUnsubscribe) {
      this.unsubscribeTopic.emit(Number(this.topic.id));
    } else {
      this.subscribeTopic.emit(Number(this.topic.id));
    }
  }
}
