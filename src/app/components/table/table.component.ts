import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['date', 'entryQtd', 'entryUnid', 'entryTotal' ,  'outQtd', 'outUnid', 'outTotal']

  dataSource!: Array<any>
  cmv!: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dataSource = [... this.data.dateData]

    const total = this.data.dateData.map((element: any) => {
      return element.outQtd * element.outUnid
    });

    this.cmv = total.reduce((all: any, actual: any) => all + actual)
  }


}
