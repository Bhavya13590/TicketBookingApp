import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsListingComponent } from './events-listing/events-listing.component';
import { EventBookingsComponent } from './event-bookings/event-bookings.component';

const routes: Routes = [
  {path:"", component:EventsListingComponent},
  {path:"bookings", component:EventBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
