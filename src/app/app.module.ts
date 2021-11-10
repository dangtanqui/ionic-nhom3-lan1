import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InfoStudentPage } from './pages/info-student/info-student.page';
import { FormsModule } from '@angular/forms';
import { AddLopPage } from './pages/add-lop/add-lop.page';
import { AddStudentPage } from './pages/add-student/add-student.page';
import { UpdateLopPage } from './pages/update-lop/update-lop.page';

@NgModule({
  declarations: [
    AppComponent,
    AddLopPage,
    AddStudentPage,
    InfoStudentPage,
    UpdateLopPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
