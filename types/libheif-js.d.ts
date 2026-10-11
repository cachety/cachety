// Sous-ensemble de libheif-js réellement utilisé (lib/heic.ts) : le paquet
// ne fournit pas de types pour sa variante « bundle » (WebAssembly embarqué).
declare module "libheif-js/libheif-wasm/libheif-bundle.mjs" {
  type Display = { data: Uint8ClampedArray; width: number; height: number };
  export interface HeifImage {
    get_width(): number;
    get_height(): number;
    display(target: Display, done: (result: Display | null) => void): void;
    free(): void;
  }
  export interface LibHeif {
    HeifDecoder: new () => { decode(bytes: Uint8Array): HeifImage[] };
  }
  const factory: () => LibHeif;
  export default factory;
}
