const MENU = {
  deepDish: {
    title: "Deep Dish",
    tagline: "7″ & 10″ — loaded to the edge",
    sizes: [
      { key: "M", label: 'M (7")', inches: 7 },
      { key: "L", label: 'L (10")', inches: 10 },
    ],
    prices: { M: 1599, L: 2999 },
    items: [
      {
        id: "creamzilla",
        name: "Creamzilla",
        description:
          "Layers of cheese and a special creamy sauce combo, loaded with chicken.",
        image: "deep-dish",
      },
      {
        id: "meatzilla",
        name: "Meatzilla",
        description:
          "Meat lover's dream — fajita, smoky chicken, sausages, house-special sauce.",
        image: "deep-dish",
      },
      {
        id: "zingzilla",
        name: "Zingzilla",
        description:
          "Classic tomato sauce, juicy chicken, tangy signature sauce on deep-dish crust.",
        image: "deep-dish",
      },
    ],
  },
  stuffers: {
    title: "Stuffers",
    tagline: "9″ & 12″ — stuffed crust legends",
    sizes: [
      { key: "M", label: 'M (9")', inches: 9 },
      { key: "L", label: 'L (12")', inches: 12 },
    ],
    prices: { M: 1450, L: 2199 },
    items: [
      {
        id: "cheese-stuffer",
        name: "Cheese Stuffer",
        description:
          "Crispy crust stuffed with chicken and cheddar cheese sauce.",
        image: "stuffer",
      },
      {
        id: "kebab-stuffer",
        name: "Kebab Stuffer",
        description:
          "Kebab stuffing, house-special sauce, mozzarella & cheddar blend.",
        image: "stuffer",
      },
      {
        id: "crown-crust",
        name: "Crown Crust",
        description:
          "Crown of crispy pockets stuffed with cheese and juicy gala kebab.",
        image: "stuffer",
      },
    ],
  },
  premium: {
    title: "Premium",
    tagline: "7″, 9″ & 12″ — double-layer cheese",
    sizes: [
      { key: "S", label: 'S (7")', inches: 7 },
      { key: "M", label: 'M (9")', inches: 9 },
      { key: "L", label: 'L (12")', inches: 12 },
    ],
    prices: { S: 750, M: 1199, L: 1749 },
    items: [
      {
        id: "smoky",
        name: "Smoky",
        description:
          "Premium smoky chicken, house-special sauce, double layer cheese.",
        image: "premium",
      },
      {
        id: "malai-boti",
        name: "Malai Boti",
        description:
          "Soft smoky malai boti, special malai sauce, double layer cheese.",
        image: "premium",
      },
      {
        id: "extreme-tikka",
        name: "Extreme Tikka",
        description:
          "Chef special sauce, juicy tikka chunks, olives, double layer cheese.",
        image: "premium",
      },
    ],
  },
};

const DELIVERY_FEE = 199;
const STORE = {
  name: "DEEPIZZA",
  address: "14-G Central Park",
  addressFull: "14-G / 14-B, Central Park Housing Scheme",
  phone: "0371-5013651",
  deliveryPhone: "0371-6513851",
  handle: "@deepizza.official",
  instagram: "https://www.instagram.com/deepizza.official/",
  facebook:
    "https://www.facebook.com/people/Deepizza/61589505623336/?locale=zh_HK#",
  tagline: "Highly stuffed pizza, burgers & more — fresh from Central Park.",
};