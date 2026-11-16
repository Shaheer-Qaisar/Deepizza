/** Content mirrored / summarized from @deepizza.official — update when IG posts new deals. */
const SOCIAL = {
  instagram: "https://www.instagram.com/deepizza.official/",
  facebook:
    "https://www.facebook.com/people/Deepizza/61589505623336/?locale=zh_HK#",
};

const CURRENT_DEALS = [
  {
    id: "triple-threat",
    title: "Triple threat — new on the menu",
    badge: "Instagram drop",
    description:
      "Deepizza just dropped three new must-tries: Chickiza, Crown Crust Pizza, and Spin Rolls — tag your food partner and come try the new lineup.",
    location: "14-B, Central Park Housing Scheme",
    cta: "Order new drops",
    ctaHref: "products.html#deals",
    source: SOCIAL.instagram,
    sourceLabel: "Via @deepizza.official",
  },
  {
    id: "chickiza",
    title: "Chickiza",
    badge: "New",
    description:
      "Crispy boneless chicken loaded with pizza cheese and saucy goodness — straight from the latest IG feature.",
    priceHint: "Ask in-store / delivery",
    cta: "Add Crown Crust",
    ctaHref: "products.html?cat=pizza",
    source: SOCIAL.instagram,
    sourceLabel: "Featured on Instagram",
  },
  {
    id: "spin-rolls",
    title: "Spin Rolls",
    badge: "Limited buzz",
    description: "Crispy, cheesy, seriously addictive — one of the three new drops highlighted on our official page.",
    priceHint: "Available now",
    cta: "View sides & snacks",
    ctaHref: "products.html?cat=sides",
    source: SOCIAL.instagram,
    sourceLabel: "Via @deepizza.official",
  },
  {
    id: "delivery-line",
    title: "Home delivery hotline",
    badge: "Call to order",
    description:
      "Order for Central Park and nearby — home delivery number promoted on Instagram: 0371-6513851.",
    priceHint: "0371-6513851",
    cta: "Call now",
    ctaHref: "tel:03716513851",
    source: SOCIAL.instagram,
    sourceLabel: "IG contact post",
  },
];

const BEST_SELLERS = [
  {
    name: "Creamzilla",
    category: "Deep Dish",
    priceFrom: 1599,
    blurb: "Creamy sauce layers and chicken — our most ordered deep dish.",
    emoji: "🧀",
    href: "products.html?cat=pizza",
  },
  {
    name: "Crown Crust",
    category: "Stuffers",
    priceFrom: 1450,
    blurb: "Crown of cheese pockets — also a viral IG favorite.",
    emoji: "👑",
    href: "products.html?cat=pizza",
  },
  {
    name: "Meatzilla",
    category: "Deep Dish",
    priceFrom: 1599,
    blurb: "Fajita, smoky chicken & sausages for true meat lovers.",
    emoji: "🥩",
    href: "products.html?cat=pizza",
  },
  {
    name: "Extreme Tikka",
    category: "Premium",
    priceFrom: 750,
    blurb: "Tikka chunks, olives, double cheese — premium pick.",
    emoji: "🔥",
    href: "products.html?cat=pizza",
  },
];

const TEAM = [
  {
    name: "Chef Usman",
    role: "Head of stuffing",
    bio: "Builds every deep dish to overflow — cheese first, questions later.",
    emoji: "👨‍🍳",
  },
  {
    name: "Ayesha",
    role: "Sauce & premium lead",
    bio: "Malai, smoky, and tikka signatures — tuned from customer favorites.",
    emoji: "✨",
  },
  {
    name: "Hassan",
    role: "Oven & stuffer specialist",
    bio: "Crown crust pockets and kebab stuffers — crispy every time.",
    emoji: "🔥",
  },
  {
    name: "Delivery squad",
    role: "Central Park riders",
    bio: "Hot boxes from 14-G Central Park to your door — track orders live.",
    emoji: "🛵",
  },
];

