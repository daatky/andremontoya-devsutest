export enum LocalRoutes {
  BASE = '/',
  PRODUCTS = 'products',
  NOTFOUND = 'notfound'
}

export enum ProductsRoutes {
  VIEW = 'view',
  FORM = 'form/:entityAction'
}

export enum EntityAction {
  CREATE = 'create',
  UPDATE = 'update'
}

