import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from '@angular/router';
import {ICreatePostFormStatus} from '../../../interfaces/post.interface';
import {ITopicOptions} from '../../../interfaces/topic.interface';
import {TopicService} from '../../services/topic.service';
import {Subscription} from 'rxjs';
import {PostService} from '../../services/post.service';

/**
 * Component responsible for rendering and managing the create post form.
 */
@Component({
  selector: 'app-create-post-form',
  imports: [
    ButtonComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass,
  ],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent implements OnInit, OnDestroy {

  /**
   * Reactive form group for the post creation form.
   */
  createPostForm!: FormGroup;

  /**
   * Subscription to the topic service used for cleanup.
   */
  topicSubscription!: Subscription;

  /**
   * List of topic options used in the topic selection dropdown.
   */
  topicOptions: ITopicOptions[] = [{label: "Sélectionner un thème", value: "", disabled: true}];

  /**
   * Status of the form submission, including success or error message.
   */
  formStatus: ICreatePostFormStatus = {
    status: false,
    message: ''
  };

  /**
   * Creates an instance of CreatePostFormComponent.
   * @param fb FormBuilder instance for creating the form group.
   * @param router Angular Router used for navigation after submission.
   * @param topicService Service for fetching available topics.
   * @param postService Service for creating a new post.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private topicService: TopicService,
    private postService: PostService
  ) {
  }

  /**
   * Initializes the form and subscribes to the topic list.
   */
  ngOnInit(): void {
    this.topicSubscription = this.topicService.getAllTopics().subscribe({
      next: (response) => {
        this.topicOptions = [
          ...this.topicOptions,
          ...response.map((topic) => ({
            label: topic.title,
            value: topic.id,
            disabled: false
          }))
        ];
      }
    });

    this.createPostForm = this.fb.group({
      topicId: ["", [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(255)]],
      content: [null, [Validators.required]],
    }, {
      updateOn: "blur",
    });
  }

  /**
   * Checks if a specific form field is invalid and touched/dirty.
   * @param field Name of the form control.
   * @returns True if the field is invalid and has been interacted with.
   */
  invalidField(field: string): boolean {
    const ctrl = this.createPostForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /**
   * Handles form submission.
   * If the form is valid, it sends the data via the post service.
   * Otherwise, it marks all controls as touched to trigger validation.
   */
  handleSubmit(): void {
    if (this.createPostForm.valid) {
      this.postService.createPost(this.createPostForm.value).subscribe({
        next: _ => {
          this.router.navigateByUrl("/posts");
        },
        error: (err) => {
          this.formStatus = {
            status: true,
            type: "error",
            message: err.error.message
          };
        }
      });
    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

  /**
   * Cleans up the topic subscription when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
  }
}
