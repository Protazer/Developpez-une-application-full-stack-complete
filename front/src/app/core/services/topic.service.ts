import {Injectable} from '@angular/core';
import {IUserTopic, IUserTopicList} from '../../interfaces/topic.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topicApiPath = '/api/topics';

  constructor(private http: HttpClient) {
  }

  public getAllTopics() {
    return this.http.get<IUserTopic>(this.topicApiPath);
  }

  public unsubscribeTopic(topicId: number) {
    return this.http.put<IUserTopicList>(`${this.topicApiPath}/unsubscribe/${topicId}`, topicId)
  }

  public subscribeTopic(topicId: number) {
    return this.http.put<IUserTopicList>(`${this.topicApiPath}/subscribe/${topicId}`, topicId);
  }
}
