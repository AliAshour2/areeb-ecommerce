import { CommonModule } from '@angular/common';
import { Component, computed, input, model, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
})
export class SidebarComponent {
  activeMenu = input<string>('shop');
  menuChange = output<string>();
  collapsed = model<boolean>(false);
  private readonly _isCollapsed = signal(false);

  readonly isCollapsed = computed(() => this._isCollapsed());
  readonly sidebarClasses = computed(() => ({
    'w-16': this.isCollapsed(),
    'w-64': !this.isCollapsed(),
    'md:w-52': !this.isCollapsed(),
    'sm:w-16': true,
  }));

  readonly menuItems = signal<Record<string, string>[]>([
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About', },
    { id: 'contact', label: 'Contact' },
    { id: 'blog', label: 'Blog' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'cart', label: 'Cart' },
  ]);

  setActiveMenu(menu: string) {
    this.menuChange.emit(menu);
  }

  toggleSidebar() {
    this._isCollapsed.update((collapsed) => !collapsed);
    this.collapsed.set(this._isCollapsed());
  }

  getMenuItemClasses(item: Record<string, string>) {
    return {
      'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg':
        this.activeMenu() === item['id'],
      'bg-slate-700': this.activeMenu() !== item['id'],
    };
  }
}
