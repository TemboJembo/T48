import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/api/chart/summary', { headers }).subscribe((data) => {
      this.createChart(data);
    });
  }

  createChart(data: any): void {
    const canvas = document.getElementById('summaryChart') as HTMLCanvasElement;

    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Energy Source Distribution',
            data: data.data, // use `data.data` not `data.values`
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        }
      });
    }
  }
}