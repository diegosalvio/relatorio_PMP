import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  dataForm!: FormGroup;

  moneyGex = `^(\d{1,3})(,\d{3})*(\.\d{2})?$`

  datePlaceholder!: Date

  valor: any

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.handleFormBuilder()
  }


  handleFormBuilder() {
    this.dataForm = this.fb.group({
      balanceQtd: [""],
      balanceUnid: [""],
      dateData: this.fb.array([]),
      isChecked: [false]
    })
  }

  get dateDataControl() {
    return this.dataForm.get("dateData") as FormArray
  }

  addForm() {
    this.dateDataControl.push(this.fb.group({
      date: ["", Validators.required],
      entryQtd: [""],
      entryUnid: [""],
      outQtd: [""],
      outUnid: [""],
    }))
  }


  sendData() {
    if (this.dataForm.valid) {
      console.log(this.dataForm.value)
      const dialogRef = this.dialog.open(TableComponent,{
        data: this.dataForm.value
      })
    }

  }

  valueToPipe() {
    return this.dataForm.get("balanceQtd")?.value
  }


  get isChecked() {
    return this.dataForm.get("isChecked")?.value
  }

  get balanceQtdError() {
    return this.dataForm.get("balanceQtd")?.errors
  }
}
