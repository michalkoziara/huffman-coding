import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../angular-material.module';
import {EnsureModuleLoadedOnce} from './ensure-module-loaded-once.guard';
import {HuffmanComponent} from './huffman/huffman.component';
import {VitterComponent} from './vitter/vitter.component';
import {FgkComponent} from './fgk/fgk.component';
import {TreantTreeComponent} from './treant-tree/treant-tree.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    HuffmanComponent,
    VitterComponent,
    FgkComponent,
    TreantTreeComponent
  ],
  providers: []
})
export class CoreModule extends EnsureModuleLoadedOnce {

  // Looks for the module in the parent injector to see if it's already been loaded
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
