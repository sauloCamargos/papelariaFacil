import { AttachmentsService } from './../../core/services/attachment.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-select-media',
  templateUrl: './select-media.component.html',
  styleUrls: ['./select-media.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectMediaComponent implements OnInit {

  @Input() labelButton: string;
  @Output() fileSelected = new EventEmitter();

  enviandoImagem: boolean;
  urlUploadFile: string = environment.apis.url_upload;
  files: any;
  fileSelect: any;
  carregando: boolean;
  carregandoMidias: boolean;
  id: number;
  data_target: string;
  obg_class: string;
  constructor(
    private attachmentsService: AttachmentsService
  ) { }

  ngOnInit() {
    this.id = new Date().getTime();
    this.data_target = '.modal_' + this.id;
    this.obg_class = 'modal fade modal_' + this.id;
    if (!this.labelButton) {
      this.labelButton = 'Selecionar arquivo';
    }
    this.getMedias();
  }

  getMedias() {
    this.carregandoMidias = true;
    this.attachmentsService.list({qtd:-1}).subscribe((res) => {
      this.carregandoMidias = false;
      this.files = res.data;
    });
  }

  fileImage(type) {
    const filesImg =  ['jpg', 'png', 'jpeg', 'gif'];
    if (type) {
      if (filesImg.indexOf(type.toLowerCase()) >= 0) {
        return true;
      }
    }
    return false;
  }

  onRemoved(event) {
    console.log('onRemoved');
    console.log(event);

  }
 onUploadFinished(event) {
   if (event.serverResponse.status === 200) {
    $('#optTab' + this.id + ' a[href=\"#select' + this.id + '\"]').tab('show');
    const newFile = JSON.parse(event.serverResponse.response._body);
    this.files.unshift(newFile);
    this.defineSelect(newFile);
    toastr.success('Imagem enviada com sucesso!');
   }else {
    toastr.error('Erro ao enviar enviar imagem!');
   }
  }

  onUploadStateChanged(event) {
    this.enviandoImagem = event;
  }

  defineSelect(file) {
    this.fileSelect = file;
  }

  fileAccept(type) {
    const filesImg =  ['jpg', 'png', 'jpeg', 'gif'];
    if (type) {
      if (filesImg.indexOf(type.toLowerCase()) >= 0) {
        return true;
      }
    }
    return false;
  }

  saveSelect() {
    if (this.fileSelect) {
      $(this.data_target).modal('hide');
      this.fileSelected.emit(this.fileSelect);
      this.fileSelect = undefined;
      $('#optTab' + this.id  + ' a[href=\"#upload' + this.id + '\"]').tab('show');

    }else {
      toastr.error('Selecione um arquivo!');
    }
  }

}
