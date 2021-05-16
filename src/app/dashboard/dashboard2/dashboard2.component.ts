import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

declare const $: any;

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  percentageValue: (value: number) => string;
  gaugeValues: any = {
    1: 100
  };
  interval: any;

  constructor() {
    this.percentageValue = function(value: number): string {
      return `${Math.round(value)} / ${this['max']}`;
    };
  }

  // line bar chart
  line_bar_chart: EChartOption = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25'
    },
    xAxis: {
      data: ['2014', '2015', '2016', '2017', '2018'],
      axisLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac'
      }
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis'
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea'
        }
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac'
      }
    },
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [11, 14, 8, 16, 11, 13]
      },
      {
        name: 'profit',
        type: 'line',
        smooth: true,
        data: [10, 7, 17, 11, 15],
        symbolSize: 10
      },
      {
        name: 'growth',
        type: 'bar',
        data: [10, 14, 10, 15, 9, 25]
      }
    ],
    color: ['#9f78ff', '#fa626b', '#32cafe']
  };

  ngOnInit() {
    this.initCharts();
    /*************** TO DO **********************/
    $(document).on(
      'click',
      '.to-do-list .form-check-label .form-check-input',
      function() {
        $(this)
          .parent('label')
          .toggleClass('line-through');
      }
    );
    $(document).on('click', '.todo-remove', function() {
      $(this)
        .closest('li')
        .remove();
      return false;
    });

    $(document).on('click', '.panel .tools .fa-times', function() {
      $(this)
        .parents('.panel')
        .parent()
        .remove();
    });

    const updateValues = (): void => {
      this.gaugeValues = {
        1: Math.round(Math.random() * 100)
      };
    };

    const INTERVAL: number = 3000;

    this.interval = setInterval(updateValues, INTERVAL);
    updateValues();
  }

  //Charts
  private initCharts() {
    $('.chart.chart-bar2').sparkline(undefined, {
      type: 'bar',
      barColor: '#54B253',
      negBarColor: '#000',
      barWidth: '5px',
      height: '67px'
    });
  }
}
