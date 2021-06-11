import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';
import { SingleBarComponent } from './single-bar/single-bar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LineProgressBarComponent } from './line-progress-bar/line-progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    SingleBarComponent,
    ProgressBarComponent,
    LineProgressBarComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
