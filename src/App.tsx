/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Leaf, Clock, Settings, X, BarChart3, Package, Users, LogOut, Lock, Mail, ChevronDown, Upload, CreditCard, Gift, Search, Edit2, Trash2, Plus, Minus, Trash } from "lucide-react";
import { useState, useEffect, FormEvent, useRef } from "react";

const INITIAL_PRODUCTS = [
  {
    id: "blueberry-muffin-2-pack",
    name: "Blueberry Muffin 2-Pack",
    description: "Fresh baked gourmet blueberry muffins, infused for a perfect morning.",
    price: "$15.00 – $25.00",
    variants: [
      { name: "100mg", price: "$15.00" },
      { name: "200mg", price: "$25.00" }
    ],
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/pixies-pantry-artisan-blueberry-muffins-2-pack-fresh-baked-gourmet-breakfast-pastries/"
  },
  {
    id: "banana-nut-muffin-2-pack",
    name: "Banana Nut Muffin 2-Pack",
    description: "Full spectrum infused banana nut goodness with a crunchy topping.",
    price: "$15.00 – $25.00",
    variants: [
      { name: "100mg", price: "$15.00" },
      { name: "200mg", price: "$25.00" }
    ],
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/banana-nut-muffins-full-spectrum-infused/"
  },
  {
    id: "blueberry-muffin-dozen",
    name: "Blueberry Muffin Dozen",
    description: "A full dozen of our signature infused blueberry muffins.",
    price: "$90.00 – $130.00",
    variants: [
      { name: "100mg", price: "$90.00" },
      { name: "200mg", price: "$130.00" }
    ],
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/pixies-pantry-artisan-blueberry-muffins-2-pack-fresh-baked-gourmet-breakfast-pastries/"
  },
  {
    id: "banana-nut-muffin-dozen",
    name: "Banana Nut Muffin Dozen",
    description: "A full dozen of our signature infused banana nut muffins.",
    price: "$90.00 – $130.00",
    variants: [
      { name: "100mg", price: "$90.00" },
      { name: "200mg", price: "$130.00" }
    ],
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/banana-nut-muffins-full-spectrum-infused/"
  },
  {
    id: "pb-cookies",
    name: "Peanut Butter Cookies",
    description: "Soft, chewy, and perfectly infused for a relaxing treat.",
    price: "$15.00 – $20.00",
    variants: [
      { name: "100mg (4-Pack)", price: "$15.00" },
      { name: "200mg (4-Pack)", price: "$20.00" }
    ],
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/peanut-butter-cookies-full-spectrum-infused/"
  },
  {
    id: "hazelnut-spread",
    name: "Infused Hazelnut Spread",
    description: "Rich, velvety hazelnut spread with a full spectrum infusion.",
    price: "$30.00 – $40.00",
    variants: [
      { name: "500mg (4 oz)", price: "$30.00" },
      { name: "1000mg (4 oz)", price: "$40.00" }
    ],
    image: "https://images.unsplash.com/photo-1590505681226-06103447a9c4?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/infused-hazelnut-spread-full-spectrum/"
  },
  {
    id: "peanut-butter",
    name: "Infused Peanut Butter",
    description: "Creamy, small-batch peanut butter for the ultimate snack.",
    price: "$30.00 – $40.00",
    variants: [
      { name: "500mg (4 oz)", price: "$30.00" },
      { name: "1000mg (4 oz)", price: "$40.00" }
    ],
    image: "https://images.unsplash.com/photo-1590505681226-06103447a9c4?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/infused-peanut-butter-full-spectrum/"
  },
  {
    id: "bundle-box",
    name: "Pixie's Bundle Box",
    description: "The ultimate collection of our signature cookies and muffins.",
    price: "$15.00 – $25.00",
    variants: [
      { name: "500mg Total", price: "$15.00" },
      { name: "1000mg Total", price: "$25.00" }
    ],
    image: "https://images.unsplash.com/photo-1516919549054-e08258825f80?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/pixies-pantry-full-spectrum-bundle-box/"
  },
  {
    id: "mct-oil",
    name: "Infused MCT Oil",
    description: "30ml of unflavored, hemp-derived MCT oil for versatile use.",
    price: "$20.00 – $40.00",
    variants: [
      { name: "1000mg", price: "$20.00" },
      { name: "3000mg", price: "$40.00" }
    ],
    image: "https://images.unsplash.com/photo-1611073113004-28218c42074f?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/hemp-derived-mct-oil-30ml-unflavored/"
  }
];

