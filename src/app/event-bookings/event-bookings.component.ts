import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events-listing/events.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-event-bookings',
  templateUrl: './event-bookings.component.html',
  styleUrls: ['./event-bookings.component.css']
})
export class EventBookingsComponent implements OnInit {

  eventName;
  seats;
  seatsArr =[1,2,3,4,5,6];
  NoOfAttendees;
  attndess =[]
  name1;
  form1 :FormGroup;
  attendees: FormArray;
  //attendees =[];
  submitted = false;
  errmsg = false;
  successmsg= false;
  data;
  constructor(private events1:EventsService, private route: ActivatedRoute, private builder:FormBuilder,
              private loc: Location) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.eventName = params.name;
        this.seats =params.seats;
      });
      this.form1 = this.builder.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        email: ['', [Validators.required, Validators.email]],
        number: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        seats: ['', [Validators.required, this.specificValueInsideRange.bind(this)]],
        // attendees: this.builder.array([ this.createItem(1) ])
      });

      this.changeInSeats(1);
  }

  createItem(i): FormGroup {
    return this.builder.group({
      attendees: [this.name1, Validators.required]
    });
  }

  addItem(i): void {
    this.attendees = this.form1.get('attendees') as FormArray;
    //this.attendees=[];
    this.attendees.push(this.createItem(i));
  }

  changeInSeats(value){
    this.attndess = [];
    this.NoOfAttendees = value;
    if(this.NoOfAttendees > 1){
      this.form1.addControl('attendees',this.builder.array([]) );
        for(let i=2; i<=this.NoOfAttendees ;i++){
             this.attndess.push('Attendee' +i);
            this.addItem(i);
        }
    }
  }

  get f() { return this.form1.controls; }

onSubmit() {
  this.submitted = true;
  console.log(this.form1);
  if (this.form1.invalid) {
    return;
}
if (this.form1.valid) {
  this.successmsg=true;
  this.data = JSON.stringify(this.form1.value)
  console.log('Booking Details' ,this.form1.value);
}
}

specificValueInsideRange(group: FormGroup) {
  if(group.value > this.seats ) {
    return {
      outsideRange: true
    };
  }
}

Cancel(){
  this.loc.back();
}
}
