import { Address } from "./Address";
import { Contact } from "./Contact";
import { ContractDocument } from "./ContractDocument";
import { Payment } from "./Payment";
import { SupportRequest } from "./SupportRequest";
import { ContractEquipment } from "./ContractEquipment";

export interface Contract {
  id?: Number;
  name: String;
  document: String;
  proposal?: String;
  signature?: String;
  startValue: Number;
  currentValue: Number;
  installationValue: Number;
  dueDay: Number;
  lastPayment?: Date;
  startDate: Date;
  period: Number;
  readjustmentMonth: Number;
  mailingType?: String;
  address: Address;
  contractDocumentList: ContractDocument[];
  contractEquipmentList: ContractEquipment[];
  contactList: Contact[];
  paymentList: Payment[];
  supportRequestList: SupportRequest[];
}
