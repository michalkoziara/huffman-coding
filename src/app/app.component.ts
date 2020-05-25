import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage = 'Kodowanie Huffmana - wprowadzenie';

  @ViewChild(MatSidenav) matSidenav: MatSidenav | undefined;

  menuListItemSelected(routerLink: string): void {
    if (this.matSidenav) {
      this.matSidenav.close();
    }

    if (routerLink == '/') {
      this.currentPage = 'Kodowanie Huffmana - wprowadzenie';
    }

    if (routerLink == '/huffman') {
      this.currentPage = 'Statyczne kodowanie Huffmana';
    }

    if (routerLink == '/fgk') {
      this.currentPage = 'Algorytm Fallera-Gallagera-Knutha';
    }

    if (routerLink == '/vitter') {
      this.currentPage = 'Algorytm Vittera';
    }
  }
}
