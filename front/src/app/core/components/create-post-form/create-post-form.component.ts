import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from '@angular/router';
import {ICreatePostFormStatus} from '../../../interfaces/post.interface';
import {ITopicOptions} from '../../../interfaces/topic.interface';
import {TopicService} from '../../services/topic.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-post-form',
  imports: [
    ButtonComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent implements OnInit, OnDestroy {
  createPostForm!: FormGroup;
  topicSubscription!: Subscription;
  topicOptions: ITopicOptions[] = [{label: "Sélectionner un thème", value: "", disabled: true}];
  formError: ICreatePostFormStatus = {
    status: false,
    message: ''
  }

  constructor(private fb: FormBuilder, private router: Router, private topicService: TopicService) {
  }

  ngOnInit() {

    this.topicSubscription = this.topicService.getAllTopics().subscribe(({
      next: (response) => {
        this.topicOptions = [...this.topicOptions, ...response.map((topic) => ({
          label: topic.title,
          value: topic.id,
          disabled: false
        }))];
      }
    }))
    this.createPostForm = this.fb.group({
      topic: ["", [Validators.required]],
      title: [null, [Validators.required, Validators.maxLength(55)]],
      content: [null, [Validators.required, Validators.maxLength(1000)]],
    }, {
      updateOn: "blur",
    })
  }

  invalidField(field: string): boolean {
    const ctrl = this.createPostForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  handleSubmit() {
    if (this.createPostForm.valid) {

    } else {
      this.createPostForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
