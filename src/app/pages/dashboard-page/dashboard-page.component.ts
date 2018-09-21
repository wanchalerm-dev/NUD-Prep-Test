import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { ResizeService } from '../../resize/resize.service';
import { routerAnimation } from '../../utils/page.animation';
import { CHART_TEXT_COLOR, MAT_LIGHT_BLUE, MAT_DEEP_ORANGE, MAT_DEEP_GREEN } from '../../utils/colors';
import { SchoolService } from '../../service/school.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [routerAnimation]
})
export class DashboardPageComponent implements OnInit {

  valueFour: number = 600;
  valueFive: number = 300;
  valueSix: number = 100;
  valueInner: number = 335;
  valueOuter: number = 310;

  schoolList = [];

  nestedOption: any;
  customizedOption: any;
  lineChartOption: any;


  @HostBinding('@routerAnimation') routerAnimation = true;


  constructor(
    private schoolServicce: SchoolService
  ) {
    this.setPieChart();
  }

  ngOnInit(): void {

  }
  // Rating list items
  ratingItems = [
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'Marian Cannon',
      tag: '@mariancannon',
      value: 81.48
    },
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'John Lynch',
      tag: '@johnlynch',
      value: 68
    },
    {
      avatar: '/assets/avatars-img/4040.png',
      name: 'Isabella Watts',
      tag: '@isabellawatts',
      value: 36
    }
  ];
  setPieChart() {
    this.schoolServicce.getCountSchool(window.localStorage.getItem("school_id")).then(res => {
      // Model for simple line chart
      this.lineChartOption = {
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              type: 'png',
              name: 'กราฟจำนวนนักเรียนแต่ละระดับชั้น',
              show: true,
              title: 'Save As Image',
              pixelRatio: 3
            }
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['ป.4', 'ป.5', 'ป.6'],
          bottom: 0,
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        xAxis: {
          // type: 'category',
          data: ['จำนวนนักเรียนแต่ละระดับชั้น'],
          axisLabel: {
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          },
          axisTicks: {
            lineStyle: {
              color: CHART_TEXT_COLOR
            }
          },
          axisLine: {
            lineStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: CHART_TEXT_COLOR
            }
          },
          axisTicks: {
            lineStyle: {
              color: CHART_TEXT_COLOR
            }
          },
          axisLine: {
            lineStyle: {
              color: CHART_TEXT_COLOR
            }
          }
        },
        series: [
          {
            name: 'ป.4',
            type: 'bar',
            data: [
              { value: 100, name: 'ป.4', color: MAT_LIGHT_BLUE._300 }
            ],
            itemStyle: {
              normal: {
                color: MAT_DEEP_ORANGE._500
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }, {
            name: 'ป.5',
            type: 'bar',
            data: [
              { value: 245, name: 'ป.5', color: MAT_LIGHT_BLUE._300 }
            ],
            itemStyle: {
              normal: {
                color: MAT_DEEP_GREEN._900
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          },
          {
            name: 'ป.6',
            type: 'bar',
            data: [
              { value: 335, name: '1', color: MAT_LIGHT_BLUE._300 }
            ],
            itemStyle: {
              normal: {
                color: MAT_LIGHT_BLUE._900
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          },
        ]
      };
      // this.schoolList = res['school'];
      this.nestedOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: [],
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },
        series: [
          {
            name: 'ยอดการสมัคร',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            itemStyle: {
              normal: {
                color: (val) => val.data.color,
                shadowBlur: 15,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          }
        ]
      };

      console.log(res);
      res['school'].forEach((sch, index) => {
        console.log(sch);
        let temp = {
          value: sch['COUNT(school_name)'],
          name: sch['school_name'],
          color: MAT_LIGHT_BLUE['_' + ((9 - (index % 9)) * 100)]
        }
        this.nestedOption.legend.data.push(sch['school_name']);
        this.schoolList.push(temp);
        // this.nestedOption.series.data.push(temp);
        this.nestedOption.series[0].data.push(temp)
        console.log(this.nestedOption.series[0].data);
      });
    });
  }
  // Model for nested pie chart

}
