import { Injectable, signal } from '@angular/core';

interface Alert {
    status:  number;
    message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertMainService {
  private _alert = signal<Alert>({ status: 0, message: 'Empty'});
  public confirmCallback: (() => void) | null = null;

  public setAlert(status: number, message: string): void {
    const alert: Alert = {
        status: status,
        message: message
    }

    this._alert.set(alert);
  }

  public delayedLoader(): NodeJS.Timeout {
    return setTimeout(() => {
      this.setAlert(999, "");
    }, 500);
  }

  public loader(): void {
    this.setAlert(999, "");
  }

  public clean(): void {
    this._alert.set({ status: 0, message: 'Empty' });
  }

  public getAlert(): Alert {
    return this._alert();
  }
}
