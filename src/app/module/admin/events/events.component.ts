import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router){

  }

  registerNow() {
    this.router.navigateByUrl('ui-ux/').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}
