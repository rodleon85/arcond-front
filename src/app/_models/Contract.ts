import { Address } from "./Address";
import { Contact } from "./Contact";
import { ContractDocument } from "./ContractDocument";
import { Payment } from "./Payment";
import { SupportRequest } from "./SupportRequest";
import { Equipment } from "./Equipment";

export interface Contract {
  id: Number;
  name: String;
  document: String;
  proposal?: String;
  signature?: String;
  startValue: Number;
  currentValue: Number;
  installationValue: Number;
  dueDay: Number;
  startDate: Date;
  period: Number;
  readjustmentMonth: Number;
  mailingType?: String;
  address: Address;
  documentList: ContractDocument[];
  equipmentList: Equipment[];
  contactList: Contact[];
  paymentList: Payment[];
  supportRequestList: SupportRequest[];
}
