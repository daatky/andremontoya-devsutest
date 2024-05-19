export interface InputModel {
  id: string,
  show: boolean,
  label?: string,
  value?: string,
  placeholder?: string,
  data?: any,
  type: string,
  showError: boolean,
  useCustomError: boolean,
  errorMessage?: string,
  readonly: boolean,
  maxLength?: number,
  minLength?: number
}
