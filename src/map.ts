export type mapLocation = {
  endpoint: string;
  name: string;
  description: string;
  image?: string;
  connections: mapLocation[];
};

const corridor: mapLocation = {
  "endpoint": "corridor",
  "name": "corridor",
  "description": "....",
  "connections": [],
};

const house: mapLocation = {
  "endpoint": "old-house",
  "name": "Old House",
  "description": "....",
  "connections": [corridor],
};

export const yard: mapLocation = {
  "endpoint": "",
  "name": "The yard",
  "description": "....",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/fsa/8b23000/8b23400/8b23404v.jpg",
  "connections": [house],
};
