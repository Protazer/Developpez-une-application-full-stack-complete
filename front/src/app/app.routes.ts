import {Routes} from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';
import {UnauthGuard} from './core/guards/unauth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {TopicsComponent} from './pages/topics/topics.component';
import {PostDetailsComponent} from './pages/post-details/post-details.component';
import {CreatePostComponent} from './pages/create-post/create-post.component';


export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [UnauthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [UnauthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'topics', component: TopicsComponent, canActivate: [AuthGuard]},
];
