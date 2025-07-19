import { Component, input } from '@angular/core';

@Component({
  selector: 'app-google-button',
  imports: [],
  templateUrl: './google-button.component.html',
  styleUrl: './google-button.component.css'
})
export class GoogleButtonComponent {
  label = input<string>('');
}
