interface _Identity {
  id: number;
}

type _Picked<
  T extends _Identity,
  K extends readonly (keyof T)[] | undefined
> = K extends readonly (keyof T)[] ? Pick<T, K[number] | "id"> : T;

type _PickedList<
  T extends _Identity,
  K extends readonly (keyof T)[] | undefined
> = K extends readonly (keyof T)[] ? Array<Pick<T, K[number] | "id">> : T[];

export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

export type GetNestedValueType<
  T,
  K extends string
> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? GetNestedValueType<T[First], Rest>
    : never
  : K extends keyof T
  ? T[K]
  : never;

export interface InitConfig {
  limit?: number;
  delay?: number;
  Authorization?: string;
  refreshToken?: string;
}

export interface HttpOptions extends RequestInit {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: object;
}

export interface Pagination {
  total?: number;
  limit?: number;
  skip?: number;
}

export interface BaseQuery<
  T extends _Identity = any,
  K extends readonly (keyof T)[] = readonly (keyof T)[]
> extends Omit<Pagination, "total"> {
  select?: K;
  sortBy?: keyof T;
  order?: "asc" | "desc";
}

export interface Dimension {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface BaseProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  thumbnail: string;
  images: string[];
}

export type Product<K extends readonly (keyof BaseProduct)[] = any> = _Picked<
  BaseProduct,
  K
>;

export interface Products<K extends readonly (keyof BaseProduct)[] = any>
  extends Pagination {
  products: _PickedList<BaseProduct, K>;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface AuthBody {
  username: string;
  password: string;
  expiredInMins?: number;
}

export interface Credential {
  accessToken: string;
  refreshToken: string;
}

export interface LoginData extends Credential {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinate;
  country: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface BaseUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

export type User<K extends readonly (keyof BaseUser)[] = any> = _Picked<
  BaseUser,
  K
>;

export interface Users<K extends readonly (keyof BaseUser)[] = any>
  extends Pagination {
  users: _PickedList<BaseUser, K>;
}

export interface Cart extends _Identity {
  products: Product[];
  total: number;
  discounterTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Carts extends _Identity, Pagination {
  carts: Cart[];
}

export interface BaseRecipe extends _Identity {
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export type Recipe<K extends readonly (keyof BaseRecipe)[] = any> = _Picked<
  BaseRecipe,
  K
>;

export interface Recipes<K extends readonly (keyof BaseRecipe)[] = any>
  extends Pagination {
  recipes: _PickedList<BaseRecipe, K>;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface BasePost extends _Identity {
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}

export type Post<K extends readonly (keyof BasePost)[] = any> = _Picked<
  BasePost,
  K
>;

export interface Posts<K extends readonly (keyof BasePost)[] = any>
  extends Pagination {
  posts: _PickedList<BasePost, K>;
}

export type Tag = Category;

export interface BaseComment extends _Identity {
  body: string;
  postId: number;
  likes: number;
  user: Pick<BaseUser, "id" | "username"> & { fullName: string };
}

export type Comment<K extends readonly (keyof BaseComment)[] = any> = _Picked<
  BaseComment,
  K
>;

export interface Comments<K extends readonly (keyof BaseComment)[] = any>
  extends Pagination {
  comments: _PickedList<BaseComment, K>;
}

export interface BaseTodo extends _Identity {
  todo: string;
  completed: boolean;
  userId: number;
}

export type Todo<K extends readonly (keyof BaseTodo)[] = any> = _Picked<
  BaseTodo,
  K
>;

export interface Todos<K extends readonly (keyof BaseTodo)[] = any>
  extends Pagination {
  todos: _PickedList<BaseTodo, K>;
}

export interface BaseQuote extends _Identity {
  quote: string;
  author: string;
}

export type Quote<K extends readonly (keyof BaseQuote)[] = any> = _Picked<
  BaseQuote,
  K
>;

export interface Quotes<K extends readonly (keyof BaseQuote)[] = any>
  extends Pagination {
  quotes: _PickedList<BaseQuote, K>;
}
