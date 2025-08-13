import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICreatePostRequest, IPost} from '../../interfaces/post.interface';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    topicApiPath = '/api/posts';

    constructor(private http: HttpClient) {
    }

    public getAllPosts() {
        return this.http.get<IPost[]>(this.topicApiPath);
    }

    public getPost(id: number): Observable<IPost> {
        return this.http.get<IPost>(`${this.topicApiPath}/${id}`);
    }

    public createPost(post: ICreatePostRequest) {
        return this.http.post(this.topicApiPath, post);
    }
}
