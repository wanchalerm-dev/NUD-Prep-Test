import { Component, OnInit } from '@angular/core';
// import { UploadFileService } from '../../service/upload-file.service';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { SchoolService } from '../../service/school.service';

const URL = 'https://www.satit.nu.ac.th/nodeUploadFile';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, autoUpload: true });

  amount = '';
  date = '';
  path = 'https://www.satit.nu.ac.th/2016/files/15387120050.png';
  paymentList = [];

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      console.log(fileItem);
      console.log(progress);
    };
    this.schoolService.schoolInfo(window.localStorage.getItem('school_id')).then(sch => {
      console.log(sch);
    });

    this.showImage();
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    let data = JSON.parse(response);
    let fileResponse = JSON.parse(data['file']);
    console.log(fileResponse);
    this.path = 'https://www.satit.nu.ac.th/2016/nodeUploadFiles/uploads/' + fileResponse['filename'];
  }

  save(){
    this.schoolService.newPayment(window.localStorage.getItem('school_id'), this.path, this.amount, this.date).then(res => {
      this.date = '';
      this.path = 'https://www.satit.nu.ac.th/2016/files/15387120050.png';
      this.amount = '';
      console.log(res);
      this.showImage();
    });
  }

  showImage(){
    this.schoolService.getPaymentInfoBySchool(window.localStorage.getItem('school_id')).then(payment => {
      console.log(payment);
      this.paymentList = payment['payment'];
    });
  }

  

}
