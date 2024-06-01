import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Dropdown hover effect
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');

      if (window.innerWidth > 991) {
        this.renderer.listen(dropdown, 'mouseenter', () => {
          if (dropdownMenu) {
            this.renderer.addClass(dropdownMenu, 'show');
          }
        });

        this.renderer.listen(dropdown, 'mouseleave', event => {
          if (!dropdown.contains(event.relatedTarget)) {
            if (dropdownMenu) {
              this.renderer.removeClass(dropdownMenu, 'show');
            }
          }
        });

        if (dropdownMenu) {
          this.renderer.listen(dropdownMenu, 'mouseleave', event => {
            if (!dropdown.contains(event.relatedTarget)) {
              this.renderer.removeClass(dropdownMenu, 'show');
            }
          });
        }
      }
    });
  }
}
