export type BaseDataType = {
  id: string;
  created_at: Date;
};

export type BaseType = {
  id: string;
  createdAt: Date;
};

export type AddressType = BaseType & {
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};
