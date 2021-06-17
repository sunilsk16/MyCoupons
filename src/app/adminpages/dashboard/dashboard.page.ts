import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ionViewDidEnter() {
   this.plotSimpleBarChart();
   this.plotSimplePieChart();
 }

  plotSimpleBarChart() {
      let myChart = HighCharts.chart('highcharts', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Coupons Consumption'
        },
        xAxis: {
          categories: ['Lunch', 'Dinner', 'Drinks']
        },
        yAxis: {
          title: {
            text: 'coupon used'
          }
        },
        series: [
          {
            name: 'Jan',
            type: undefined,
            data: [1, 0, 4]
          },
          {
            name: 'Feb',
            type: undefined,
            data: [5, 7, 3]
          }]
      });
    }

    plotSimplePieChart() {
    let myChart = HighCharts.chart('simplePie', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Coupons Used in January, 2021'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        type: undefined,
        data: [{
          name: 'Jan',
          y: 61.41,
          sliced: true,
          selected: true
        }, {
          name: 'Feb',
          y: 11.84
        }, {
          name: 'Mar',
          y: 10.85
        }, {
          name: 'Apr',
          y: 4.67
        }, {
          name: 'May',
          y: 4.18
        }, {
          name: 'June',
          y: 1.64
        }, {
          name: 'July',
          y: 1.6
        }, {
          name: 'Agu',
          y: 1.2
        }, {
          name: 'Sep',
          y: 2.61
        }]
      }]
    });
  }
}
