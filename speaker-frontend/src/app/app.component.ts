import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'speaker-frontend';

  fileUploadForm: FormGroup;
  textUploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      file: [''],
    });

    this.textUploadForm = this.formBuilder.group({
      text: [''],
    });
  }

  onSubmitText(){
    
  }

  private base64textString:String="";

  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            console.log(btoa(binaryString));
    }
}
