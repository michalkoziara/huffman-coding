import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnce} from './ensure-module-loaded-once.guard';
import {HuffmanComponent} from './huffman/huffman.component';
import {VitterComponent} from './vitter/vitter.component';
import {FgkComponent} from './fgk/fgk.component';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [
    HuffmanComponent,
    VitterComponent,
    FgkComponent
  ],
  providers: []
})
export class CoreModule extends EnsureModuleLoadedOnce {

  // Looks for the module in the parent injector to see if it's already been loaded
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
