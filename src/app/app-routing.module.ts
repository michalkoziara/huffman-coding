import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FgkComponent} from './core/fgk/fgk.component';
import {HuffmanComponent} from './core/huffman/huffman.component';
import {VitterComponent} from './core/vitter/vitter.component';

const appRoutes: Routes = [
  {path: 'fgk', component: FgkComponent},
  {path: 'huffman', component: HuffmanComponent},
  {path: 'vitter', component: VitterComponent},
  {path: '', component: HuffmanComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
