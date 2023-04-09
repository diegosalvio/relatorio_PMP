import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArrayDataFormated } from 'src/app/interface/data-formated';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['date', 'entryQtd', 'entryUnid', 'entryTotal', 'outQtd', 'outUnid', 'outTotal', 'saldoQtd', 'saldoUnid']

  dataSource!: Array<any>
  cmv!: any

  arrayFormated!: any

  saldoQtd = 0
  saldoUnid = 0
  entradaAnteriorQtd = 0
  entradaAnteriorUnid = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.dataSource = [... this.data.dateData]

    const array = this.data.dateData

    let valorAnteriorQtd: number
    let valorAnteriorUnid: number

    this.arrayFormated = array.map((value: any, index: number, array: any) => {
      if (index < 0) {
        valorAnteriorQtd = this.data.balanceQtd + value.entryQtd
        valorAnteriorUnid = this.data.balanceUnid + value.entryUnid
      } else {
        valorAnteriorQtd = valorAnteriorQtd + value.entryQtd
        valorAnteriorUnid = valorAnteriorUnid + value.entryUnid
      }

      return {
        date: value.date,
        entryQtd: value.entryQtd,
        entryUnid: value.entryUnid,
        outQtd: value.outQtd,
        outUnid: value.outUnid,
        balanceQtd: valorAnteriorQtd,
        balanceUnid: valorAnteriorUnid
      }
    })

    console.log(this.arrayFormated)



    const total = this.data.dateData.map((element: any) => {
      return element.outQtd * element.outUnid
    });

    this.cmv = total.reduce((all: any, actual: any) => all + actual)
  }

  calcularSaldoQtd(index: number) {
    if (index == 0) {
      // Se for o primeiro elemento, o saldo é igual à entrada
      this.saldoQtd = this.dataSource[index].entryQtd - this.dataSource[index].outQtd;
    } else {
      // Se não for o primeiro elemento, calcula o saldo
      this.saldoQtd = this.saldoQtd + (this.dataSource[index].entryQtd - this.dataSource[index].outQtd);
    }
    // Atualiza a entrada anterior
    this.entradaAnteriorQtd = this.dataSource[index].entryQtd;
    return this.saldoQtd
  }

  calcularSaldoUnid(index: number) {
    if (index == 0) {
      // Se for o primeiro elemento, o saldo é igual à entrada
      this.saldoUnid = ((this.dataSource[index].entryUnid * this.dataSource[index].entryQtd) - (this.dataSource[index].outUnid * this.dataSource[index].outQtd));
    } else {
      // Se não for o primeiro elemento, calcula o saldo
      this.saldoUnid = this.saldoUnid + ((this.dataSource[index].entryUnid * this.dataSource[index].entryQtd) - (this.dataSource[index].outUnid * this.dataSource[index].outQtd));
    }
    // Atualiza a entrada anterior
    this.entradaAnteriorUnid = this.dataSource[index].entryUnid * this.dataSource[index].entryQtd;
    return this.saldoUnid
  }


}
