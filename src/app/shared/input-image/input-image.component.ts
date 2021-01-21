import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pfa-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss']
})
export class InputImageComponent implements OnInit, OnChanges {
  public imagePath;
  imgURL: any;

  @Input() pathSendFile: string;
  @Input() name: string;
  @Input() start_image: string;
  @Input() disabled: string;

  public message: string;
  public selectedFile: File

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this)
  }

  get previewUrl(){
    console.log(this)
    if(this.imagePath && this.selectedFile){
      return this.imgURL;
    }

    if(!this.imagePath && !this.selectedFile){
      if(this.start_image){
        return this.start_image;
      }
      return 'https://via.placeholder.com/800x600.png?text=Sem%20Imagem';
    }
  }

  onFileChanged(event) {

    if (event.target.files.length === 0)
      return;

    this.selectedFile = event.target.files[0]


    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas imagens são suportadas.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = this.selectedFile;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  onUpload() {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append(this.name, this.selectedFile, this.selectedFile.name);
    this.http.post(this.pathSendFile, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event); // handle event here
      });
  }

}
