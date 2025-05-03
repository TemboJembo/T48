import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalEnergy: number = 0;
  newInnovations: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/dashboard-data').subscribe((data) => {
      console.log(data);  // Debugging line: Check if data is coming in correctly
      this.totalEnergy = data.total_energy;
      this.newInnovations = data.new_innovations;
    });
  }
}