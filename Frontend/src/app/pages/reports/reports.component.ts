import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  chart: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/api/chart/reports', { headers }).subscribe((data) => {
      this.createChart(data);
    });
  }

  createChart(data: any): void {
    const canvas = document.getElementById('reportsChart') as HTMLCanvasElement;

    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Yearly Clean Energy Growth',
            data: data.data,
            backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'],
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }
  }
}