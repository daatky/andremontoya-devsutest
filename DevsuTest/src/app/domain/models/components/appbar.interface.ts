import { AppBarStyle } from "@shared/enum/components/appbarstyle.enum";

export interface AppBarModel {
  show: boolean,
  text?: string,
  iconName?: string,
  style: AppBarStyle
}
