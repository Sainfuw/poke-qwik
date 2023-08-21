export type PokeDescription = {
  flavor_text_entries: FlavorTextEntry[];
}

export type Color = {
  name: string;
  url: string;
}

export type FlavorTextEntry = {
  flavor_text: string;
  language: Color;
  version: Color;
}
