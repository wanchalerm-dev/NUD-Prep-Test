import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { ResizeService } from '../../resize/resize.service';
import { routerAnimation } from '../../utils/page.animation';
import { CHART_TEXT_COLOR, MAT_LIGHT_BLUE, MAT_DEEP_BROWN, MAT_DEEP_ORANGE } from '../../utils/colors';
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


  @HostBinding('@routerAnimation') routerAnimation = true;


  constructor(
    private schoolServicce: SchoolService
  ) {
    this.setPieChart();
  }

  ngOnInit(): void {

  }
  setPieChart() {
    this.schoolServicce.getCountSchool(window.localStorage.getItem("school_id")).then(res => {

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
      // Model for customized pie chart
      this.customizedOption = {
        title: {
          // text: 'Some title',
          left: 'center',
          top: 20,
          textStyle: {
            color: CHART_TEXT_COLOR
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [1, 0]
          }
        },
        series: [
          {
            name: 'ยอดสมัครนักเรียน',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            data: [
              { value: this.valueInner, name: 'ภายใน', color: '#039be5' },
              { value: this.valueOuter, name: 'ภายนอก', color: '#3E2723' }
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: CHART_TEXT_COLOR
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: CHART_TEXT_COLOR
                },
                smooth: 0,
                length: 15,
                length2: 25
              }
            },
            itemStyle: {
              normal: {
                // color: MAT_LIGHT_BLUE,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: 200
          }
        ]
      };

      console.log(res);
      res['school'].forEach((sch, index) => {
        console.log(sch);
        let temp = {
          value: sch['COUNT(school_name)'],
          name: sch['school_name'],
          color: MAT_LIGHT_BLUE['_' + ((9 - (index%9)) * 100)]
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
