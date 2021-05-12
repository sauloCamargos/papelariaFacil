import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'uld-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit, OnChanges {
  files: any[] = [];
  @Input() initial_files: any[] = [];
  @Output() removeFile = new EventEmitter;
  @ViewChild('formInput') formInputElement: ElementRef<HTMLFormElement>;

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    let removed = this.initial_files.splice(index, 1);
    this.removeFile.emit(removed[0])
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.onUpload(this.files[index]);
          }
        }, 200);
      }
    }, 1000);
  }

  onUpload(file) {
    // this.http is the injected HttpClient
    const uploadData = new FormData();
    uploadData.append(this.name, file, file.name);
    this.http.post(this.pathSendFile, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        switch (event.type) {
          case HttpEventType.Sent:
            // console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            // console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded / event.total * 100);
            // console.log(`Uploaded! ${file.progress}%`);
            break;
          case HttpEventType.Response:
            // console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.initial_files.push(event.body);
              this.formInputElement.nativeElement.reset();
              this.files = [];
            }, 500);
        }
        // console.log(event); // handle event here
      });
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  public imagePath;
  imgURL: any;
  iconMime: any;

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

  ngOnChanges() {
    console.log(this)
  }

  get previewUrl() {
    console.log(this)
    if (this.imagePath && this.selectedFile) {
      return this.imgURL;
    }

    if (!this.imagePath && !this.selectedFile) {
      if (this.start_image) {
        return this.start_image;
      }
      return 'https://via.placeholder.com/800x600.png?text=Sem%20Imagem';
    }
  }

  getMimeIcon(mimeType) {
    const iconClasses = {
      // Media
      'image': 'fa-file-image',
      'audio': 'fa-file-audio-o',
      'video': 'fa-file-video-o',
      // Documents
      'application/pdf': 'fa-file-pdf-o',
      'application/msword': 'fa-file-word-o',
      'application/vnd.ms-word': 'fa-file-word-o',
      'application/vnd.oasis.opendocument.text': 'fa-file-word-o',
      'application/vnd.openxmlformats-officedocument.wordprocessingml': 'fa-file-word-o',
      'application/vnd.ms-excel': 'fa-file-excel-o',
      'application/vnd.openxmlformats-officedocument.spreadsheetml': 'fa-file-excel-o',
      'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel-o',
      'application/vnd.ms-powerpoint': 'fa-file-powerpoint-o',
      'application/vnd.openxmlformats-officedocument.presentationml': 'fa-file-powerpoint-o',
      'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint-o',
      'text/plain': 'fa-file-text-o',
      'text/html': 'fa-file-code-o',
      'application/json': 'fa-file-code-o',
      // Archives
      'application/gzip': 'fa-file-archive-o',
      'application/zip': 'fa-file-archive-o'
    };


    let fa = 'file-o';
    for (let key in iconClasses) {
      if (iconClasses.hasOwnProperty(key) && mimeType.search(key) === 0) {
        fa = iconClasses[key];
      }
    }
    return `far ${fa}`;
  }

  onFileChanged(event) {

    if (event.target.files.length === 0)
      return;

    this.selectedFile = event.target.files[0]

    console.log(this.selectedFile)

    var mimeType = this.selectedFile.type;
    this.iconMime = this.getMimeIcon(mimeType);

    var reader = new FileReader();
    this.imagePath = this.selectedFile;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }



}
