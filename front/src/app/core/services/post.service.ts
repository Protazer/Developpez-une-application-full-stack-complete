import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICreatePostRequest, IPost} from '../../interfaces/post.interface';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    postApiPath = '/api/posts';

    constructor(private http: HttpClient) {
    }

    public getAllPosts() {
        return this.http.get<IPost[]>(this.postApiPath);
    }

    public getPost(id: number): Observable<IPost> {
        return this.http.get<IPost>(`${this.postApiPath}/${id}`);
    }

    public createPost(post: ICreatePostRequest) {
        return this.http.post(this.postApiPath, post);
    }
}
