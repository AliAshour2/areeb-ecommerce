import { Component, input , output, SimpleChanges } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';


@Component({
  selector: 'app-modal',
  imports: [ClickOutsideDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone : true ,
})
export class ModalComponent {
  isOpen =input<boolean>(false);
  showClose =input<boolean>(true);
  closeOnOverlayClick =input<boolean>(true);
  close = output<void>();


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen()) {
        this.disableBodyScroll();
      } else {
        this.enableBodyScroll();
      }
    }
  }

  ngOnDestroy() {
    this.enableBodyScroll();
  }

  onOverlayClick() {
    if (this.closeOnOverlayClick()) {
      this.closeModal();
    }
  }

  private closeModal() {
    this.enableBodyScroll();
    this.close.emit();
  }

  private disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll() {
    document.body.style.overflow = '';
  }
}
