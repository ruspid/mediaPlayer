import { Component, OnInit } from '@angular/core';
import { Rule, BehavioralState, CommunicationAttempt } from './rule';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'pm-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {

  rule: Rule = new Rule();

  ruleForm: FormGroup;

  behavioralStates = Object.keys(BehavioralState).filter(k => typeof BehavioralState[k as any] === "number");
  CommunicationAttempts = Object.keys(CommunicationAttempt).filter(k => typeof CommunicationAttempt[k as any] === "number");

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.ruleForm = this.formBuilder.group({
      behavioralState: new FormArray([]),
      communicationAttempt:  new FormArray([])
      // types: new FormArray([],[Validators.required]) if you want to add validators['', Validators.required]
    });
  }

  // save the pokemon
  // onSavePokemon() {
  //   const behavioralState = this.ruleForm.get('behavioralState').value;
  //   const communicationAttempt = this.ruleForm.get('communicationAttempt').value;
  //   console.log(behavioralState + "    " + communicationAttempt);
    // const id = this.pokemonForm.get('id').value;
    // const nom = this.pokemonForm.get('nom').value;
    // const type = this.pokemonForm.get('type').value;
    // const description = this.pokemonForm.get('description').value;

    // const newPokemon = new Pokemon(id, nom, type, description);
    // if (this.fileUrl && this.fileUrl !== '') {
    //   newPokemon.photo = this.fileUrl;
    // }
    // this.pokemonService.createNewPokemon(newPokemon);
    // this.router.navigate(['/liste-pokemon']);
  // }

// values = Object.keys(Types);


// initForm() {
//    this.pokemonForm = this.formBuilder.group({
//      id: ['', Validators.required],
//      nom: ['', Validators.required],
//      types: new FormArray([]), 
//      // types: new FormArray([],[Validators.required]) if you want to add validators
//      description: ''
//   });
//  }

 // save the pokemon
 onSavePokemon(){
    // store final array after submit

    const behavioralState: FormArray = this.ruleForm.get('behavioralState') as FormArray;
    const communicationAttempt: FormArray = this.ruleForm.get('communicationAttempt') as FormArray;
    // After submit store all checked values in array 
    ////// for final saving selected arrays //////////
    let behavioralStates:any[]=[]; // for storing types values as array..
    let communicationAttempts:any[]=[]; // for storing types values as array..
    
    behavioralState.controls.forEach((ctrl: FormControl) => {
      console.log("ctrl is ",ctrl);
      behavioralStates.push(ctrl.value); // types declared on top
    });


    communicationAttempt.controls.forEach((ctrl: FormControl) => {
      console.log("ctrl is ",ctrl);
      communicationAttempts.push(ctrl.value); // types declared on top
    });

   console.log(" behavioralStates ", behavioralStates);
   console.log(" communicationAttempts ", communicationAttempts);
}



//  }

 onCheckChange(event) {
    const formArray: FormArray = this.ruleForm.get('behavioralState') as FormArray;

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
   }
   console.log("Total Form is ",this.ruleForm);



  }


}
