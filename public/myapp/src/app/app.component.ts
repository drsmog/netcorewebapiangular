import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: HubConnection;
  nick = '';
  message = '';
  messages: string[] = [];
  title = 'app';
  values: any[];

  constructor(private http: HttpClient) { }

  async fetchData() {
    this.values = await this.http.get<any[]>('http://localhost:5000/api/values').toPromise();
    console.log(this.values);
  }

  ngOnInit() {
    this.nick = window.prompt('Your name:', 'John');

    this.hubConnection = new HubConnection('http://localhost:5000/chat');

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on('sendToAll', (nick: string, receivedMessage: string) => {
      const text = `${nick}: ${receivedMessage}`;
      this.messages.push(text);
    });

  }

  public sendMessage(): void {
    this.hubConnection
      .invoke('sendToAll', this.nick, this.message)
      .catch(err => console.error(err));
  }
}
