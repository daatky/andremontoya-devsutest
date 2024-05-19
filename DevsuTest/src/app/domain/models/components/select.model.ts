import { SelectSizeEnum } from "@shared/enum/components/selectstyle.enum"

export interface SelectModel {
  show: boolean,
  enable: boolean,
  showOptions: boolean,
  placeholder: SelectValue,
  selectedValue?: SelectValue,
  values?: SelectValue[],
  size: SelectSizeEnum,
  actionOnChange?: Function
}

export interface SelectValue {
  value?: string,
  label?: string
}
