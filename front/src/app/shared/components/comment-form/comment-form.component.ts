import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ICommentFormStatus} from '../../../interfaces/comment.interface';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-comment-form',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss'
})
export class CommentFormComponent implements OnInit {

  public commentForm!: FormGroup;

  formError: ICommentFormStatus = {
    status: false,
    message: ''
  }
  public faPaperPlane = faPaperPlane;

  @Output() submitComment = new EventEmitter<{ content: string }>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    }, {updateOn: 'blur'})
  }

  invalidField(field: string): boolean {
    const ctrl = this.commentForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  handleSubmit() {
    if (this.commentForm.valid) {
      this.submitComment.emit(this.commentForm.value);
      this.commentForm.reset();
    } else {
      this.commentForm.markAllAsTouched();
    }
  }
}
