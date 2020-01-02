import { CalculatorComponent } from './../calculator/calculator.component';
import { Component, OnInit, DoCheck } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit, DoCheck {
  //variables
  gradeOnFinal;
  weight=true;
  //declare objects
  _grades: FormGroup;
  calc:CalculatorComponent;
  //declare gpascale and weighted
  gpaScale;
  weighted;
  constructor(private fb: FormBuilder) { }
  //initialize formGroup to hold grades array on initialization of HTML component
  ngOnInit() {
    this._grades = this.fb.group({
      grades: this.fb.array([])
    });
    this.calc=new CalculatorComponent(this._grades);
  }
  get grades() {
    return this._grades.get('grades') as FormArray;
  }
  ngDoCheck() {

    this.gpaScale = (<HTMLInputElement>document.getElementById('gpaScale')).value;
    this.weighted = (<HTMLInputElement>document.getElementById('weighted')).value;
    this.weight=this.weigh();
    this.gradeOnFinal=this.calc.gradeOnFinal();
    this.output();
    
    
  }
  weigh(){
    let w:number=0;
    for (let i = 0; i < this.grades.length; i++) {
      w += +this.grades.get(i + '.weight').value;
    }
    if (w>=100){
      return true;
    }else {return false;}
  }
  updateCalculations(x :number){
    this.calc.update(x);
    
  }
  addGrade() {
    const grade = this.fb.group({
      letrGrade: '',
      pGrade: [],
      gpa4Grade: [],
      gpa43Grade: [],
      weight: [],
    })
    this.grades.push(grade);
  }
  remGrade(i) {
    this.grades.removeAt(i);
  }
  output(){
    //set the grade needed
    if ((!this.weight)&&(this.gradeOnFinal>=0)){
      console.log('hi');
      
      (<HTMLInputElement>document.getElementById('outputp')).innerHTML="You will need a grade of "+this.gradeOnFinal+" in the final to obtain that score";
    }
      //if not specified, auto to 50
      //You will need a grade of __ in the final to obtain that score
  }
  



}

