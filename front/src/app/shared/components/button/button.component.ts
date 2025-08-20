import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /**
   * Variant style of the button.
   * Can be "default" or "primary".
   * Defaults to "default".
   */
  @Input() variant: "default" | "primary" = "default";

  /**
   * Indicates whether the button is disabled.
   * Optional.
   */
  @Input() disabled?: boolean;

  /**
   * Text content displayed inside the button.
   * Required.
   */
  @Input() content!: string;
}
