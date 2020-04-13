import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentSite = 'Kodowanie Huffmana - wprowadzenie';

  @ViewChild(MatSidenav) matSidenav: MatSidenav | undefined;

  menuListItemSelected(routerLink: string): void {
    if (this.matSidenav) {
      this.matSidenav.close();
    }

    if (routerLink == '/') {
      this.currentSite = 'Kodowanie Huffmana - wprowadzenie';
    }

    if (routerLink == '/huffman') {
      this.currentSite = 'Kodowanie Huffmana';
    }

    if (routerLink == '/fgk') {
      this.currentSite = 'Algorytm Fallera-Gallagera-Knutha';
    }

    if (routerLink == '/vitter') {
      this.currentSite = 'Algorytm Vittera';
    }
  }
}
