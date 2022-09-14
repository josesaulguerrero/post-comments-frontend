import { Injectable } from '@angular/core';
import { RxStompConfig, RxStomp } from '@stomp/rx-stomp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class STOMPService extends RxStomp {
  private WSEndpoint: string;

  constructor() {
    super();
    this.WSEndpoint = `${environment.GAMMA_URL}/ws`;
    super.configure(this.getConfig());
  }

  private getConfig(): RxStompConfig {
    return {
      brokerURL: this.WSEndpoint,
      reconnectDelay: 500,
    };
  }
}
