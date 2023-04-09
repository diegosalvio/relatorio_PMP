export interface DataFormated {
    date?: Date,
    entryQtd: number,
    entryUnid?: number,
    outQtd?: number,
    outUnid?: number,
    balanceQtd?: number,
    balanceUnid?: number
}

export interface ArrayDataFormated extends Array<DataFormated> {
}
