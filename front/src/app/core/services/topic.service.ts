import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITopic} from '../../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topicApiPath = '/api/topics';

  constructor(private http: HttpClient) {
  }

  public getAllTopics() {
    return this.http.get<ITopic[]>(this.topicApiPath);
  }

  public unsubscribeTopic(topicId: number) {
    return this.http.put<ITopic[]>(`${this.topicApiPath}/unsubscribe/${topicId}`, topicId)
  }

  public subscribeTopic(topicId: number) {
    return this.http.put<ITopic[]>(`${this.topicApiPath}/subscribe/${topicId}`, topicId);
  }
}
