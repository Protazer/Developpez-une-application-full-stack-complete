import {Component} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CreatePostFormComponent} from '../../core/components/create-post-form/create-post-form.component';
import {Router} from '@angular/router';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post',
  imports: [
    FaIconComponent,
    CreatePostFormComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  protected faArrowLeft = faArrowLeft;

  constructor(private router: Router,) {
  }

  handleNavigateToPost() {
    this.router.navigateByUrl('/posts');
  }

}