const CUSTOMER_REVIEWS = [
  {
    name: "Sarah K.",
    rating: 5,
    text: "Crown Crust is insane — exactly like the pictures on @deepizza.official. Worth the drive to Central Park.",
    date: "Nov 2026",
  },
  {
    name: "Bilal R.",
    rating: 5,
    text: "Creamzilla + Spin Rolls combo after seeing their IG reel. Both 10/10, portion size is huge.",
    date: "Nov 2026",
  },
  {
    name: "Maria T.",
    rating: 4,
    text: "Malai Boti premium pizza is so soft and smoky. Delivery was quick on the number they post on Instagram.",
    date: "Oct 2026",
  },
  {
    name: "Omar H.",
    rating: 5,
    text: "Meatzilla deep dish feeds four easily. Best stuffed pizza in the housing scheme hands down.",
    date: "Oct 2026",
  },
  {
    name: "Fatima Z.",
    rating: 5,
    text: "Tagged my friends for the new Chickiza drop — crispy chicken and cheese pull is unreal.",
    date: "Nov 2026",
  },
];

const SIMPLE_CATALOG = {
  burgers: {
    label: "Burgers",
    emoji: "🍔",
    items: [
      {
        id: "stuffed-smash",
        name: "Stuffed Smash Burger",
        description: "Double patty, cheddar pocket bun, house smoky sauce.",
        price: 899,
      },
      {
        id: "zing-burger",
        name: "Zing Chicken Burger",
        description: "Crispy chicken fillet, tangy slaw, cheese melt.",
        price: 749,
      },
      {
        id: "kebab-burger",
        name: "Kebab Burger",
        description: "Gala kebab patty, mint drizzle, stuffed garlic mayo.",
        price: 849,
      },
    ],
  },
  drinks: {
    label: "Drinks",
    emoji: "🥤",
    items: [
      {
        id: "lassi-mango",
        name: "Mango Lassi",
        description: "Thick, cold — pairs perfectly with stuffed crust.",
        price: 349,
      },
      {
        id: "soft-can",
        name: "Soft drink (can)",
        description: "Chilled classic sodas.",
        price: 199,
      },
      {
        id: "mint-margarita",
        name: "Mint margarita",
        description: "House lime-mint cooler — IG crowd favorite with pizza.",
        price: 399,
      },
    ],
  },
  sides: {
    label: "Sides & snacks",
    emoji: "🍟",
    items: [
      {
        id: "spin-rolls",
        name: "Spin Rolls",
        description: "Crispy, cheesy rolls — featured in latest Instagram new-drop post.",
        price: 599,
        badge: "New",
      },
      {
        id: "chickiza-side",
        name: "Chickiza (snack)",
        description: "Boneless chicken bites with pizza cheese & sauce — IG feature.",
        price: 699,
        badge: "New",
      },
      {
        id: "loaded-fries",
        name: "Loaded fries",
        description: "Cheddar, chicken bits, house sauce.",
        price: 549,
      },
    ],
  },
};

function buildProductList() {
  const list = [];
  Object.keys(MENU).forEach((menuKey) => {
    const cat = MENU[menuKey];
    cat.items.forEach((item) => {
      list.push({
        type: "pizza",
        menuKey,
        category: "pizza",
        categoryLabel: cat.title,
        id: item.id,
        name: item.name,
        description: item.description,
        sizes: cat.sizes,
        prices: cat.prices,
        emoji:
          menuKey === "deepDish" ? "🧀" : menuKey === "stuffers" ? "👑" : "🔥",
      });
    });
  });
  Object.keys(SIMPLE_CATALOG).forEach((catKey) => {
    const cat = SIMPLE_CATALOG[catKey];
    cat.items.forEach((item) => {
      list.push({
        type: "simple",
        category: catKey,
        categoryLabel: cat.label,
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        badge: item.badge,
        emoji: cat.emoji,
      });
    });
  });
  return list;
}

const ALL_PRODUCTS = typeof MENU !== "undefined" ? buildProductList() : [];

function getCategoryLabel(category, menuKey) {
  if (menuKey && MENU[menuKey]) return MENU[menuKey].title;
  const simple = SIMPLE_CATALOG[category];
  if (simple) return simple.label;
  const labels = {
    pizza: "Pizza",
    burgers: "Burgers",
    drinks: "Drinks",
    sides: "Sides & snacks",
    deals: "Deals",
  };
  return labels[category] || category;
}