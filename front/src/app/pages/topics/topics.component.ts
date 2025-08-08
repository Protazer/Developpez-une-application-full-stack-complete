import {Component, OnInit} from '@angular/core';
import {TopicListComponent} from '../../shared/components/topic-list/topic-list.component';

@Component({
  selector: 'app-topics',
  imports: [
    TopicListComponent
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent implements OnInit {

  ngOnInit() {

  }
}
