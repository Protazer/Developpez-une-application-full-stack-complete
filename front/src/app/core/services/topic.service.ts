import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITopic} from '../../interfaces/topic.interface';

/**
 * Service managing topics including fetching all topics,
 * subscribing to and unsubscribing from a topic.
 */
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  /**
   * Base API path for topic endpoints.
   */
  topicApiPath = '/api/topics';

  /**
   * Creates an instance of TopicService.
   * @param http Angular HttpClient to perform HTTP requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Fetches all available topics.
   * @returns An Observable emitting an array of topics.
   */
  public getAllTopics() {
    return this.http.get<ITopic[]>(this.topicApiPath);
  }

  /**
   * Unsubscribes the current user from a specific topic.
   * @param topicId The ID of the topic to unsubscribe from.
   * @returns An Observable emitting the updated list of topics.
   */
  public unsubscribeTopic(topicId: number) {
    return this.http.put<ITopic[]>(`${this.topicApiPath}/unsubscribe/${topicId}`, topicId);
  }

  /**
   * Subscribes the current user to a specific topic.
   * @param topicId The ID of the topic to subscribe to.
   * @returns An Observable emitting the updated list of topics.
   */
  public subscribeTopic(topicId: number) {
    return this.http.put<ITopic[]>(`${this.topicApiPath}/subscribe/${topicId}`, topicId);
  }
}
