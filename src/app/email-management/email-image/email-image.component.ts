import { Component, OnInit } from '@angular/core';
import { ImagesUpload } from './../email-mangement/image.model';
import { EmailService } from './../email.service';

@Component({
  selector: 'app-email-image',
  templateUrl: './email-image.component.html',
  styleUrls: ['./email-image.component.css']
})
export class EmailImageComponent implements OnInit {
  fileToUpload;
  fileToLoad;
  fileLength;
  byteArrayConverted: any;
  check;
  showImage: any;
  image: ImagesUpload;
  imageAll: ImagesUpload;
  BASE64_MARKER: any = ';base64,';
  message;
  action;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.image = new ImagesUpload(
      '',
      ''
    );
    this.getAllImages();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    const reader = new FileReader();
    const file = this.fileToUpload;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.check = reader.result;
      this.byteArrayConverted = this.convertDataURIToBinary(this.check);
      this.image.imageName = this.fileToUpload.name;
      this.image.imagePath = this.check;
      this.showImage = this.check;
    };
    this.image = this.image;
  }
  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
  uploadSingleImage() {
    this.emailService.uploadImages(this.image).subscribe(data => {
      this.getAllImages();
    }, error => {
      console.log(error);
    });
  }
  getAllImages() {
    this.emailService.findAllImage().subscribe(data => {
      this.imageAll = data;
      console.log(this.imageAll);
    }, error => {
      console.log(error);
    });
  }
  deleteSingleImage(deleteData) {
    console.log(deleteData);
    this.emailService.deleteSingleImages(deleteData).subscribe(data => {
      this.imageAll = data;
    }, error => {
      console.log(error);
    });
  }
}
