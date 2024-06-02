export interface ContractDocument {
  id: Number;
  name?: String;
  file?: Uint8Array; // Using Uint8Array for byte array representation
  type?: String;
}