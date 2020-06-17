import { Component, OnInit } from '@angular/core';
import { Rule, BehavioralState, CommunicationAttempt } from './rule';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { PlaylistService } from '../playlist/playlist.service';
import { IPlayList } from '../playlist/playlist';

@Component({
  selector: 'pm-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  rule: Rule = new Rule();
  playlists: IPlayList[];
  ruleForm: FormGroup;

  behavioralStates: string[] = Object.keys(BehavioralState).filter(k => typeof BehavioralState[k as any] === "number");
  communicationAttempts: string[] = Object.keys(CommunicationAttempt).filter(k => typeof CommunicationAttempt[k as any] === "number");

  constructor(private formBuilder: FormBuilder, private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getPlaylistList().subscribe({
      next: playlists  => {
        this.playlists = playlists;
    },
    error: err => console.log("   EROR  " + err)
    });
    this.initForm();
  }

  

  initForm() {
    this.ruleForm = this.formBuilder.group({
      behavioralState: new FormArray([],[Validators.required]),
      communicationAttempt:  new FormArray([],[Validators.required]),
      playlist:  new FormArray([],[Validators.required]),
      name: ['', Validators.required]
      // types: new FormArray([],[Validators.required]) if you want to add validators['', Validators.required]
    });
  }

 onSubmit(){
    // store final array after submit
    const name: string = this.ruleForm.get('name').value
    const behavioralState: FormArray = this.ruleForm.get('behavioralState') as FormArray;
    const communicationAttempt: FormArray = this.ruleForm.get('communicationAttempt') as FormArray;
    const playlist: FormArray = this.ruleForm.get('playlist') as FormArray;
    // After submit store all checked values in array 
    ////// for final saving selected arrays //////////
    let behavioralStates:any[]=[]; // for storing types values as array..
    let communicationAttempts:any[]=[]; // for storing types values as array..
    let playlists: any[]=[];

    behavioralState.controls.forEach((ctrl: FormControl) => {
      behavioralStates.push(ctrl.value); // types declared on top
    });

    playlist.controls.forEach((ctrl: FormControl) => {
      playlists.push(ctrl.value); // types declared on top
    });


    communicationAttempt.controls.forEach((ctrl: FormControl) => {
      communicationAttempts.push(ctrl.value); // types declared on top
    });
  
  
  console.log("  name   " + name)
   console.log(" behavioralStates ", behavioralStates);
   console.log(" communicationAttempts ", communicationAttempts);
   console.log(" playlists  ", playlists);

  }

  private handleEventByForm(formArray, event){
  /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(event.target.value));
  }
  /* unselected */
  else{
     // find the unselected element
    let i: number = 0;

   formArray.controls.forEach((ctrl: FormControl) => {
     if(ctrl.value == event.target.value) {
     // Remove the unselected element from the arrayForm
     formArray.removeAt(i);
     return;
    }

    i++;
   });
  };
}

onPlaylistChange(event) {
  const formArray: FormArray = this.ruleForm.get('playlist') as FormArray;
  this.handleEventByForm(formArray, event);
}

onBehavioralStateChange(event) {
    const formArray: FormArray = this.ruleForm.get('behavioralState') as FormArray;
    this.handleEventByForm(formArray, event);
  }

  onCommunicationAttemptChange(event) {
  const formArray: FormArray = this.ruleForm.get('communicationAttempt') as FormArray;
  this.handleEventByForm(formArray, event);

}

}
