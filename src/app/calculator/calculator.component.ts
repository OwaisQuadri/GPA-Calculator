
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  //the boolean value for disabling the grade goal
  _gradeGoal;
  totalweight: number;
  _average = 0;
  grades: FormArray;
  gpa4;

  constructor(g: FormGroup) {
    this.grades = g.get('grades') as FormArray;
  }
  update(x: number) {
    this.gpa4 = (((<HTMLInputElement>document.getElementById('gpaScale')).value) == "4");

    this.translate(x);
    this.doAverage();
  }

  ngOnInit() {


  }
  translate(x: number) {//updates onchange of any textfield
    for (let i = 0; i < this.grades.length; i++) {
      switch (x) {
        case 0:
          //convert letter into gpa and percent grade
          //and fill it in
          this.setgpa(i, this.convert("letter", "gpa", (<string>this.grades.get(i + '.letrGrade').value)));
          this.setpGrade(i, this.convert("letter", "percent", (<string>this.grades.get(i + '.letrGrade').value)));
          break;
        case 1:
          //if percentage notnull,
          //convert percent into gpa and letter grade
          //and fill it in
          this.setgpa(i, this.convert("percent", "gpa", +(this.grades.get(i + '.pGrade').value)));
          this.setletrGrade(i, this.convert("percent", "letter", +(this.grades.get(i + '.pGrade').value)));
          break;

        case 2:
          //convert gpa4 into percent and letter grade
          //and fill it in
          this.setpGrade(i, this.convert("gpa", "percent", +(this.grades.get(i + '.gpa4Grade').value)));
          this.setletrGrade(i, this.convert("gpa", "letter", +(this.grades.get(i + '.gpa4Grade').value)));
          break;
        case 3:
          //convert gpa43 into percent and letter grade
          //and fill it in
          this.setpGrade(i, this.convert("gpa", "percent", +(this.grades.get(i + '.gpa43Grade').value)));
          this.setletrGrade(i, this.convert("gpa", "letter", +(this.grades.get(i + '.gpa43Grade').value)));
          break;
      }
    }

  }
  convert(from: string, to: string, x?: any) {
    switch (from) {
      case "gpa"://from gpa to ...
        if (this.gpa4) {
          if (to == "percent") {
            //gpa4->percent
            if (x == 4)
              return 100;
            if ((x < 4) && (x >= 3.7))
              return 92;
            else if ((x < 3.7) && (x >= 3.3))
              return 89;
            else if ((x < 3.3) && (x >= 3.0))
              return 86;
            else if ((x < 3.0) && (x >= 2.7))
              return 82;
            else if ((x < 2.7) && (x >= 2.3))
              return 79;
            else if ((x < 2.3) && (x >= 2.0))
              return 76;
            else if ((x < 2.0) && (x >= 1.7))
              return 72;
            else if ((x < 1.7) && (x >= 1.3))
              return 69;
            else if ((x < 1.3) && (x >= 1.0))
              return 66;
            else return 0;

          } else {
            //gpa4->letter
            if (x == 4)
              return "A+";
            if ((x < 4) && (x >= 3.7))
              return "A";
            else if ((x < 3.7) && (x >= 3.3))
              return "A-";
            else if ((x < 3.3) && (x >= 3.0))
              return "B+";
            else if ((x < 3.0) && (x >= 2.7))
              return "B";
            else if ((x < 2.7) && (x >= 2.3))
              return "B-";
            else if ((x < 2.3) && (x >= 2.0))
              return "C+";
            else if ((x < 2.0) && (x >= 1.7))
              return "C";
            else if ((x < 1.7) && (x >= 1.3))
              return "C-";
            else if ((x < 1.3) && (x >= 1.0))
              return "D";
            else return "F";
          }
        } else {
          if (to == "percent") {
            //gpa43->percent
            if (x == 4.3)
              return 100;
            else if ((x < 4.3) && (x >= 4))
              return 96;
            else if ((x < 4) && (x >= 3.67))
              return 92;
            else if ((x < 3.67) && (x >= 3.33))
              return 89;
            else if ((x < 3.33) && (x >= 3.0))
              return 86;
            else if ((x < 3.0) && (x >= 2.67))
              return 82;
            else if ((x < 2.67) && (x >= 2.3))
              return 79;
            else if ((x < 2.3) && (x >= 2))
              return 76;
            else if ((x < 2) && (x >= 1.7))
              return 72;
            else if ((x < 1.7) && (x >= 1.3))
              return 69;
            else if ((x < 1.3) && (x >= 1.0))
              return 66;
            else if ((x < 1.0) && (x >= 0.67))
              return 62;
            else return 0;
          } else {
            //gpa43->letter
            if (x == 4.3)
              return "A+";
            else if ((x < 4.3) && (x >= 4))
              return "A";
            else if ((x < 4) && (x >= 3.67))
              return "A-";
            else if ((x < 3.67) && (x >= 3.33))
              return "B+";
            else if ((x < 3.33) && (x >= 3.0))
              return "B";
            else if ((x < 3.0) && (x >= 2.67))
              return "B-";
            else if ((x < 2.67) && (x >= 2.3))
              return "C+";
            else if ((x < 2.3) && (x >= 2))
              return "C";
            else if ((x < 2) && (x >= 1.7))
              return "C-";
            else if ((x < 1.7) && (x >= 1.3))
              return "D+";
            else if ((x < 1.3) && (x >= 1.0))
              return "D";
            else if ((x < 1.0) && (x >= 0.67))
              return "D-";
            else return "F";
          }
        }
        break;

      case "letter"://from letter to ...
        if (to == "percent") {
          //letter to percent
          if (x == "A+")
            return 100;
          else if (x == "A")
            return 96;
          else if (x == "A-")
            return 92;
          else if (x == "B+")
            return 89;
          else if (x == "B")
            return 86;
          else if (x == "B-")
            return 82;
          else if (x == "C+")
            return 79;
          else if (x == "C")
            return 76;
          else if (x == "C-")
            return 72;
          else if (x == "D+")
            return 69;
          else if (x == "D")
            return 66;
          else if (x == "D-")
            return 62;
          else return 0;
        } else {
          if (this.gpa4) {
            //letter to gpa4
            if (x == "A+")
              return 4;
            else if (x == "A")
              return 4;
            else if (x == "A-")
              return 3.7;
            else if (x == "B+")
              return 3.3;
            else if (x == "B")
              return 3.0;
            else if (x == "B-")
              return 2.7;
            else if (x == "C+")
              return 2.3;
            else if (x == "C")
              return 2.0;
            else if (x == "C-")
              return 1.7;
            else if (x == "D+")
              return 1.3;
            else if (x == "D")
              return 1.0;
            else if (x == "D-")
              return 0.7;
            else return 0;
          } else {
            //letter to gpa43
            if (x == "A+")
              return 4.3;
            else if (x == "A")
              return 4.0;
            else if (x == "A-")
              return 3.7;
            else if (x == "B+")
              return 3.3;
            else if (x == "B")
              return 3.0;
            else if (x == "B-")
              return 2.7;
            else if (x == "C+")
              return 2.3;
            else if (x == "C")
              return 2.0;
            else if (x == "C-")
              return 1.7;
            else if (x == "D+")
              return 1.3;
            else if (x == "D")
              return 1.0;
            else if (x == "D-")
              return 0.7;
            else return 0;
          }
        }
        break;
      case "percent"://from percent to ...
        if (to == "letter") {
          //percent to letter
          if ((x <= 100) && (x >= 97))
            return "A+";
          else if ((x < 97) && (x >= 93))
            return "A";
          else if ((x < 93) && (x >= 90))
            return "A-";
          else if ((x < 90) && (x >= 87))
            return "B+";
          else if ((x < 87) && (x >= 83))
            return "B";
          else if ((x < 83) && (x >= 80))
            return "B-";
          else if ((x < 80) && (x >= 77))
            return "C+";
          else if ((x < 77) && (x >= 73))
            return "C";
          else if ((x < 73) && (x >= 70))
            return "C-";
          else if ((x < 70) && (x >= 67))
            return "D+";
          else if ((x < 67) && (x >= 63))
            return "D";
          else if ((x < 63) && (x >= 60))
            return "D-";
          else return "F";
        } else {
          if (this.gpa4) {
            //percent to gpa4
            if ((x <= 100) && (x >= 97))
              return 4;
            else if ((x < 97) && (x >= 93))
              return 4;
            else if ((x < 93) && (x >= 90))
              return 3.7;
            else if ((x < 90) && (x >= 87))
              return 3.3;
            else if ((x < 87) && (x >= 83))
              return 3.0;
            else if ((x < 83) && (x >= 80))
              return 2.7;
            else if ((x < 80) && (x >= 77))
              return 2.3;
            else if ((x < 77) && (x >= 73))
              return 2.0;
            else if ((x < 73) && (x >= 70))
              return 1.7;
            else if ((x < 70) && (x >= 67))
              return 1.3;
            else if ((x < 67) && (x >= 63))
              return 1.0;
            else if ((x < 63) && (x >= 60))
              return 0;
            else return 0;
          } else {
            //percent to gpa43
            if ((x <= 100) && (x >= 97))
              return 4.3;
            else if ((x < 97) && (x >= 93))
              return 4.0;
            else if ((x < 93) && (x >= 90))
              return 3.7;
            else if ((x < 90) && (x >= 87))
              return 3.3;
            else if ((x < 87) && (x >= 83))
              return 3.0;
            else if ((x < 83) && (x >= 80))
              return 2.7;
            else if ((x < 80) && (x >= 77))
              return 2.3;
            else if ((x < 77) && (x >= 73))
              return 2.0;
            else if ((x < 73) && (x >= 70))
              return 1.7;
            else if ((x < 70) && (x >= 67))
              return 1.3;
            else if ((x < 67) && (x >= 63))
              return 1.0;
            else if ((x < 63) && (x >= 60))
              return 0.7;
            else return 0;
          }
        }
        break;
    }
  }
  doAverage() {
    //re-initialize totalweight 
    this.totalweight = 0;
    for (let i = 0; i < this.grades.length; i++) {
      //sum up all the weight values
      this.totalweight += +this.grades.get(i + '.weight').value;

    }
    if (this.totalweight == 0) {
      this._average = 0;
      for (let i = 0; i < this.grades.length; i++) {
        //sum up all the weight values
        let p = +this.grades.get(i + '.pGrade').value;
        this._average += p;
      }
      this._average /= this.grades.length;
    } else {
      //sum weight*percent
      //start weighted average at 0
      this._average = 0;
      for (let i = 0; i < this.grades.length; i++) {
        //sum up all the weight values times percent
        this._average += ((+this.grades.get(i + '.weight').value) / 100) * (+this.grades.get(i + '.pGrade').value);

      }
      this._average;
    }
    
    (<HTMLInputElement>document.getElementById('output')).value=this._average.toString();

  }
  get average() {
    return this.average;
  }
  set gradeGoal(x) {
    this.gradeGoal;
  }
  setpGrade(i: number, x) {
    //set p grade
    this.grades.get(i + '.pGrade').setValue(x);
  }
  setgpa(i: number, x) {
    //set gpa grade
    if (this.gpa4) {
      this.grades.get(i + '.gpa4Grade').setValue(x);
    } else {
      this.grades.get(i + '.gpa43Grade').setValue(x);
    }

  }
  setletrGrade(i: number, s) {
    //set letter grade
    this.grades.get(i + '.letrGrade').setValue(s);
  }
  gradeOnFinal(){
    
    let gFinal=+(<HTMLInputElement>document.getElementById('output')).value;
    let n=this.grades.length;
    let avg=this._average;
    let wTot=this.totalweight/100;
    return ((gFinal*(100)-(avg*wTot)))/(100-wTot);
  }

}
