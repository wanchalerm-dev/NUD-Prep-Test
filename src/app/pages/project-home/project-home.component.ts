import { Component, OnInit } from '@angular/core';
import { CHART_TEXT_COLOR, MAT_LIGHT_BLUE, MAT_DEEP_ORANGE, MAT_DEEP_GREEN } from '../../utils/colors';
import { SchoolService } from '../../service/school.service';
@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

  totalStudent = 0;
  schoolChart: any;
  schoolsInfo: any;
  TempschoolsInfo: any = {
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          type: 'png',
          name: 'กราฟจำนวนนักเรียนแต่ละระดับชั้น',
          show: true,
          title: 'Download',
          pixelRatio: 3
        }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      // type: 'category',
      data: ['จำนวนนักเรียนแต่ละศูนย์สอบ'],
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
    series: [],
    legend: {
      data: [],
      top: 480,
      height: 170,
      textStyle: {
        color: CHART_TEXT_COLOR
      },
      orient: 'vertical'
    },
    height: 390
  };



  constructor(private schoolServicce: SchoolService) {

  }

  setChart() {
    this.schoolServicce.getCountMember().then(res => {
      // console.log(res['school']);
      let schoolList = [];
      schoolList = res['school'];
      this.totalStudent = 0;
      this.schoolsInfo = this.TempschoolsInfo;
      schoolList.forEach((sch, i) => {
        // console.log(sch);
        let temp1 = { name: 'โรงเรียน' + sch['name'], type: 'bar', data: [{ value: sch['COUNT(student.school_test_id)'] }], label: { normal: { show: true, position: 'top' } } };
        let temp2 = 'โรงเรียน' + sch['name'];
        this.schoolsInfo.legend.data.push(temp2);
        this.schoolsInfo.series.push(temp1);
        this.totalStudent += sch['COUNT(student.school_test_id)'];
        // console.log(this.schoolsInfo);
      });
      this.schoolChart = this.schoolsInfo;
    });
  }

  ngOnInit() {
    this.setChart();
    setInterval(() => {
      this.setChart();
    }, 3000);
  }

}
