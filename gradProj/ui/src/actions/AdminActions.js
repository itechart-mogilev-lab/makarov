export const BLOCK_COMPANY = "admin: blocked company";
export const blockCompany = data => ({
  type: BLOCK_COMPANY,
  payload: data
});

export const COMPANY_BLOCKED = "admin: company block success";
export const companyBlocked = data => ({
  type: COMPANY_BLOCKED,
  payload: data
});

export const UNBLOCK_COMPANY = "ADMIN: UNBLOCK COMPANY";
export const unblockCompany = data => ({
  type: UNBLOCK_COMPANY,
  payload: data
});

export const COMPANY_UNBLOCKED = "ADMIN: COMPANY UNBLOCKED";
export const companyUnblocked = () => ({
  type: COMPANY_UNBLOCKED
});

export const LOAD_CUSTOMERS = "ADMIN: LOAD USERS";
export const loadCustomers = query => ({
  type: LOAD_CUSTOMERS,
  payload: query
});

export const CUSTOMERS_LOADED = "ADMIN: USERS LOADED";
export const customersLoaded = data => ({
  type: CUSTOMERS_LOADED,
  payload: data
});

export const CHANGE_FILTERS_CUSTOMERS = "ADMIN: NEW USERS FILTERS";
export const changeFiltersCustomers = data => ({
  type: CHANGE_FILTERS_CUSTOMERS,
  payload: data
});

export const BLOCK_CUSTOMER = "ADMIN: BLOCK USER";
export const blockCustomer = data => ({
  type: BLOCK_CUSTOMER,
  payload: data
});

export const CUSTOMER_BLOCKED = "ADMIN: USER BLOCKED";
export const customerBlocked = data => ({
  type: CUSTOMER_BLOCKED,
  payload: data
});

export const UNBLOCK_CUSTOMER = "ADMIN: UNBLOCK USER";
export const unblockCustomer = data => ({
  type: UNBLOCK_CUSTOMER,
  payload: data
});

export const CUSTOMER_UNBLOCKED = "ADMIN: USER UNBLOCKED";
export const customerUnblocked = () => ({
  type: CUSTOMER_UNBLOCKED
});