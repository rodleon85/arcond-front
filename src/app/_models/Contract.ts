import { Address } from "./Address";
import { Contact } from "./Contact";
import { ContractDocument } from "./ContractDocument";
import { Payment } from "./Payment";
import { SupportRequest } from "./SupportRequest";
import { Equipment } from "./Equipment";

export interface Contract {
  id: number;
  name: string;
  document: string;
  proposal?: string;
  signature?: string;
  startValue: number;
  currentValue: number;
  installationValue: number;
  dueDay: number;
  startDate: Date;
  period: number;
  readjustmentMonth: number;
  mailingType?: string;
  address: Address;
  documentList: ContractDocument[];
  equipmentList: Equipment[];
  contactList: Contact[];
  paymentList: Payment[];
  supportRequestList: SupportRequest[];
}
