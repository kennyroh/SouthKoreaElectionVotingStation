import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElectionDayVotingStationComponent } from './components/election-day-voting-station/election-day-voting-station.component';
import { EarlyVotingStationComponent } from './components/early-voting-station/early-voting-station.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ElectionDayVotingStationComponent,
    EarlyVotingStationComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
