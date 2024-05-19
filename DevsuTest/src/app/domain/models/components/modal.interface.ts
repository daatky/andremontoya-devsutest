export interface ModalModel {
  show: boolean,
  label: string,
  id?: string,
  name?: string,
  enableButtom: boolean,
  actionCancel?: Function,
  actionConfirm?: Function
}
