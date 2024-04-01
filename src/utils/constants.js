export const PRICING_PLANS = [
  {
    isMostPopular: false,
    name: "Standard",
    productId: 1,
    price: 140,
    features: [
      {
        isAvailable: true,
        name: "Academia de Trading",
      },
      {
        isAvailable: true,
        name: "Molecular Markets",
      },
      {
        isAvailable: false,
        name: "Molecular Travel",
      },
      {
        isAvailable: false,
        name: "Molecular Convenios",
      },
    ],
  },
  {
    isMostPopular: true,
    name: "Premium",
    productId: 2,
    price: 280,
    features: [
      {
        isAvailable: true,
        name: "Academia de Trading",
      },
      {
        isAvailable: true,
        name: "Molecular Markets",
      },
      {
        isAvailable: true,
        name: "Molecular Travel",
      },
      {
        isAvailable: true,
        name: "Molecular Convenios",
      },
    ],
  },
];
