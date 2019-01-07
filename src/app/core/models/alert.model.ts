import AlertType from '../enums/alert-type.enum';

interface Alert {
  open: boolean;
  type: AlertType;
  message: string;
}

export default Alert;
