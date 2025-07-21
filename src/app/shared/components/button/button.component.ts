import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  standalone: true,
})
export class ButtonComponent {
  type = input<'button' | 'submit'>('button');
  label = input<string>('');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  clicked= output<Event>();
}
