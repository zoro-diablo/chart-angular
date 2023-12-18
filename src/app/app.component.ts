import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'chartjs-angular';

  data: any;
  dataamount: any[] = [];
  datayear: any[] = [];
  datacolor: any[] = [];
  databorder: any[] = [];

  constructor(private _api: ApiService) {}

  ngOnInit() {
    this._api.showdata().subscribe((res) => {

      this.data = res;

      if (this.data != null) {
        for (let i = 0; i < this.data.length; i++) {
          this.datayear.push(this.data[i].year);
          this.dataamount.push(this.data[i].amount);
          this.datacolor.push(this.data[i].color);
          this.databorder.push(this.data[i].borderColor);
        }
      }

      this.showChartData(
        this.datayear,
        this.dataamount,
        this.datacolor,
        this.databorder
      );
    });
  }

  showChartData(
    datayear: any,
    dataamount: any,
    datacolor: any,
    databorder: any
  ) {
    Chart.register(...registerables);
    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: datayear,
        datasets: [
          {
            label: '# of Votes',
            data: dataamount,
            borderWidth: 1,
            backgroundColor: datacolor,
            borderColor: databorder,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
