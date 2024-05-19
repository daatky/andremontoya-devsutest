import { ButtomSizes, ButtomTypes } from "@shared/enum/components/buttomstyle.enum";

export interface ButtomModel {
  show: boolean,
  enable: boolean,
  text?: string,
  action?: Function,
  type: ButtomTypes,
  syze?: ButtomSizes
}
