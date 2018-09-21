import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { TdDataTableService } from '@covalent/core';
import { ResizeService } from '../../resize/resize.service';
import { routerAnimation } from '../../utils/page.animation';
import { CHART_TEXT_COLOR, MAT_LIGHT_BLUE } from '../../utils/colors';

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
  valueInner:number = 335;
  valueOuter: number = 310;


  @HostBinding('@routerAnimation') routerAnimation = true;


  constructor() {

  }

  ngOnInit(): void {
  }
  // Model for nested pie chart
  nestedOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      // data: ['ชั้น ป.4', 'ชั้น ป.5', 'ชั้น ป.6'],
      textStyle: {
        color: CHART_TEXT_COLOR
      }
    },
    series: [
      {
        name: 'ยอดการสมัคร',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '70%'],

        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [
          { value: this.valueFour, name: 'ชั้น ป.4', selected: true, color: MAT_LIGHT_BLUE._300 },
          { value: this.valueFive, name: 'ชั้น ป.5', color: MAT_LIGHT_BLUE._600 },
          { value: this.valueSix, name: 'ชั้น ป.6', color: MAT_LIGHT_BLUE._900 }
        ],
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
  customizedOption = {
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
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'ยอดสมัครนักเรียน',
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        data: [
          { value: this.valueInner, name: 'ภายใน',color: MAT_LIGHT_BLUE._300 },
          { value: this.valueOuter, name: 'ภายนอก' ,color: '#4e342e'}
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
            color: MAT_LIGHT_BLUE._500,
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
}
