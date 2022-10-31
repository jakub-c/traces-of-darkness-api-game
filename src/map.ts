export type mapLocation = {
  endpoint: string;
  name: string;
  description: string;
  image?: string;
  input?: string;
  input_response?: {
    name: string;
    description: string;
  };
  connections: mapLocation[];
};

const book: mapLocation = {
  "endpoint": "book",
  "name": "Unknown book",
  "description":
    "The book is written in an aphabet of unkonwn origin. On the first page you spot a drawing. It looks like a circle on fire with number 7 right in the middle.",
  "connections": [],
};

const library: mapLocation = {
  "endpoint": "library",
  "name": "The library",
  "description":
    "You're standing in a small room that seems to be a prospective library. There are shelves, but no books. No books but one.",
  "connections": [book],
};

const fireplace: mapLocation = {
  "endpoint": "fireplace",
  "name": "The fireplace",
  "description":
    "You see ash and fait blue fire. It doesn't produce any heat. On the back wall there's a shape of a circle.",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/habshaer/nj/nj0000/nj0080/photos/107329pv.jpg",
  "input": "7",
  "input_response": {
    "name": "The void",
    "description":
      "Everything goes dark. From the darkness the stars emege. You realise you're looking at the vast cosmic space. It's cold and diffent from anything you've ever seen. You realise you don't have the body, you're just a point of consciousness floating in emptyness. There are no feelings, no thoughts, no events. Bit by bit you dissolve into the stillnes of cosmos. Until there's no you anymore...",
  },
  "connections": [],
};

const diningRoomCabinet: mapLocation = {
  "endpoint": "cabinet",
  "name": "A cabinet",
  "description":
    "The cabinet you're looking at seems brand new, it hasn't collected any dust yet. You don't find anything there besides a single glass.",
  "connections": [],
};

const diningRoomPlate: mapLocation = {
  "endpoint": "plate",
  "name": "A plate",
  "description":
    "This is an ordinary plate. On the back you see a trademark: Arkham dinnerware.",
  connections: [],
};

const note: mapLocation = {
  "endpoint": "note",
  "name": "A note",
  "description":
    "'We live on a placid island of ignorance in the midst of black seas of infinity, and it was not meant that we should voyage far.' Who wrote this, you think to yourself.",
  connections: [],
};

const diningRoomTable: mapLocation = {
  "endpoint": "table",
  "name": "A table",
  "description": "White cloth decorates this table",
  "connections": [diningRoomPlate, note],
};

const diningRoom: mapLocation = {
  "endpoint": "dining-room",
  "name": "A dining room",
  "description":
    "This room looks like a catefuly crafted theatrical scenery. Only a few essential items are here.",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/hec/33800/33881v.jpg",
  "connections": [diningRoomTable, diningRoomCabinet, fireplace],
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
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/habshaer/pa/pa3900/pa3905/photos/200867pv.jpg",
  "connections": [hallway],
};

export const yard: mapLocation = {
  "endpoint": "",
  "name": "The yard",
  "description":
    "It's a cold evening somewhere in New England. You are standing on the premises of a mansion that seems neither inhabited nor abandoned. The place feels like it's frozen in time. Did anyone ever live here? The unusualness of the situation makes you ponder turning away, going back to the Ford Model T parked just 30 yards from where you stand. Yet your thirst for knowledge pushes you forward. You realise you just took a step bringing you closer to the unknown. Is it a coincidence that you finished reading Faust just a few days ago? Goethe was a Freemason after all... Would he approve your quest?",
  "image":
    "https://tile.loc.gov/storage-services/service/pnp/habshaer/pa/pa3900/pa3904/photos/200831pv.jpg",
  "connections": [house],
};
