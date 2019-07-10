import { Component, OnInit } from '@angular/core';
import { EventsService } from './events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-listing',
  templateUrl: './events-listing.component.html',
  styleUrls: ['./events-listing.component.css']
})
export class EventsListingComponent implements OnInit {

  eventsList;
  eventsDisplay;

  constructor(private events: EventsService, private router:Router) { }

  ngOnInit() {
    this.events.getEventsList().subscribe(x => {
      this.eventsList = x;
      this.eventsDisplay = this.eventsList.events;
    })
  }

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
      return value.filter(function (item) {
        if(item){
          return  JSON.stringify(item.name? item.name : "").toLowerCase().includes(args);
        }
      });
  }

  transform2(args?: any) {
    this.eventsDisplay = this.eventsList.events;
    let dummy = this.transform(this.eventsDisplay, args)
    this.eventsDisplay = dummy;
  }

  NavigateToEventBookings(event){
    this.router.navigate(["/bookings"], { queryParams: { name: event.name, 'seats': event.seats } });
  }


}
