import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TextService, Helper, ImageService } from '../index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TextService, ImageService]
})
export class AppComponent implements OnInit {
  title = 'speaker-frontend';

  fileUploadForm: FormGroup;
  textUploadForm: FormGroup;
  private base64textString:string="";
  private sendTextValue:string="";
  private imageResponse:string="";
  url = 'Speech.mp3'
  private filename:string="assets/Test.mp3";


  constructor(private formBuilder: FormBuilder,
              private textservice: TextService,
              private imageService: ImageService,
              private router: Router) { }


  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      file: [''],
    });

    this.textUploadForm = this.formBuilder.group({
      text: [''],
    });
  }

  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.sendResult(reader.result)
        }
        reader.readAsBinaryString(file);
    }
  }

    sendResult(result) {
      let base:Helper ={
        Text: btoa(result)
      }
      this.imageService.sendImage(base).subscribe(
        success => {
          for (let entry of success) {
            this.imageResponse += "I see "+entry.description+". I Am "+entry.percentage+" Percent sure.\n";
          }
          this.textUploadForm.controls['text'].setValue(this.imageResponse);
        },
        error => {
          console.log(error);
        });
    }


    onSubmitText(){

      let mytext:Helper = {
        Text: this.text.text.value
      };
        this.textservice.sendText(mytext).subscribe(
          success => {
              const contentType = 'audio/mpeg3';
              const byteCharacters = atob(success['body']);

              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
              }

              const byteArray = new Uint8Array(byteNumbers);

              const blob = new Blob([byteArray], {type: contentType});
              let audio = new Audio();
              audio.src = window.URL.createObjectURL(blob)
              audio.play()
          },
          error => {
            console.log(error);
          });
    }




    get file() { return this.fileUploadForm.controls; }

    get text() { return this.textUploadForm.controls; }
}
