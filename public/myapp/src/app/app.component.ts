import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  values: any[];

  constructor(private http: HttpClient) { }

  async fetchData() {
    this.values = await this.http.get<any[]>('http://localhost:5000/api/values').toPromise();
    console.log(this.values);
  }
}
