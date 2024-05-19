export interface DropDownModel {
  idOption?: string,
  show: boolean,
  enable: boolean,
  showOptions: boolean,
  actionDots?: Function,
  items?: DropDownItem[]
}

export interface DropDownItem {
  text?: string,
  action?: Function
}
