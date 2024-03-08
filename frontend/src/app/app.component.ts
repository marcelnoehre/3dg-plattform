import { Component, HostListener, OnInit } from '@angular/core';
import { DeviceService } from './services/device.service';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private _device: DeviceService,
    private _event: EventService
  ) { }

  ngOnInit(): void {
    this._device.init();
  }

  @HostListener('document:click', ['$event'])
	documentClick(event: any): void {
		this._event.documentClick$.next(event.target);
	}
  
}
