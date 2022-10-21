export type mapLocation = {
  endpoint: string;
  name: string;
  description: string;
  image?: string;
  connections: mapLocation[];
};

const library: mapLocation = {
  "endpoint": "library",
  "name": "The library",
  "description":
    "You're standing in a small room that seems to be a prospective library. There are shelves, but no books. No books but one.",
  "connections": [],
};

const diningRoomCabinet: mapLocation = {
  "endpoint": "cabinet",
  "name": "A cabinet",
  "description":
    "The cabinet you're looking at seems brand new, it hasn't collected any dust yet. You don't find anything there besides a signle glass.",
  "connections": [],
};

const diningRoomPlate: mapLocation = {
  "endpoint": "plate",
  "name": "A plate",
  "description":
    "This is an ordinary plate. On the back you see a trademark: Arkham dinnerware.",
  connections: [],
};

const diningRoomTable: mapLocation = {
  "endpoint": "table",
  "name": "A table",
  "description": "White cloth decorates this table",
  "connections": [diningRoomPlate],
};

const diningRoom: mapLocation = {
  "endpoint": "dining-room",
  "name": "A dining room",
  "description":
    "This room looks like a catefuly crafted theatrical scenery. Only a few essential items are here.",
  "connections": [diningRoomTable, diningRoomCabinet],
};

const hallway: mapLocation = {
  "endpoint": "hallway",
  "name": "A Hallway",
  "description":
    "You enter a hallway. There's noting in particular that draws your attention. This place seams dead empty, so empty that it's hard to image living here.",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/habshaer/or/or0100/or0126/photos/129649pv.jpg",
  "connections": [diningRoom, library],
};

const house: mapLocation = {
  "endpoint": "old-house",
  "name": "Old House",
  "description":
    "You approach the house. It looks tidy. Windows and a facade seem new, yet the building itself looks at least couple of decades old. You feel a sense of a strange force keeping this dwelling alive. This place looks like a museum piece, once built now kept under an invisible glass protecting it from deterioration.",
  "connections": [hallway],
};

export const yard: mapLocation = {
  "endpoint": "",
  "name": "The yard",
  "description":
    "It's a cold evening somewhere in New England. You are standing on the premises of a mansion that seems neither inhabited nor abandoned. The place feels like it's frozen in time. Did anyone ever live here? The unusualness of the situation makes you ponder turning away, going back to the Ford Model T parked just 30 yards from where you stand. Yet your thirst for knowledge pushes you forward. You realise you just took a step bringing you closer to the unknown. Is it a coincidence that you finished reading Faust just a few days ago? Goethe was a Freemason after all... Would he approve your quest?",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/fsa/8b23000/8b23400/8b23404v.jpg",
  "connections": [house],
};
