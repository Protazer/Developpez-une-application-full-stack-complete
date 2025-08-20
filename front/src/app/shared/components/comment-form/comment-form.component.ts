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

  /**
   * Reactive form group for the comment input.
   */
  public commentForm!: FormGroup;

  /**
   * Object holding the form error status and message.
   */
  formError: ICommentFormStatus = {
    status: false,
    message: ''
  }

  /**
   * Icon for the submit button.
   */
  public faPaperPlane = faPaperPlane;

  /**
   * Event emitted when a valid comment is submitted.
   * Emits an object with a `content` string property.
   */
  @Output() submitComment = new EventEmitter<{ content: string }>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: [null, Validators.required],
    }, {updateOn: 'blur'});
  }

  /**
   * Checks whether a form field is invalid and has been touched or modified.
   * @param field - The name of the form control to check.
   * @returns True if the field is invalid and dirty or touched, false otherwise.
   */
  invalidField(field: string): boolean {
    const ctrl = this.commentForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  /**
   * Handles form submission.
   * Emits the comment content if valid, otherwise marks all fields as touched to show validation errors.
   */
  handleSubmit() {
    if (this.commentForm.valid) {
      this.submitComment.emit(this.commentForm.value);
      this.commentForm.reset();
    } else {
      this.commentForm.markAllAsTouched();
    }
  }
}
