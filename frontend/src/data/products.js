// Mock product data for YASIRA BEAUTY
export const products = [
  // Lipsticks
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    brand: "YASIRA BEAUTY",
    price: 28.99,
    originalPrice: 35.99,
    category: "lipstick",
    subcategory: "matte",
    description: "Ultra-pigmented matte lipstick with 12-hour wear. Infused with nourishing oils for comfortable all-day wear.",
    image: "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60",
    images: [
      "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    ],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    stock: 45,
    colors: ["Ruby Red", "Deep Berry", "Classic Rose", "Nude Pink"],
    tags: ["bestseller", "new", "vegan"],
    ingredients: ["Vitamin E", "Jojoba Oil", "Shea Butter"],
    features: ["Long-lasting", "Transfer-proof", "Cruelty-free"]
  },
  {
    id: 2,
    name: "Glossy Lip Tint",
    brand: "YASIRA BEAUTY",
    price: 22.99,
    category: "lipstick",
    subcategory: "gloss",
    description: "Lightweight lip tint with mirror-like shine. Buildable color that lasts without stickiness.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
      "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60"
    ],
    rating: 4.6,
    reviews: 189,
    inStock: true,
    stock: 32,
    colors: ["Clear", "Pink Shimmer", "Coral Glow", "Berry Bliss"],
    tags: ["hydrating", "vegan"],
    ingredients: ["Hyaluronic Acid", "Vitamin C", "Natural Oils"]
  },
  
  // Foundations
  {
    id: 3,
    name: "Flawless Coverage Foundation",
    brand: "YASIRA BEAUTY",
    price: 42.99,
    originalPrice: 48.99,
    category: "foundation",
    subcategory: "liquid",
    description: "Full coverage foundation with SPF 30. Weightless formula that adapts to your skin tone for a natural finish.",
    image: "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
    images: [
      "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
      "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b"
    ],
    rating: 4.9,
    reviews: 567,
    inStock: true,
    stock: 28,
    shades: ["Porcelain", "Light", "Medium", "Tan", "Deep", "Rich"],
    tags: ["bestseller", "full-coverage", "spf"],
    ingredients: ["SPF 30", "Niacinamide", "Hyaluronic Acid"],
    features: ["24-hour wear", "Buildable", "Non-comedogenic"]
  },
  {
    id: 4,
    name: "Radiant Glow Serum Foundation",
    brand: "YASIRA BEAUTY",
    price: 38.99,
    category: "foundation",
    subcategory: "serum",
    description: "Lightweight serum foundation that provides natural coverage while nourishing your skin.",
    image: "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b",
    images: [
      "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b",
      "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7"
    ],
    rating: 4.7,
    reviews: 342,
    inStock: true,
    stock: 19,
    shades: ["Fair", "Light", "Medium", "Dark"],
    tags: ["natural", "hydrating", "lightweight"],
    ingredients: ["Vitamin C", "Peptides", "Botanical Extracts"]
  },

  // Eyeshadow Palettes
  {
    id: 5,
    name: "Golden Hour Eyeshadow Palette",
    brand: "YASIRA BEAUTY",
    price: 52.99,
    originalPrice: 62.99,
    category: "eyeshadow",
    subcategory: "palette",
    description: "18-shade eyeshadow palette featuring warm golds, bronzes, and sunset hues. Perfect for day to night looks.",
    image: "https://images.unsplash.com/photo-1589782431746-713d84eef3c4",
    images: [
      "https://images.unsplash.com/photo-1589782431746-713d84eef3c4",
      "https://images.pexels.com/photos/7033794/pexels-photo-7033794.jpeg"
    ],
    rating: 4.9,
    reviews: 456,
    inStock: true,
    stock: 15,
    colors: ["18 shades"],
    tags: ["bestseller", "limited-edition", "highly-pigmented"],
    ingredients: ["Mica", "Talc", "Vitamin E"],
    features: ["Blendable", "Long-lasting", "Crease-resistant"]
  },
  {
    id: 6,
    name: "Smoky Nights Palette",
    brand: "YASIRA BEAUTY",
    price: 48.99,
    category: "eyeshadow",
    subcategory: "palette",
    description: "12-shade palette with deep blacks, grays, and metallics for dramatic evening looks.",
    image: "https://images.pexels.com/photos/7033794/pexels-photo-7033794.jpeg",
    images: [
      "https://images.pexels.com/photos/7033794/pexels-photo-7033794.jpeg",
      "https://images.unsplash.com/photo-1589782431746-713d84eef3c4"
    ],
    rating: 4.8,
    reviews: 298,
    inStock: true,
    stock: 22,
    colors: ["12 shades"],
    tags: ["dramatic", "long-wearing", "buildable"],
    ingredients: ["Mica", "Dimethicone", "Silica"]
  },

  // Skincare
  {
    id: 7,
    name: "Luxury Anti-Aging Serum",
    brand: "YASIRA BEAUTY",
    price: 89.99,
    originalPrice: 105.99,
    category: "skincare",
    subcategory: "serum",
    description: "Premium anti-aging serum with 24k gold particles and retinol. Reduces fine lines and improves skin texture.",
    image: "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
    images: [
      "https://images.unsplash.com/photo-1704118549325-81cad2f39ab7",
      "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b"
    ],
    rating: 4.9,
    reviews: 789,
    inStock: true,
    stock: 8,
    size: "30ml",
    tags: ["luxury", "anti-aging", "bestseller"],
    ingredients: ["24k Gold", "Retinol", "Hyaluronic Acid", "Peptides"],
    features: ["Clinically tested", "Dermatologist approved", "Suitable for all skin types"]
  },
  {
    id: 8,
    name: "Hydrating Face Mask",
    brand: "YASIRA BEAUTY",
    price: 35.99,
    category: "skincare",
    subcategory: "mask",
    description: "Intensive hydrating mask with hyaluronic acid and ceramides. Instant moisture boost for dry skin.",
    image: "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b",
    images: [
      "https://images.unsplash.com/photo-1519668963014-2308b08e5e9b"
    ],
    rating: 4.7,
    reviews: 234,
    inStock: true,
    stock: 41,
    size: "75ml",
    tags: ["hydrating", "sensitive-skin", "weekly-treatment"],
    ingredients: ["Hyaluronic Acid", "Ceramides", "Aloe Vera"]
  },

  // More products to reach 400+
  {
    id: 9,
    name: "Precision Eyeliner",
    brand: "YASIRA BEAUTY",
    price: 18.99,
    category: "eyeliner",
    subcategory: "liquid",
    description: "Ultra-fine tip liquid eyeliner for precise application. Waterproof and smudge-proof formula.",
    image: "https://images.unsplash.com/photo-1617422275563-4cf1103e7d60",
    rating: 4.6,
    reviews: 156,
    inStock: true,
    stock: 67,
    colors: ["Black", "Dark Brown", "Navy Blue"],
    tags: ["waterproof", "precise", "long-lasting"]
  },
  {
    id: 10,
    name: "Volumizing Mascara",
    brand: "YASIRA BEAUTY",
    price: 26.99,
    category: "mascara",
    subcategory: "volumizing",
    description: "Dramatic volume mascara that lifts and separates lashes. Clump-free formula with curved brush.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
    rating: 4.8,
    reviews: 445,
    inStock: true,
    stock: 33,
    colors: ["Black", "Brown"],
    tags: ["volumizing", "lengthening", "clump-free"]
  }
];

