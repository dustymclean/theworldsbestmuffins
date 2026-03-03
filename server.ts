import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import session from "express-session";
import cookieParser from "cookie-parser";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("muffins.db");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Initialize local database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    long_description TEXT,
    ingredients TEXT,
    benefits TEXT,
    price TEXT,
    image TEXT,
    link TEXT,
    category TEXT,
    variants TEXT
  )
`);

try {
  db.exec("ALTER TABLE products ADD COLUMN variants TEXT");
} catch (e) {
  // Column already exists
}

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    payment_method TEXT,
    source TEXT,
    uninfused BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    order_details TEXT,
    total_amount TEXT,
    status TEXT DEFAULT 'pending',
    uninfused BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
// Only initialize the client if we actually have the environment variables
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null as any;

const INITIAL_PRODUCTS = [
  {
    id: "blueberry-muffins",
    name: "Artisan Blueberry Muffins",
    description: "Fresh baked gourmet breakfast pastries, infused for a perfect morning.",
    long_description: "Start your morning right with our Artisan Blueberry Muffins. Baked fresh daily with plump, organic blueberries and infused with premium full-spectrum hemp extract for a perfectly balanced start to your day. Soft, moist, and crafted to elevate your routine.",
    ingredients: "Organic Flour, Wild Blueberries, Farm Fresh Eggs, Organic Cane Sugar, Full-Spectrum Hemp Extract, Pure Vanilla Extract, Baking Powder, Sea Salt.",
    benefits: "Promotes morning relaxation, provides a gentle mood lift, and delivers a delicious dose of antioxidants.",
    price: "$15.00 – $20.00",
    variants: [
      { name: "100mg (2-Pack)", price: "$15.00" },
      { name: "200mg (2-Pack)", price: "$20.00" }
    ],
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/pixies-pantry-artisan-blueberry-muffins-2-pack-fresh-baked-gourmet-breakfast-pastries/",
    category: "Pastries"
  },
  {
    id: "banana-nut-muffins",
    name: "Banana Nut Muffins",
    description: "Full spectrum infused banana nut goodness with a crunchy topping.",
    long_description: "Comfort food meets elevated wellness. Our Banana Nut Muffins feature ripe bananas, toasted walnuts, and a precise dose of full-spectrum infusion, all topped with a delightful crunchy streusel. The perfect companion for your afternoon coffee.",
    ingredients: "Ripe Organic Bananas, Toasted Walnuts, Organic Flour, Brown Sugar, Farm Fresh Eggs, Full-Spectrum Hemp Extract, Cinnamon, Nutmeg.",
    benefits: "Sustained energy, gentle full-body relaxation, and natural stress relief.",
    price: "$15.00 – $90.00",
    variants: [
      { name: "100mg (2-Pack)", price: "$15.00" },
      { name: "200mg (2-Pack)", price: "$20.00" },
      { name: "Dozen (Infused)", price: "$90.00" }
    ],
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/banana-nut-muffins-full-spectrum-infused/",
    category: "Pastries"
  },
  {
    id: "bundle-box",
    name: "Pixie's Bundle Box",
    description: "The ultimate collection of our signature cookies and muffins.",
    long_description: "Can't decide? The Pixie's Bundle Box gives you the ultimate tasting experience. A hand-selected assortment of our finest infused cookies and muffins, perfectly packaged for gifting or treating yourself to a complete spectrum of flavors.",
    ingredients: "Varies by included selection (See individual product profiles for specific allergen information).",
    benefits: "A complete spectrum of wellness benefits, perfect for discovering your favorite infusion method.",
    price: "$15.00 – $25.00",
    variants: [
      { name: "500mg Total", price: "$15.00" },
      { name: "1000mg Total", price: "$25.00" }
    ],
    image: "https://images.unsplash.com/photo-1516919549054-e08258825f80?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/pixies-pantry-full-spectrum-bundle-box/",
    category: "Bundles"
  },
  {
    id: "peanut-butter",
    name: "Infused Peanut Butter",
    description: "Creamy, small-batch peanut butter for the ultimate snack.",
    long_description: "Small-batch, ultra-creamy peanut butter infused with premium full-spectrum extract. A savory, satisfying, and discreet way to incorporate serious wellness into your daily routine.",
    ingredients: "Dry Roasted Peanuts, Sea Salt, Full-Spectrum Hemp Extract.",
    benefits: "Protein-rich energy, targeted relaxation, and easy daily integration.",
    price: "$30.00 – $40.00",
    variants: [
      { name: "500mg (4 oz)", price: "$30.00" },
      { name: "1000mg (4 oz)", price: "$40.00" }
    ],
    image: "https://images.unsplash.com/photo-1590505681226-06103447a9c4?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/infused-peanut-butter-full-spectrum/",
    category: "Spreads"
  },
  {
    id: "hazelnut-spread",
    name: "Infused Hazelnut Spread",
    description: "Rich, velvety hazelnut spread with a full spectrum infusion.",
    long_description: "A decadent, velvety hazelnut chocolate spread crafted in small batches. Perfect for toast, fruit, or eating straight off the spoon. It delivers a potent and delicious full-spectrum experience disguised as pure indulgence.",
    ingredients: "Roasted Hazelnuts, Cocoa Powder, Organic Cane Sugar, Palm-Oil Free Vegetable Blend, Full-Spectrum Hemp Extract, Sunflower Lecithin.",
    benefits: "Versatile dosing, mood elevation, and indulgent stress relief.",
    price: "$30.00 – $40.00",
    variants: [
      { name: "500mg (4 oz)", price: "$30.00" },
      { name: "1000mg (4 oz)", price: "$40.00" }
    ],
    image: "https://images.unsplash.com/photo-1590505681226-06103447a9c4?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/infused-hazelnut-spread-full-spectrum/",
    category: "Spreads"
  },
  {
    id: "pb-cookies",
    name: "Peanut Butter Cookies",
    description: "Soft, chewy, and perfectly infused for a relaxing treat.",
    long_description: "Soft, chewy, and melt-in-your-mouth delicious. These classic peanut butter cookies are elevated with our signature full-spectrum infusion, making them the absolute perfect evening wind-down treat.",
    ingredients: "Creamy Peanut Butter, Organic Flour, Brown Sugar, Farm Fresh Eggs, Full-Spectrum Hemp Extract, Baking Soda, Sea Salt.",
    benefits: "Deep relaxation, nighttime unwinding, and a comforting mood boost.",
    price: "$15.00 – $20.00",
    variants: [
      { name: "100mg (4-Pack)", price: "$15.00" },
      { name: "200mg (4-Pack)", price: "$20.00" }
    ],
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    link: "https://pixies-pantry.com/product/peanut-butter-cookies-full-spectrum-infused/",
    category: "Cookies"
  },
  {
    id: "mct-oil",
    name: "Infused MCT Oil",
    description: "30ml of unflavored, hemp-derived MCT oil for versatile use.",
    long_description: "Pure, unflavored hemp-derived MCT oil. Designed for maximum bioavailability and ultimate versatility. Drop it under your tongue for fast relief, or mix it directly into your favorite food and beverages.",
    ingredients: "Organic MCT Oil (derived from coconuts), Premium Full-Spectrum Hemp Extract.",
    benefits: "Fast-acting relief, highly bioavailable, and supports overall endocannabinoid system balance.",
    price: "$20.00 – $40.00",
    variants: [
      { name: "1000mg", price: "$20.00" },
      { name: "3000mg", price: "$40.00" }
    ],
    image: "https://i.postimg.cc/mD8fXf9x/mct-oil.png",
    link: "https://pixies-pantry.com/product/hemp-derived-mct-oil-30ml-unflavored/",
    category: "Wellness"
  }
];

// Initialize settings table
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

const DEFAULT_SETTINGS: Record<string, string> = {
  site_title: "The Whole Baked Machine",
  site_description: "Gourmet Infused Bakery & Wellness Collection",
  contact_email: "support@pixies-pantry.com",
  social_handle: "@pixieispantryshop"
};

const settingsCount = db.prepare("SELECT count(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const insert = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    insert.run(key, value);
  }
}

// Seed local DB
const count = db.prepare("SELECT count(*) as count FROM products").get() as { count: number };

// Always overwrite the local DB if the count doesn't perfectly match our new array length
// so we don't end up with duplicate/ghost products during this migration.
if (count.count !== INITIAL_PRODUCTS.length) {
  console.log("Re-seeding products to match live site inventory...");
  db.prepare("DELETE FROM products").run();
  const insert = db.prepare("INSERT INTO products (id, name, description, long_description, ingredients, benefits, price, image, link, category, variants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  for (const p of INITIAL_PRODUCTS) {
    insert.run(p.id, p.name, p.description, p.long_description, p.ingredients, p.benefits, p.price, p.image, p.link, p.category, p.variants ? JSON.stringify(p.variants) : null);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET || "pantry-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  app.use("/uploads", express.static(uploadsDir));

  // Middleware to check admin session
  const isAdmin = (req: any, res: any, next: any) => {
    if (req.session.isAdmin) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  };

  // API Routes
  app.post("/api/admin/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Local Dev Fallback if Supabase isn't configured
      if (!supabaseUrl || !supabaseKey) {
        if (email === "admin@pixies-pantry.com" && password === "admin") {
          req.session.isAdmin = true;
          return res.json({ success: true });
        }
        return res.status(401).json({ error: "Invalid credentials (Local Dev)" });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ error: error.message });
      }

      if (data.user) {
        req.session.isAdmin = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  app.get("/api/orders", isAdmin, async (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  app.post("/api/orders", async (req, res) => {
    const { name, email, phone, address, order_details, total_amount, uninfused, subscribeNewsletter } = req.body;
    try {
      const insert = db.prepare(`
        INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, order_details, total_amount, uninfused)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      const result = insert.run(name, email, phone, address, order_details, total_amount, uninfused ? 1 : 0);
      const orderId = result.lastInsertRowid;
      
      // Also save as client
      const insertClient = db.prepare(`
        INSERT INTO clients (name, email, phone, address, source, uninfused)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
          name = excluded.name,
          phone = COALESCE(excluded.phone, clients.phone),
          address = COALESCE(excluded.address, clients.address),
          source = excluded.source,
          uninfused = excluded.uninfused
      `);
      insertClient.run(name, email, phone, address, "Order Form", uninfused ? 1 : 0);

      // Add to newsletter if requested
      if (subscribeNewsletter) {
        try {
          db.prepare("INSERT INTO newsletter (email) VALUES (?)").run(email);
        } catch (e) {
          // Ignore
        }
      }

      // Send Email Receipt (Simulation)
      try {
        const emailContent = {
          subject: `Order Confirmation - The Whole Baked Machine (#${orderId.toString().padStart(4, '0')})`,
          body: `Dear ${name},\n\nThank you for your order!\n\nOrder Details:\n${order_details}\nTotal: ${total_amount}\nDelivery Address: ${address}\n\nWe will contact you shortly to confirm your order and send an invoice.\n\nWarm regards,\nThe Whole Baked Machine Team`
        };
        
        console.log("--- SENDING EMAIL TO CUSTOMER ---");
        console.log(`To: ${email}`);
        console.log(`Subject: ${emailContent.subject}`);
        console.log(`Body:\n${emailContent.body}`);
        console.log("---------------------------------");

        // Send backup email to admin
        console.log("--- SENDING BACKUP EMAIL TO ADMIN ---");
        console.log(`To: admin@pixies-pantry.com`);
        console.log(`Subject: NEW ORDER RECEIVED - #${orderId.toString().padStart(4, '0')}`);
        console.log(`Body: A new order has been placed by ${name}.\n\nDetails:\n${order_details}\nTotal: ${total_amount}\nAddress: ${address}`);
        console.log("--------------------------------------");

      } catch (emailError) {
        console.error("Failed to process email notifications", emailError);
      }
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/orders/:id", isAdmin, (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM orders WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.patch("/api/orders/:id/status", isAdmin, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  app.get("/api/clients", isAdmin, async (req, res) => {
    if (!supabaseUrl || !supabaseKey) {
      const clients = db.prepare("SELECT * FROM clients ORDER BY created_at DESC").all();
      return res.json(clients);
    }
    const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/clients", async (req, res) => {
    const { name, email, phone, address, payment_method, source, uninfused } = req.body;
    if (!supabaseUrl || !supabaseKey) {
      try {
        const insert = db.prepare(`
          INSERT INTO clients (name, email, phone, address, payment_method, source, uninfused)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(email) DO UPDATE SET
            name = excluded.name,
            phone = COALESCE(excluded.phone, clients.phone),
            address = COALESCE(excluded.address, clients.address),
            payment_method = COALESCE(excluded.payment_method, clients.payment_method),
            source = excluded.source,
            uninfused = excluded.uninfused
        `);
        insert.run(name, email, phone, address, payment_method, source, uninfused ? 1 : 0);
        
        // If source is newsletter, also add to newsletter table
        if (source === "Newsletter Popup") {
          try {
            db.prepare("INSERT INTO newsletter (email) VALUES (?)").run(email);
          } catch (e) {
            // Ignore
          }
        }

        return res.json({ success: true });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }

    const { error } = await supabase.from("clients").upsert({ 
      name, email, phone, address, payment_method, source, uninfused 
    }, { onConflict: 'email' });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.get("/api/newsletter", isAdmin, (req, res) => {
    const subscribers = db.prepare("SELECT * FROM newsletter ORDER BY created_at DESC").all();
    res.json(subscribers);
  });

  app.delete("/api/clients/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    if (!supabaseUrl || !supabaseKey) {
      db.prepare("DELETE FROM clients WHERE id = ?").run(id);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("clients").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.get("/api/settings", isAdmin, (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = settings.reduce((acc: any, s: any) => {
      acc[s.key] = s.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.post("/api/settings", isAdmin, (req, res) => {
    const updates = req.body;
    const update = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    for (const [key, value] of Object.entries(updates)) {
      update.run(key, value);
    }
    res.json({ success: true });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const baseUrl = process.env.APP_URL || `http://${req.headers.host}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });

  app.get("/api/products", async (req, res) => {
    if (!supabaseUrl || !supabaseKey) {
      const products = db.prepare("SELECT * FROM products").all();
      const parsedProducts = products.map((p: any) => ({
        ...p,
        variants: p.variants ? JSON.parse(p.variants) : []
      }));
      return res.json(parsedProducts);
    }
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    if (!supabaseUrl || !supabaseKey) {
      const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id) as any;
      if (product) {
        product.variants = product.variants ? JSON.parse(product.variants) : [];
      }
      return res.json(product);
    }
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = process.env.APP_URL || `http://${req.headers.host}`;
    let products: any[] = [];
    
    if (!supabaseUrl || !supabaseKey) {
      products = db.prepare("SELECT id FROM products").all();
    } else {
      const { data } = await supabase.from("products").select("id");
      products = data || [];
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${products.map(p => `
  <url>
    <loc>${baseUrl}/product/${p.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  app.get("/robots.txt", (req, res) => {
    const baseUrl = process.env.APP_URL || `http://${req.headers.host}`;
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`);
  });

  app.put("/api/products/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    const { price, image, name, description, long_description, ingredients, benefits, link, category, variants } = req.body;
    
    if (!supabaseUrl || !supabaseKey) {
      const update = db.prepare(`
        UPDATE products 
        SET price = ?, image = ?, name = ?, description = ?, long_description = ?, ingredients = ?, benefits = ?, link = ?, category = ?, variants = ? 
        WHERE id = ?
      `);
      update.run(price, image, name, description, long_description, ingredients, benefits, link, category, variants ? JSON.stringify(variants) : null, id);
      return res.json({ success: true });
    }

    const { error } = await supabase
      .from("products")
      .update({ price, image, name, description, long_description, ingredients, benefits, link, category, variants })
      .eq("id", id);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.post("/api/products", isAdmin, async (req, res) => {
    const product = req.body;
    if (!supabaseUrl || !supabaseKey) {
      const insert = db.prepare(`
        INSERT INTO products (id, name, description, long_description, ingredients, benefits, price, image, link, category, variants) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insert.run(product.id, product.name, product.description, product.long_description, product.ingredients, product.benefits, product.price, product.image, product.link, product.category, product.variants ? JSON.stringify(product.variants) : null);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("products").insert([product]);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/products/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    if (!supabaseUrl || !supabaseKey) {
      db.prepare("DELETE FROM products WHERE id = ?").run(id);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();