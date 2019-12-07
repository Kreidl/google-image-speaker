import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_PATH as TEXT_BASE_PATH } from '../variables';
import { BASE_PATH as IMAGE_BASE_PATH } from '../variables';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: TEXT_BASE_PATH, useValue: environment.API_BASE_PATH + environment.TEXT_SERVICE_PATH },
    { provide: IMAGE_BASE_PATH, useValue: environment.API_BASE_PATH + environment.IMAGE_SERVICE_PATH }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