// Generate additional products to reach 400+
const generateMoreProducts = () => {
  const baseProducts = [...products];
  const categories = ['lipstick', 'foundation', 'eyeshadow', 'mascara', 'eyeliner', 'blush', 'highlighter', 'concealer', 'bronzer', 'skincare'];
  const adjectives = ['Luxurious', 'Professional', 'Premium', 'Signature', 'Elite', 'Glamorous', 'Radiant', 'Flawless', 'Perfect', 'Ultimate'];
  const productTypes = ['Palette', 'Set', 'Collection', 'Kit', 'Duo', 'Trio', 'Quad', 'Serum', 'Cream', 'Powder'];
  
  for (let i = 11; i <= 400; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const type = productTypes[Math.floor(Math.random() * productTypes.length)];
    const price = (Math.random() * 80 + 15).toFixed(2);
    const rating = (Math.random() * 1 + 4).toFixed(1);
    const reviews = Math.floor(Math.random() * 1000 + 50);
    const stock = Math.floor(Math.random() * 100 + 1);
    
    baseProducts.push({
      id: i,
      name: `${adjective} ${type}`,
      brand: "YASIRA BEAUTY",
      price: parseFloat(price),
      originalPrice: Math.random() > 0.7 ? parseFloat((parseFloat(price) * 1.2).toFixed(2)) : null,
      category: category,
      subcategory: type.toLowerCase(),
      description: `Premium ${category} ${type.toLowerCase()} designed for professional results. High-quality formula with long-lasting wear.`,
      image: products[Math.floor(Math.random() * products.length)].image,
      rating: parseFloat(rating),
      reviews: reviews,
      inStock: stock > 0,
      stock: stock,
      tags: ["quality", "professional", "long-lasting"].slice(0, Math.floor(Math.random() * 3) + 1)
    });
  }
  
  return baseProducts;
};

export const allProducts = generateMoreProducts();

export const categories = [
  { id: 1, name: 'Lipstick', slug: 'lipstick', image: 'https://images.unsplash.com/photo-1617422275563-4cf1103e7d60' },
  { id: 2, name: 'Foundation', slug: 'foundation', image: 'https://images.unsplash.com/photo-1704118549325-81cad2f39ab7' },
  { id: 3, name: 'Eyeshadow', slug: 'eyeshadow', image: 'https://images.unsplash.com/photo-1589782431746-713d84eef3c4' },
  { id: 4, name: 'Skincare', slug: 'skincare', image: 'https://images.unsplash.com/photo-1519668963014-2308b08e5e9b' },
  { id: 5, name: 'Mascara', slug: 'mascara', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa' },
  { id: 6, name: 'Eyeliner', slug: 'eyeliner', image: 'https://images.pexels.com/photos/7033794/pexels-photo-7033794.jpeg' }
];

export const featuredProducts = products.filter(product => product.tags?.includes('bestseller')).slice(0, 8);