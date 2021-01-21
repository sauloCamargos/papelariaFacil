import { Injectable, EventEmitter } from '@angular/core';
import { EventEmitted } from '../interfaces/event-emitted';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  emitter = new EventEmitter();

  constructor() { }

  send(data: EventEmitted) {
    this.emitter.emit(data);
  }

}