function NewsletterPopup({ isOpen, onClose, email, setEmail, onSubmit }: { 
  isOpen: boolean, 
  onClose: () => void, 
  email: string, 
  setEmail: (email: string) => void,
  onSubmit: (e: FormEvent) => void 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pantry-ink/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-pantry-cream max-w-2xl w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-pantry-ink hover:bg-pantry-gold hover:text-white transition-all shadow-sm"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 bg-pantry-gold/10 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pantry-gold via-transparent to-transparent" />
              </div>
              <div className="relative text-pantry-gold">
                <Gift size={120} strokeWidth={1} />
                <div className="absolute -top-4 -right-4">
                  <Leaf size={40} className="rotate-45 opacity-40" />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-serif mb-4 leading-tight">Take 10% Off Your First Batch.</h2>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                Join the Baker’s Box Club for fresh-baked deals, sweet updates, and a little something to help you unwind. Dropped right in your inbox.
              </p>
              
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-pantry-gold/20 outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-pantry-ink text-white py-4 rounded-2xl font-bold hover:bg-pantry-gold transition-all duration-300 shadow-lg shadow-pantry-ink/10"
                >
                  Help Me Chill Out (and Save 10%)
                </button>
              </form>
              <p className="mt-6 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                No spam, just sweetness.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AgeGate({ onVerify }: { onVerify: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-pantry-ink backdrop-blur-xl px-6"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[3rem] p-12 w-full max-w-xl shadow-2xl border border-black/5 text-center space-y-10 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="w-20 h-20 bg-pantry-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="text-pantry-gold" size={40} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-serif leading-tight">Age Verification Required</h2>
            <p className="text-pantry-ink/60 leading-relaxed">
              You must be at least 21 years of age to enter The World's Best Muffins. By entering, you confirm you are of legal age.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button 
              onClick={onVerify}
              className="w-full bg-pantry-ink text-white py-5 rounded-2xl font-bold hover:bg-pantry-gold transition-all duration-300 shadow-xl"
            >
              I am 21 or older
            </button>
            <button 
              onClick={() => window.location.href = "https://google.com"}
              className="w-full border border-black/10 text-pantry-ink/40 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              I am under 21
            </button>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.2em] text-pantry-ink/30 font-bold mt-8">
            Please consume responsibly.
          </p>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pantry-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pantry-gold/5 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

interface Product {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  price: string;
  image: string;
  category?: string;
  ingredients?: string;
  benefits?: string;
  link?: string;
  variants?: { name: string; price: string }[];
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: string;
  image: string;
  variant?: string;
  uninfused: boolean;
  quantity: number;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const hasVerifiedAge = localStorage.getItem("hasVerifiedAge");
    if (!hasVerifiedAge) {
      setShowAgeGate(true);
    }

    const hasSeenNewsletter = localStorage.getItem("hasSeenNewsletter");
    if (!hasSeenNewsletter && hasVerifiedAge) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgeVerify = () => {
    localStorage.setItem("hasVerifiedAge", "true");
    setShowAgeGate(false);
    // Trigger newsletter check after age verification
    const hasSeenNewsletter = localStorage.getItem("hasSeenNewsletter");
    if (!hasSeenNewsletter) {
      setTimeout(() => setShowNewsletter(true), 3000);
    }
  };

  const addToCart = (product: Product, variant?: any, uninfused: boolean = false) => {
    const cartId = `${product.id}-${variant?.name || 'base'}-${uninfused ? 'uninfused' : 'infused'}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === cartId);
      if (existing) {
        return prev.map(item => 
          item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: cartId,
        productId: product.id,
        name: product.name,
        price: variant ? variant.price : product.price,
        image: product.image,
        variant: variant?.name,
        uninfused,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return total + (price * item.quantity);
  }, 0);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: newsletterEmail,
          source: "Newsletter Popup"
        })
      });
      localStorage.setItem("hasSeenNewsletter", "true");
      setShowNewsletter(false);
      setNewsletterEmail("");
      alert("Welcome to the club! Check your inbox for your 10% discount.");
    } catch (error) {
      console.error("Newsletter error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpdateProduct = async (id: string, updates: any) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAddProduct = async (product: any) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Hidden trigger: Click the logo period 3 times
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 3) {
      setShowLogin(true);
      setClickCount(0);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setIsAdmin(true);
        setShowLogin(false);
        setEmail("");
        setPassword("");
        setLoginError(false);
      } else {
        setLoginError(true);
      }
    } catch (e) {
      setLoginError(true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAdmin(false);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (isAdmin) {
    return (
      <AdminDashboard 
        products={products} 
        onLogout={handleLogout} 
        onUpdateProduct={handleUpdateProduct}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  }

  if (selectedProductId) {
    const product = products.find(p => p.id === selectedProductId);
    if (product) {
      return <ProductPage product={product} onBack={() => setSelectedProductId(null)} onAddToCart={addToCart} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {showAgeGate && <AgeGate onVerify={handleAgeVerify} />}
      </AnimatePresence>
      <NewsletterPopup 
        isOpen={showNewsletter} 
        onClose={() => setShowNewsletter(false)}
        email={newsletterEmail}
        setEmail={setNewsletterEmail}
        onSubmit={handleNewsletterSubmit}
      />
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
      />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-pantry-cream/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-serif text-2xl font-bold tracking-tighter select-none">
              WBM<span 
                onClick={handleLogoClick}
                className="text-pantry-gold cursor-default active:scale-125 transition-transform inline-block"
              >.</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#menu" className="nav-link">Menu</a>
              <a href="#about" className="nav-link">Our Story</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-pantry-ink hover:text-pantry-gold transition-colors"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-pantry-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-pantry-cream">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-pantry-ink hover:text-pantry-gold transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <ChevronDown size={24} className="-rotate-90" />}
              </button>
            </div>
            <a 
              href="#contact" 
              className="hidden sm:flex items-center gap-2 border border-pantry-ink/10 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-pantry-ink hover:text-white transition-all duration-300"
            >
              Order Now
            </a>
            <a 
              href="https://pixies-pantry.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pantry-ink text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-pantry-gold transition-colors duration-300"
            >
              <ShoppingBag size={16} />
              Shop All
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-pantry-cream border-b border-black/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif">Menu</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif">Our Story</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif">Contact & Order</a>
                <div className="pt-4 border-t border-black/5 flex flex-col gap-4">
                  <a 
                    href="#contact" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-pantry-ink/10 px-6 py-4 rounded-full text-lg font-medium"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800" 
              alt="Gourmet Muffins" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pantry-cream via-transparent to-pantry-cream" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block text-pantry-gold uppercase tracking-[0.3em] text-xs font-bold mb-6">
                Established in Excellence
              </span>
              <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] mb-8 tracking-tight">
                The World's <br />
                <span className="italic">Best</span> Muffins.
              </h1>
              <p className="text-xl text-pantry-ink/70 leading-relaxed mb-10 max-w-xl">
                Artisan pastries crafted with precision, passion, and premium full-spectrum infusions. Experience the pinnacle of gourmet baking.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#menu" 
                  className="bg-pantry-ink text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-pantry-gold transition-all duration-300 group"
                >
                  Explore the Menu
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://pixies-pantry.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-pantry-ink/20 px-8 py-4 rounded-full hover:bg-pantry-ink hover:text-white transition-all duration-300"
                >
                  Visit Pixie's Pantry
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20 border-y border-black/5 bg-white/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="flex flex-col items-center text-center gap-4">
                <ShieldCheck className="text-pantry-gold" size={32} />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Lab Tested</h4>
                  <p className="text-xs text-pantry-ink/50">Purity & Potency Guaranteed</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <Leaf className="text-pantry-gold" size={32} />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Organic Roots</h4>
                  <p className="text-xs text-pantry-ink/50">Non-GMO Ingredients</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <Clock className="text-pantry-gold" size={32} />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Fresh Baked</h4>
                  <p className="text-xs text-pantry-ink/50">Made to Order Daily</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-4">
                <Star className="text-pantry-gold" size={32} />
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider mb-1">5-Star Rated</h4>
                  <p className="text-xs text-pantry-ink/50">Trusted by Connoisseurs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-6xl mb-6">Our Signature Collection</h2>
                <p className="text-lg text-pantry-ink/60">
                  Each item in our pantry is a testament to our commitment to quality. From our world-renowned muffins to our artisanal spreads, discover the difference of Pixie's Pantry.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="h-px w-24 bg-pantry-gold self-center" />
                <span className="font-serif italic text-xl">The Artisan's Choice</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div onClick={() => setSelectedProductId(product.id)} className="cursor-pointer block">
                    <div className="product-image-container mb-6">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        {product.price}
                      </div>
                    </div>
                    <h3 className="text-2xl mb-2 group-hover:text-pantry-gold transition-colors">{product.name}</h3>
                    <p className="text-pantry-ink/60 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pantry-gold">
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="about" className="py-32 bg-pantry-ink text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
             <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000" 
              alt="Bakery" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl">
              <span className="text-pantry-gold uppercase tracking-widest text-xs font-bold mb-6 block">Our Legacy</span>
              <h2 className="text-5xl md:text-6xl mb-8">Crafted with Intention</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-12">
                We believe that the best things in life are made slowly, with the finest ingredients and a touch of magic. Our journey began with a simple mission: to create the world's best muffins, infused with the power of nature.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h4 className="text-3xl font-serif mb-2">100%</h4>
                  <p className="text-sm text-white/50 uppercase tracking-widest">Natural Ingredients</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif mb-2">24h</h4>
                  <p className="text-sm text-white/50 uppercase tracking-widest">Slow-Rise Process</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Order Section */}
        <section id="contact" className="py-32 bg-pantry-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-pantry-gold uppercase tracking-[0.3em] text-xs font-bold mb-6 block">Get in Touch</span>
              <h2 className="text-5xl md:text-6xl mb-8">Contact & Custom Orders</h2>
              <p className="text-lg text-pantry-ink/60">
                Whether you have a general question or want to place a custom order, we're here to help. For custom orders, we'll send you an invoice once your order is confirmed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* General Inquiry Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-black/5"
              >
                <h3 className="text-2xl font-serif mb-8 flex items-center gap-3">
                  <Mail className="text-pantry-gold" size={24} />
                  General Inquiry
                </h3>
                <form 
                  action="https://formspree.io/f/mvzbwyzk" 
                  method="POST" 
                  className="space-y-6"
                  onSubmit={async (e) => {
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries());
                    try {
                      await fetch("/api/clients", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          name: data.name,
                          email: data.email,
                          source: "General Inquiry",
                          subscribeNewsletter: data.subscribe_newsletter === "on"
                        }),
                      });
                    } catch (err) {
                      console.error("Failed to save client", err);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Name</label>
                      <input type="text" name="name" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Email</label>
                      <input type="email" name="email" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Message</label>
                    <textarea name="message" required rows={4} className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="subscribe_newsletter" id="inquiry-newsletter" defaultChecked className="w-5 h-5 rounded border-pantry-gold/20 text-pantry-gold focus:ring-pantry-gold/20 cursor-pointer" />
                    <label htmlFor="inquiry-newsletter" className="text-sm font-medium cursor-pointer">Subscribe to our newsletter for 10% off</label>
                  </div>
                  <button type="submit" className="w-full bg-pantry-ink text-white py-4 rounded-xl font-bold hover:bg-pantry-gold transition-colors duration-300 shadow-lg">
                    Send Message
                  </button>
                </form>
              </motion.div>

              {/* Order Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-10 rounded-3xl shadow-xl border border-black/5"
              >
                <h3 className="text-2xl font-serif mb-8 flex items-center gap-3">
                  <ShoppingBag className="text-pantry-gold" size={24} />
                  Complete Your Order
                </h3>
                
                {cart.length > 0 ? (
                  <div className="mb-8 space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Order Summary</h4>
                      <div className="space-y-3">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name} {item.variant ? `(${item.variant})` : ''}</span>
                            <span className="font-bold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Amount</span>
                        <span className="text-xl font-serif text-pantry-gold">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 p-8 bg-pantry-gold/5 border border-dashed border-pantry-gold/30 rounded-2xl text-center">
                    <p className="text-sm text-pantry-ink/60 italic">Your cart is empty. Add items from the menu above to build your order.</p>
                  </div>
                )}

                <form 
                  action="https://formspree.io/f/mvzbwyzk" 
                  method="POST" 
                  className="space-y-6"
                  onSubmit={async (e) => {
                    if (cart.length === 0) {
                      e.preventDefault();
                      alert("Please add items to your cart before checking out.");
                      return;
                    }
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData.entries());
                    
                    const orderDetails = cart.map(item => 
                      `${item.quantity}x ${item.name} ${item.variant ? `(${item.variant})` : ''} [${item.uninfused ? 'UNINFUSED' : 'INFUSED'}]`
                    ).join('\n');

                    try {
                      // Save to orders table
                      await fetch("/api/orders", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          name: data.full_name,
                          email: data.email,
                          phone: data.phone,
                          address: data.address,
                          order_details: orderDetails,
                          total_amount: `$${cartTotal.toFixed(2)}`,
                          uninfused: cart.every(i => i.uninfused),
                          subscribeNewsletter: data.subscribe_newsletter === "on"
                        }),
                      });
                      setCart([]); // Clear cart on success
                    } catch (err) {
                      console.error("Failed to save order", err);
                    }
                  }}
                >
                  {/* Hidden inputs for Formspree to include cart details */}
                  <input type="hidden" name="order_summary" value={cart.map(item => `${item.quantity}x ${item.name} (${item.variant || 'Standard'})`).join(', ')} />
                  <input type="hidden" name="total_price" value={`$${cartTotal.toFixed(2)}`} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Full Name</label>
                      <input type="text" name="full_name" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Email</label>
                      <input type="email" name="email" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Phone Number</label>
                      <input type="tel" name="phone" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="(555) 000-0000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-pantry-ink/40">Delivery Address</label>
                      <input type="text" name="address" required className="w-full bg-pantry-cream border border-black/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all" placeholder="123 Muffin St, Bakery City" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="subscribe_newsletter" id="order-newsletter" defaultChecked className="w-5 h-5 rounded border-pantry-gold/20 text-pantry-gold focus:ring-pantry-gold/20 cursor-pointer" />
                    <label htmlFor="order-newsletter" className="text-sm font-medium cursor-pointer">Subscribe to our newsletter for 10% off</label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={cart.length === 0}
                    className="w-full bg-pantry-ink text-white py-5 rounded-2xl font-bold hover:bg-pantry-gold transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Place Order Request
                  </button>
                  <p className="text-[10px] text-center text-pantry-ink/40 uppercase tracking-widest">
                    We'll contact you to confirm and send an invoice
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-pantry-ink/60 backdrop-blur-md px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl border border-black/5 relative overflow-hidden"
            >
              <button 
                onClick={() => {
                  setShowNewsletter(false);
                  localStorage.setItem("hasSeenNewsletterPopup", "true");
                }} 
                className="absolute top-6 right-6 text-pantry-ink/20 hover:text-pantry-ink transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 text-center space-y-8">
                <div className="w-24 h-24 bg-pantry-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Gift className="text-pantry-gold" size={40} />
                  <div className="absolute -top-2 -right-2 bg-pantry-ink text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                    Gift
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-serif leading-tight">Take 10% Off <br/><span className="italic">Your First Batch.</span></h2>
                  <p className="text-pantry-ink/60 leading-relaxed">
                    Join the Baker’s Box Club for fresh-baked deals, sweet updates, and a little something to help you unwind. Dropped right in your inbox.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-pantry-cream border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all text-center"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-pantry-ink text-white py-5 rounded-2xl font-bold hover:bg-pantry-gold transition-all duration-300 shadow-xl hover:shadow-pantry-gold/20"
                  >
                    Help Me Chill Out (and Save 10%)
                  </button>
                </form>
                
                <p className="text-[10px] uppercase tracking-[0.2em] text-pantry-ink/30 font-bold">
                  No spam, just sweetness.
                </p>
              </div>

              {/* Decorative background elements */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pantry-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-pantry-gold/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-pantry-ink/40 backdrop-blur-sm px-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-black/5"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">Admin Access</h2>
                <button onClick={() => setShowLogin(false)} className="text-pantry-ink/40 hover:text-pantry-ink transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-pantry-ink/40 mb-2">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                      className={`w-full bg-pantry-cream border ${loginError ? 'border-red-500' : 'border-black/5'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all`}
                      placeholder="admin@pixies-pantry.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-pantry-ink/20" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-pantry-ink/40 mb-2">Password</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-pantry-cream border ${loginError ? 'border-red-500' : 'border-black/5'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pantry-gold/20 transition-all`}
                      placeholder="Enter credentials..."
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-pantry-ink/20" size={18} />
                  </div>
                  {loginError && <p className="text-red-500 text-xs mt-2">Invalid credentials. Please try again.</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-pantry-ink text-white py-4 rounded-xl font-bold hover:bg-pantry-gold transition-colors duration-300"
                >
                  Verify Identity
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-pantry-cream border-t border-black/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <a href="#" className="font-serif text-3xl font-bold tracking-tighter mb-6 block">
                The World's Best Muffins<span className="text-pantry-gold">.</span>
              </a>
              <p className="text-pantry-ink/60 max-w-sm leading-relaxed">
                Elevating the art of the muffin through artisanal baking and premium infusions. Join us in our pursuit of the perfect bite.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#menu" className="text-sm text-pantry-ink/60 hover:text-pantry-gold transition-colors">Menu</a></li>
                <li><a href="#about" className="text-sm text-pantry-ink/60 hover:text-pantry-gold transition-colors">Our Story</a></li>
                <li><a href="#contact" className="text-sm text-pantry-ink/60 hover:text-pantry-gold transition-colors">Contact & Order</a></li>
                <li><a href="https://pixies-pantry.com" className="text-sm text-pantry-ink/60 hover:text-pantry-gold transition-colors">Shop All</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-sm text-pantry-ink/60">support@pixies-pantry.com</li>
                <li className="text-sm text-pantry-ink/60">Follow us @pixieispantryshop</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-black/5 gap-6">
            <p className="text-xs text-pantry-ink/40 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} The World's Best Muffins. All rights reserved.
            </p>
            <p className="text-sm font-medium">
              Powered by <a href="https://pixies-pantry.com" target="_blank" rel="noopener noreferrer" className="text-pantry-gold hover:underline underline-offset-4">Pixies Pantry</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductPage({ product, onBack, onAddToCart }: { product: Product, onBack: () => void, onAddToCart: (product: Product, variant?: any, uninfused?: boolean) => void }) {
  const [isUninfused, setIsUninfused] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>(product.variants?.[0] || null);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, isUninfused);
  };

  return (
    <div className="min-h-screen bg-pantry-cream">
      <nav className="fixed top-0 w-full z-50 bg-pantry-cream/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium hover:text-pantry-gold transition-colors">
            <ArrowRight size={16} className="rotate-180" /> Back to Collection
          </button>
          <a href="#" className="font-serif text-2xl font-bold tracking-tighter">
            WBM<span className="text-pantry-gold">.</span>
          </a>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-square"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Content Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div>
                <span className="text-pantry-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                  {product.category || 'Gourmet Selection'}
                </span>
                <h1 className="text-5xl md:text-6xl mb-4 leading-tight">{product.name}</h1>
                <p className="text-3xl font-serif text-pantry-gold">{selectedVariant ? selectedVariant.price : product.price}</p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black/10 pb-2">Select Strength / Size</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant: any) => (
                      <button
                        key={variant.name}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border ${selectedVariant?.name === variant.name ? 'bg-pantry-ink text-white border-pantry-ink' : 'bg-white text-pantry-ink border-black/5 hover:border-pantry-gold'}`}
                      >
                        {variant.name} - {variant.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black/10 pb-2">Description</h3>
                <p className="text-lg text-pantry-ink/70 leading-relaxed">
                  {product.long_description || product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black/10 pb-2">Ingredients</h3>
                  <p className="text-sm text-pantry-ink/60 leading-relaxed italic">
                    {product.ingredients || 'Premium organic ingredients, locally sourced.'}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm uppercase tracking-widest font-bold border-b border-black/10 pb-2">Benefits</h3>
                  <p className="text-sm text-pantry-ink/60 leading-relaxed">
                    {product.benefits || 'Crafted for wellness and exceptional taste.'}
                  </p>
                </div>
              </div>

              <div className="bg-white/50 p-8 rounded-2xl border border-black/5 space-y-4">
                <h3 className="text-sm uppercase tracking-widest font-bold">The Artisan Promise</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-pantry-ink/70">
                    <ShieldCheck size={16} className="text-pantry-gold" />
                    Third-party lab tested for purity and potency
                  </li>
                  <li className="flex items-center gap-3 text-sm text-pantry-ink/70">
                    <Leaf size={16} className="text-pantry-gold" />
                    100% Organic, Non-GMO ingredients
                  </li>
                  <li className="flex items-center gap-3 text-sm text-pantry-ink/70">
                    <Clock size={16} className="text-pantry-gold" />
                    Baked fresh to order in small batches
                  </li>
                </ul>
              </div>

              <div className="bg-pantry-gold/5 p-6 rounded-2xl border border-pantry-gold/10 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="pt-1">
                    <input 
                      type="checkbox" 
                      id="uninfused-opt"
                      checked={isUninfused}
                      onChange={(e) => setIsUninfused(e.target.checked)}
                      className="w-5 h-5 rounded border-pantry-gold/20 text-pantry-gold focus:ring-pantry-gold/20 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="uninfused-opt" className="flex-grow cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">Order Plain & Uninfused</span>
                      <div className="group relative">
                        <div className="w-4 h-4 rounded-full border border-pantry-ink/20 flex items-center justify-center text-[10px] font-bold text-pantry-ink/40 cursor-help">i</div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-pantry-ink text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                          This means there will be no hemp extraction mixed into your baked goods. Same price, same artisan quality.
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-pantry-ink/50 leading-relaxed">
                      Select this if you prefer our gourmet treats without any infusion.
                    </p>
                  </label>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-pantry-ink text-white py-6 rounded-full flex items-center justify-center gap-3 text-lg font-bold hover:bg-pantry-gold transition-all duration-300 shadow-xl hover:shadow-pantry-gold/20"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full border-2 border-pantry-gold text-pantry-ink py-4 rounded-full flex items-center justify-center gap-3 text-sm font-bold hover:bg-pantry-gold hover:text-white transition-all duration-300 shadow-lg"
                >
                  <ShoppingBag size={18} />
                  Buy Now on Pixie's Pantry
                </a>
                <p className="text-center text-xs text-pantry-ink/40 uppercase tracking-widest">
                  Secure Checkout via Pixie's Pantry or Direct Invoice
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity, 
  total 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onRemove: (id: string) => void, 
  onUpdateQuantity: (id: string, delta: number) => void,
  total: number
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-pantry-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-2xl font-serif">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-pantry-gold/10 rounded-full flex items-center justify-center">
                    <ShoppingBag size={40} className="text-pantry-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-2">Your cart is empty</h3>
                    <p className="text-pantry-ink/40 text-sm">Add some gourmet treats to get started.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-pantry-ink text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-pantry-gold transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-black/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-pantry-ink/20 hover:text-red-500 transition-colors">
                          <Trash size={16} />
                        </button>
                      </div>
                      <div className="text-xs text-pantry-ink/50 mb-3 space-y-0.5">
                        {item.variant && <p>Variant: {item.variant}</p>}
                        <p>{item.uninfused ? 'Plain & Uninfused' : 'Infused'}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-black/10 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-black/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-black/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="font-bold text-pantry-gold text-sm">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-white space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-pantry-ink/40 text-sm uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-2xl font-serif">${total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-pantry-ink/40 uppercase tracking-widest text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <button 
                  onClick={() => {
                    onClose();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full bg-pantry-ink text-white py-5 rounded-2xl font-bold hover:bg-pantry-gold transition-all shadow-xl"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


function VariantsManager({ variants, onChange }: { variants: any[], onChange: (variants: any[]) => void }) {
  const addVariant = () => {
    onChange([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    onChange(newVariants);
  };

  return (
    <div className="space-y-3 mt-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Variants & Pricing</label>
        <button 
          type="button"
          onClick={addVariant}
          className="text-[10px] font-bold uppercase tracking-widest text-pantry-gold hover:underline"
        >
          + Add Variant
        </button>
      </div>
      <div className="space-y-2">
        {variants.map((variant, index) => (
          <div key={index} className="flex gap-2">
            <input 
              placeholder="Variant Name (e.g. 100mg)"
              className="flex-grow p-2 text-xs border rounded bg-slate-50 outline-none focus:ring-1 focus:ring-pantry-gold/20"
              value={variant.name}
              onChange={(e) => updateVariant(index, "name", e.target.value)}
            />
            <input 
              placeholder="Price"
              className="w-24 p-2 text-xs border rounded bg-slate-50 outline-none focus:ring-1 focus:ring-pantry-gold/20"
              value={variant.price}
              onChange={(e) => updateVariant(index, "price", e.target.value)}
            />
            <button 
              type="button"
              onClick={() => removeVariant(index)}
              className="p-2 text-red-400 hover:bg-red-50 rounded"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {variants.length === 0 && (
          <p className="text-[10px] text-slate-400 italic">No variants added. Using base price.</p>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ 
  products, 
  onLogout, 
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct
}: { 
  products: any[], 
  onLogout: () => void, 
  onUpdateProduct: (id: string, updates: any) => void,
  onAddProduct: (product: any) => void,
  onDeleteProduct: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState<"inventory" | "customers" | "orders" | "newsletter" | "settings">("inventory");
  const [clients, setClients] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [newsletterSearch, setNewsletterSearch] = useState("");
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (activeTab === "customers") {
      fetchClients();
    } else if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "newsletter") {
      fetchNewsletter();
    } else if (activeTab === "settings") {
      fetchSettings();
    }
  }, [activeTab]);

  const fetchNewsletter = async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setNewsletter(data);
    } catch (e) {
      console.error("Failed to fetch newsletter", e);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error("Failed to fetch clients", e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error("Failed to fetch orders", e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSiteSettings(data);
    } catch (e) {
      console.error("Failed to fetch settings", e);
    }
  };

  const saveSettings = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteSettings),
      });
      alert("Settings saved successfully!");
    } catch (e) {
      console.error("Failed to save settings", e);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const deleteClient = async (id: number) => {
    if (!confirm("Are you sure you want to remove this customer?")) return;
    try {
      await fetch(`/api/clients/${id}`, { method: "DELETE" });
      fetchClients();
    } catch (e) {
      console.error("Failed to delete client", e);
    }
  };

  const handleImageUpload = async (file: File, isEdit: boolean) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.imageUrl) {
        if (isEdit) {
          setEditForm(prev => ({ ...prev, image: data.imageUrl }));
        } else {
          setAddForm(prev => ({ ...prev, image: data.imageUrl }));
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>({ 
    name: "", 
    description: "", 
    long_description: "",
    ingredients: "",
    benefits: "",
    price: "", 
    image: "", 
    link: "",
    category: "",
    variants: []
  });
  const [addForm, setAddForm] = useState<any>({ 
    id: "", 
    name: "", 
    description: "", 
    long_description: "",
    ingredients: "",
    benefits: "",
    price: "", 
    image: "", 
    link: "",
    category: "",
    variants: []
  });

  const stats = [
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-pantry-gold" },
    { label: "Active Orders", value: orders.filter(o => o.status === 'pending').length.toString(), icon: ShoppingBag, color: "text-amber-600" },
    { label: "Total Customers", value: clients.length.toString(), icon: Users, color: "text-blue-600" },
  ];

  const startEditing = (product: any) => {
    setEditingId(product.id);
    setEditForm({ 
      name: product.name || "", 
      description: product.description || "", 
      long_description: product.long_description || "",
      ingredients: product.ingredients || "",
      benefits: product.benefits || "",
      price: product.price || "", 
      image: product.image || "",
      link: product.link || "",
      category: product.category || "",
      variants: product.variants || []
    });
  };

  const saveEdit = async () => {
    if (editingId) {
      await onUpdateProduct(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = addForm.name.toLowerCase().replace(/\s+/g, '-');
    await onAddProduct({ ...addForm, id });
    setIsAdding(false);
    setAddForm({ 
      id: "", 
      name: "", 
      description: "", 
      long_description: "",
      ingredients: "",
      benefits: "",
      price: "", 
      image: "", 
      link: "",
      category: "",
      variants: []
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-pantry-ink text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="font-serif text-xl font-bold tracking-tighter">
          WBM<span className="text-pantry-gold">.</span>
        </div>
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileSidebarOpen ? <X size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        w-64 bg-pantry-ink text-white p-8 flex flex-col fixed h-full z-40 transition-transform duration-300
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="font-serif text-2xl font-bold tracking-tighter mb-12">
          WBM<span className="text-pantry-gold">.</span>
          <span className="block text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-white/40 mt-1">Admin Panel</span>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => {
              setActiveTab("inventory");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "inventory" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            <Package size={18} /> Inventory
          </button>
          <button 
            onClick={() => {
              setActiveTab("customers");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "customers" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            <Users size={18} /> Customers
          </button>
          <button 
            onClick={() => {
              setActiveTab("orders");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "orders" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            <ShoppingBag size={18} /> Orders
          </button>
          <button 
            onClick={() => {
              setActiveTab("newsletter");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "newsletter" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            <Mail size={18} /> Newsletter
          </button>
          <button 
            onClick={() => {
              setActiveTab("settings");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "settings" ? "bg-white/10 text-white font-medium" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all mt-auto"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:pl-64 p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif mb-2">
              {activeTab === "inventory" ? "Pantry Management" : activeTab === "customers" ? "Customer Relations" : activeTab === "orders" ? "Order Fulfillment" : activeTab === "newsletter" ? "Newsletter Capture" : "Site Configuration"}
            </h1>
            <p className="text-slate-500">
              {activeTab === "inventory" ? "Real-time control over your gourmet collection." : activeTab === "customers" ? "Manage your growing community of connoisseurs." : activeTab === "orders" ? "Track and process internal orders." : activeTab === "newsletter" ? "View and manage your newsletter subscribers." : "Fine-tune your digital presence and contact details."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">Pixie's Pantry</p>
              <p className="text-xs text-slate-400">Master Baker</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-pantry-gold flex items-center justify-center text-white font-bold">
              PP
            </div>
          </div>
        </header>

        {activeTab === "inventory" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Add Product Form */}
            <AnimatePresence>
              {isAdding && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden mb-12"
                >
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-serif">Add New Product</h3>
                      <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                      </button>
                    </div>
                    <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <input 
                          required
                          placeholder="Product Name"
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none"
                          value={addForm.name}
                          onChange={e => setAddForm({...addForm, name: e.target.value})}
                        />
                        <input 
                          required
                          placeholder="Price (e.g. $24.00)"
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none"
                          value={addForm.price}
                          onChange={e => setAddForm({...addForm, price: e.target.value})}
                        />
                        <input 
                          required
                          placeholder="Category (e.g. Pastries)"
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none"
                          value={addForm.category}
                          onChange={e => setAddForm({...addForm, category: e.target.value})}
                        />
                        <div className="relative group">
                          <input 
                            placeholder="Image URL"
                            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none pr-12"
                            value={addForm.image}
                            onChange={e => setAddForm({...addForm, image: e.target.value})}
                          />
                          <label className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-pantry-ink/40 hover:text-pantry-gold transition-colors">
                            <Upload size={20} />
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file, false);
                              }}
                            />
                          </label>
                          {isUploading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl"><div className="w-4 h-4 border-2 border-pantry-gold border-t-transparent animate-spin rounded-full" /></div>}
                        </div>
                        <input 
                          required
                          placeholder="Product Link (Pixie's Pantry URL)"
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none"
                          value={addForm.link}
                          onChange={e => setAddForm({...addForm, link: e.target.value})}
                        />
                      </div>
                      <div className="space-y-4">
                        <input 
                          required
                          placeholder="Short Description"
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none"
                          value={addForm.description}
                          onChange={e => setAddForm({...addForm, description: e.target.value})}
                        />
                        <textarea 
                          required
                          placeholder="Long Detailed Description"
                          rows={3}
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none resize-none"
                          value={addForm.long_description}
                          onChange={e => setAddForm({...addForm, long_description: e.target.value})}
                        />
                        <textarea 
                          required
                          placeholder="Ingredients"
                          rows={2}
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none resize-none"
                          value={addForm.ingredients}
                          onChange={e => setAddForm({...addForm, ingredients: e.target.value})}
                        />
                        <textarea 
                          required
                          placeholder="Benefits"
                          rows={2}
                          className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-pantry-gold/20 outline-none resize-none"
                          value={addForm.benefits}
                          onChange={e => setAddForm({...addForm, benefits: e.target.value})}
                        />
                        <VariantsManager 
                          variants={addForm.variants} 
                          onChange={(variants) => setAddForm({...addForm, variants})} 
                        />
                        <button type="submit" className="w-full bg-pantry-ink text-white py-3 rounded-xl font-bold hover:bg-pantry-gold transition-colors">
                          Create Product
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Management */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-serif">Product Inventory</h3>
                {!isAdding && (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-pantry-ink text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-pantry-gold transition-colors"
                  >
                    Add Product
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                      <th className="px-8 py-4">Product Details</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            {editingId === product.id ? (
                              <div className="space-y-3 w-full max-w-2xl grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase font-bold text-slate-400">Basic Info</label>
                                  <input 
                                    type="text" 
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full text-sm p-2 border rounded bg-slate-50"
                                    placeholder="Name"
                                  />
                                  <input 
                                    type="text" 
                                    value={editForm.category}
                                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50"
                                    placeholder="Category"
                                  />
                                  <div className="relative group">
                                    <input 
                                      type="text" 
                                      value={editForm.image}
                                      onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                      className="w-full text-xs p-2 border rounded bg-slate-50 pr-10"
                                      placeholder="Image URL"
                                    />
                                    <label className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-pantry-ink/40 hover:text-pantry-gold transition-colors">
                                      <Upload size={16} />
                                      <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleImageUpload(file, true);
                                        }}
                                      />
                                    </label>
                                    {isUploading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded"><div className="w-3 h-3 border-2 border-pantry-gold border-t-transparent animate-spin rounded-full" /></div>}
                                  </div>
                                  <input 
                                    type="text" 
                                    value={editForm.link}
                                    onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50"
                                    placeholder="Product Link"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] uppercase font-bold text-slate-400">Descriptions & Details</label>
                                  <input 
                                    type="text" 
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50"
                                    placeholder="Short Description"
                                  />
                                  <textarea 
                                    value={editForm.long_description}
                                    onChange={(e) => setEditForm({ ...editForm, long_description: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50 resize-none"
                                    rows={2}
                                    placeholder="Long Description"
                                  />
                                  <textarea 
                                    value={editForm.ingredients}
                                    onChange={(e) => setEditForm({ ...editForm, ingredients: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50 resize-none"
                                    rows={2}
                                    placeholder="Ingredients"
                                  />
                                  <textarea 
                                    value={editForm.benefits}
                                    onChange={(e) => setEditForm({ ...editForm, benefits: e.target.value })}
                                    className="w-full text-xs p-2 border rounded bg-slate-50 resize-none"
                                    rows={2}
                                    placeholder="Benefits"
                                  />
                                  <VariantsManager 
                                    variants={editForm.variants} 
                                    onChange={(variants) => setEditForm({...editForm, variants})} 
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <img src={product.image} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                <div>
                                  <p className="font-bold text-sm">{product.name}</p>
                                  <div className="flex items-center gap-2">
                                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{product.description}</p>
                                    {product.variants && product.variants.length > 0 && (
                                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                                        {product.variants.length} Variants
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-medium">
                          {editingId === product.id ? (
                            <input 
                              type="text" 
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="w-24 p-2 border rounded bg-slate-50"
                            />
                          ) : (
                            product.price
                          )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          {editingId === product.id ? (
                            <div className="flex gap-3 justify-end">
                              <button onClick={saveEdit} className="text-emerald-600 hover:underline text-sm font-bold">Save</button>
                              <button onClick={() => setEditingId(null)} className="text-slate-400 hover:underline text-sm font-bold">Cancel</button>
                            </div>
                          ) : (
                            <div className="flex gap-4 justify-end">
                              <button onClick={() => startEditing(product)} className="text-pantry-gold hover:underline text-sm font-bold">Edit</button>
                              <button onClick={() => onDeleteProduct(product.id)} className="text-red-400 hover:underline text-sm font-bold">Delete</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === "customers" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-serif">Customer Directory</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-pantry-gold/20"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                  />
                  <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button 
                  onClick={fetchClients}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
                  title="Refresh List"
                >
                  <Clock size={20} />
                </button>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-sm font-bold">{clients.length} Total</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Contact Info</th>
                    <th className="px-8 py-4">Source</th>
                    <th className="px-8 py-4">Infusion</th>
                    <th className="px-8 py-4">Payment</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients
                    .filter(c => 
                      c.name?.toLowerCase().includes(clientSearch.toLowerCase()) || 
                      c.email?.toLowerCase().includes(clientSearch.toLowerCase()) ||
                      c.source?.toLowerCase().includes(clientSearch.toLowerCase())
                    )
                    .map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-sm">{client.name || "Anonymous"}</p>
                          <p className="text-xs text-slate-400">{client.address || "No address provided"}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-2">
                            <Mail size={12} className="text-pantry-gold" />
                            {client.email}
                          </p>
                          {client.phone && (
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                              <BarChart3 size={12} className="text-slate-300" />
                              {client.phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {client.source}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        {client.uninfused ? (
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Uninfused
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Infused
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        {client.payment_method ? (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard size={14} className="text-emerald-500" />
                            {client.payment_method}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-300 italic">N/A</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => deleteClient(client.id)}
                          className="text-red-400 hover:underline text-sm font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-300">
                          <Users size={48} />
                          <p className="font-serif text-xl">No customers yet.</p>
                          <p className="text-sm max-w-xs">Customer data will appear here as people interact with your forms.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-serif">Internal Orders</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-pantry-gold/20"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                  <ShoppingBag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button 
                  onClick={fetchOrders}
                  className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
                  title="Refresh List"
                >
                  <Clock size={20} />
                </button>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <ShoppingBag size={16} className="text-slate-400" />
                  <span className="text-sm font-bold">{orders.length} Total</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-8 py-4">Order ID</th>
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Details</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders
                    .filter(o => 
                      o.customer_name?.toLowerCase().includes(orderSearch.toLowerCase()) || 
                      o.customer_email?.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      o.order_details?.toLowerCase().includes(orderSearch.toLowerCase())
                    )
                    .map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-xs font-mono text-slate-400">#{order.id.toString().padStart(4, '0')}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-sm">{order.customer_name}</p>
                          <p className="text-xs text-slate-400">{order.customer_email}</p>
                          <p className="text-xs text-slate-400">{order.customer_phone}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="max-w-xs">
                          <p className="text-sm line-clamp-2">{order.order_details}</p>
                          {order.uninfused ? (
                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Uninfused Order</span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Infused Order</span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          value={order.status}
                          onChange={async (e) => {
                            await fetch(`/api/orders/${order.id}/status`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ status: e.target.value })
                            });
                            fetchOrders();
                          }}
                          className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border-none cursor-pointer focus:ring-0 ${
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'shipped' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-slate-400">{new Date(order.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this order?')) {
                              await fetch(`/api/orders/${order.id}`, { method: 'DELETE' });
                              fetchOrders();
                            }
                          }}
                          className="text-red-400 hover:underline text-sm font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-300">
                          <ShoppingBag size={48} />
                          <p className="font-serif text-xl">No orders yet.</p>
                          <p className="text-sm max-w-xs">Orders placed directly on the site will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "newsletter" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif">Newsletter Capture List</h3>
                <p className="text-sm text-slate-400">Export or manage your email marketing list.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search subscribers..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pantry-gold/20 w-64"
                    value={newsletterSearch}
                    onChange={(e) => setNewsletterSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <Mail size={16} className="text-slate-400" />
                  <span className="text-sm font-bold">{newsletter.length} Total</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-8 py-4">Email Address</th>
                    <th className="px-8 py-4">Subscription Date</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {newsletter
                    .filter(sub => sub.email.toLowerCase().includes(newsletterSearch.toLowerCase()))
                    .map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-bold text-sm">{sub.email}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs text-slate-400">{new Date(sub.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">Active</span>
                      </td>
                    </tr>
                  ))}
                  {newsletter.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-300">
                          <Mail size={48} />
                          <p className="font-serif text-xl">No subscribers yet.</p>
                          <p className="text-sm max-w-xs">Users who sign up for the newsletter will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-xl font-serif">General Settings</h3>
                <p className="text-sm text-slate-400">Configure your website's identity and global parameters.</p>
              </div>
              <form onSubmit={saveSettings} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Site Title</label>
                    <input 
                      type="text"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-pantry-gold/20"
                      value={siteSettings.site_title || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, site_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Contact Email</label>
                    <input 
                      type="email"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-pantry-gold/20"
                      value={siteSettings.contact_email || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Social Handle</label>
                    <input 
                      type="text"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-pantry-gold/20"
                      value={siteSettings.social_handle || ""}
                      onChange={(e) => setSiteSettings({ ...siteSettings, social_handle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Site Description</label>
                  <textarea 
                    rows={3}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-pantry-gold/20 resize-none"
                    value={siteSettings.site_description || ""}
                    onChange={(e) => setSiteSettings({ ...siteSettings, site_description: e.target.value })}
                  />
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    type="submit"
                    disabled={isSavingSettings}
                    className="bg-pantry-ink text-white px-10 py-4 rounded-2xl font-bold hover:bg-pantry-gold transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSavingSettings ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    ) : (
                      <ShieldCheck size={20} />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}