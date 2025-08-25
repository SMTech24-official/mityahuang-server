export enum E_ASSETS_PARENT_FOLDER_NAME {
  TAMSHYAH = "tamshyah",
}
export type T_ASSETS_UPLOAD_FOLDER_NAME =
  | "users"
  | "users/file"
  | "places"
  | "reviewImages"
  | "place-images"
  | "place/media"
  | "place/items"
  | "careers"
  | "social-media"
  | "blogs"
  | "advertising"
  | "whatsapp-contact-image";

export const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  //"image/svg+xml",
];
