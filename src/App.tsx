import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
  X,
} from 'lucide-react';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  old?: number;
  storage: string;
  color: string;
  image: string;
  tag?: string;
  rating: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    price: 2199000,
    old: 2350000,
    storage: '256GB',
    color: 'Deep Blue',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85',
    tag: 'Best Seller',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Galaxy S26 Ultra',
    brand: 'Samsung',
    price: 1899000,
    old: 2050000,
    storage: '256GB',
    color: 'Titanium Black',
    image:
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85',
    tag: 'New',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Pixel 10 Pro',
    brand: 'Google',
    price: 1399000,
    storage: '128GB',
    color: 'Porcelain',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Xiaomi 15 Ultra',
    brand: 'Xiaomi',
    price: 999000,
    old: 1080000,
    storage: '512GB',
    color: 'Silver Chrome',
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85',
    tag: 'Deal',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'OnePlus 13',
    brand: 'OnePlus',
    price: 849000,
    storage: '256GB',
    color: 'Midnight',
    image:
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Galaxy Z Flip 7',
    brand: 'Samsung',
    price: 1299000,
    old: 1399000,
    storage: '256GB',
    color: 'Lavender',
    image:
      'https://images.unsplash.com/photo-1694022724005-da17aff61b9a?auto=format&fit=crop&w=900&q=85',
    tag: 'Trending',
    rating: 4.8,
  },
];

const money = (n: number) => '₦' + n.toLocaleString('en-NG');

function ProductCard({ p, add }: { p: Product; add: (p: Product) => void }) {
  return (
    <article className="card product-card">
      <div className="product-img">
        <img src={p.image} alt={p.name} />
        {p.tag && <span className="pill">{p.tag}</span>}
        <button className="wish">
          <Heart size={18} />
        </button>
      </div>
      <div className="product-body">
        <div className="muted">{p.brand}</div>
        <h3>{p.name}</h3>
        <div className="stars">★ {p.rating}</div>
        <div className="spec">
          {p.storage} · {p.color}
        </div>
        <div className="price-row">
          <strong>{money(p.price)}</strong>
          {p.old && <del>{money(p.old)}</del>}
        </div>
        <button className="add" onClick={() => add(p)}>
          Add to cart <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('All phones');
  const [menu, setMenu] = useState(false);
  const add = (p: Product) => setCart(c => [...c, p]);
  const filtered = useMemo(
    () =>
      products.filter(p => {
        const matchesQuery = (p.name + p.brand).toLowerCase().includes(query.toLowerCase());
        const matchesBrand =
          brandFilter === 'All phones' ||
          p.brand === brandFilter ||
          (brandFilter === 'Android' && p.brand !== 'Apple');
        return matchesQuery && matchesBrand;
      }),
    [query, brandFilter]
  );
  const nav = (p: string) => {
    setPage(p);
    setMenu(false);
    window.scrollTo(0, 0);
  };

  const Header = () => (
    <>
      <div className="top">
        🚚 Free nationwide delivery on orders over ₦500,000 · 7-day easy returns
      </div>
      <header>
        <button className="mobile-menu" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
        <div className="logo" onClick={() => nav('home')}>
          <span>
            <Smartphone size={22} />
          </span>
          VOLTIX
        </div>
        <nav className={menu ? 'open' : ''}>
          <button onClick={() => nav('home')}>Home</button>
          <button onClick={() => nav('shop')}>Shop</button>
          <button onClick={() => nav('deals')}>Deals</button>
          <button onClick={() => nav('about')}>About</button>
          <button onClick={() => nav('contact')}>Contact</button>
        </nav>
        <div className="actions">
          <div className="search">
            <Search size={17} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search phones..."
            />
          </div>
          <button className="cart" onClick={() => nav('cart')}>
            <ShoppingBag size={20} />
            <b>{cart.length}</b>
          </button>
        </div>
      </header>
    </>
  );

  const Home = () => (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">THE NEXT GENERATION IS HERE</div>
          <h1>
            Powerful phones.
            <br />
            <em>Better prices.</em>
          </h1>
          <p>
            Premium smartphones, genuine accessories and reliable after-sales
            support — delivered anywhere in Nigeria.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => nav('shop')}>
              Shop smartphones <ArrowRight size={18} />
            </button>
            <button className="ghost" onClick={() => nav('deals')}>
              View today's deals
            </button>
          </div>
          <div className="trust">
            <span>
              <Check /> 100% genuine
            </span>
            <span>
              <Check /> Warranty included
            </span>
            <span>
              <Check /> Secure payment
            </span>
          </div>
        </div>
        <div className="hero-phone">
          <div className="glow"></div>
          <img
            src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=90"
            alt="Premium smartphone"
          />
        </div>
      </section>
      <section className="benefits">
        <div>
          <Truck />
          <span>
            <b>Fast delivery</b>Nationwide shipping
          </span>
        </div>
        <div>
          <Check />
          <span>
            <b>Genuine devices</b>Verified products only
          </span>
        </div>
        <div>
          <Star />
          <span>
            <b>Trusted support</b>After-sales care
          </span>
        </div>
        <div>
          <ShoppingBag />
          <span>
            <b>Secure checkout</b>Protected payments
          </span>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <div className="eyebrow">HANDPICKED FOR YOU</div>
            <h2>Trending now</h2>
          </div>
          <button className="link" onClick={() => nav('shop')}>
            View all <ChevronRight />
          </button>
        </div>
        <div className="grid">
          {products.slice(0, 4).map(p => (
            <ProductCard key={p.id} p={p} add={add} />
          ))}
        </div>
      </section>
      <section className="banner">
        <div>
          <div className="eyebrow">TRADE UP & SAVE</div>
          <h2>Upgrade without the stress.</h2>
          <p>
            Bring your old phone and get a trade-in estimate toward your next
            device.
          </p>
          <button className="primary" onClick={() => nav('contact')}>
            Get trade-in estimate
          </button>
        </div>
        <Smartphone size={170} strokeWidth={1} />
      </section>
    </>
  );

  const Shop = () => (
    <section className="section page">
      <div className="eyebrow">THE COLLECTION</div>
      <h1>Shop smartphones</h1>
      <p className="lead">
        Flagship performance, great cameras and battery life — choose your next
        phone.
      </p>
      <div className="filters">
        {['All phones', 'Apple', 'Samsung', 'Google', 'Android'].map(filter => (
          <button
            key={filter}
            className={brandFilter === filter ? 'active' : ''}
            onClick={() => setBrandFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} p={p} add={add} />
        ))}
      </div>
    </section>
  );

  const Deals = () => (
    <section className="section page">
      <div className="eyebrow">LIMITED-TIME OFFERS</div>
      <h1>Deals worth grabbing.</h1>
      <p className="lead">Save on selected devices while stock lasts.</p>
      <div className="deal-hero">
        <div>
          <span className="pill dark">UP TO 15% OFF</span>
          <h2>Flagship season.</h2>
          <p>Special pricing on selected Apple, Samsung and Xiaomi devices.</p>
          <button className="primary" onClick={() => nav('shop')}>
            Shop deals
          </button>
        </div>
        <img src={products[1].image} alt="Samsung phone" />
      </div>
      <div className="grid">
        {products
          .filter(p => p.old)
          .map(p => (
            <ProductCard key={p.id} p={p} add={add} />
          ))}
      </div>
    </section>
  );

  const About = () => (
    <section className="section page">
      <div className="about-grid">
        <div>
          <div className="eyebrow">WHY VOLTIX</div>
          <h1>Phones without the guesswork.</h1>
          <p className="lead">
            Voltix is a demo concept for a modern Nigerian phone retailer built
            around trust, transparent pricing and genuinely helpful support.
          </p>
          <p>
            Every device is checked, clearly priced and backed by a
            straightforward warranty. Whether you know exactly what you want or
            need help choosing, our team makes the buying experience simple.
          </p>
          <div className="checks">
            <span>
              <Check /> Genuine devices
            </span>
            <span>
              <Check /> Transparent pricing
            </span>
            <span>
              <Check /> Nationwide delivery
            </span>
            <span>
              <Check /> Human support
            </span>
          </div>
        </div>
        <img
          className="about-img"
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=85"
          alt="Phones"
        />
      </div>
    </section>
  );

  const Contact = () => (
    <section className="section page">
      <div className="contact">
        <div>
          <div className="eyebrow">LET'S TALK</div>
          <h1>Need help choosing?</h1>
          <p className="lead">
            Tell us what you're looking for and we'll point you toward the right
            device.
          </p>
          <div className="contact-info">
            <p>
              <b>WhatsApp</b>
              <br />
              +234 800 000 0000
            </p>
            <p>
              <b>Email</b>
              <br />
              hello@voltixmobile.com
            </p>
            <p>
              <b>Showroom</b>
              <br />
              14 Tech Avenue, Lagos
            </p>
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <input placeholder="Your name" />
          <input placeholder="Email or WhatsApp" />
          <select>
            <option>What are you looking for?</option>
            <option>iPhone</option>
            <option>Samsung</option>
            <option>Android phone</option>
            <option>Trade-in</option>
          </select>
          <textarea placeholder="Tell us your budget or requirements"></textarea>
          <button className="primary">
            Send enquiry <ArrowRight size={17} />
          </button>
        </form>
      </div>
    </section>
  );

  const Cart = () => (
    <section className="section page">
      <div className="eyebrow">YOUR BAG</div>
      <h1>Shopping cart</h1>
      {!cart.length ? (
        <div className="empty">
          <ShoppingBag size={42} />
          <h2>Your cart is empty</h2>
          <p>Add a phone to see it here.</p>
          <button className="primary" onClick={() => nav('shop')}>
            Browse phones
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map((p, i) => (
              <div className="cart-item" key={i}>
                <img src={p.image} alt="" />
                <div>
                  <b>{p.name}</b>
                  <p>
                    {p.storage} · {p.color}
                  </p>
                  <strong>{money(p.price)}</strong>
                </div>
                <button
                  onClick={() => setCart(c => c.filter((_, j) => j !== i))}
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h3>Order summary</h3>
            <div>
              <span>Subtotal</span>
              <b>{money(cart.reduce((s, p) => s + p.price, 0))}</b>
            </div>
            <div>
              <span>Delivery</span>
              <b>Calculated at checkout</b>
            </div>
            <hr />
            <div>
              <strong>Total</strong>
              <strong>{money(cart.reduce((s, p) => s + p.price, 0))}</strong>
            </div>
            <button className="primary full">Checkout</button>
            <small>Demo checkout — no real payment is processed.</small>
          </aside>
        </div>
      )}
    </section>
  );

  return (
    <>
      <Header />
      {page === 'home' && <Home />}
      {page === 'shop' && <Shop />}
      {page === 'deals' && <Deals />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      {page === 'cart' && <Cart />}
      <footer>
        <div className="logo">
          <span>
            <Smartphone size={20} />
          </span>
          VOLTIX
        </div>
        <p>Premium phones. Honest prices. Better service.</p>
        <div>
          <button onClick={() => nav('shop')}>Shop</button>
          <button onClick={() => nav('contact')}>Contact</button>
          <button onClick={() => nav('about')}>About</button>
        </div>
        <small>© 2026 Voltix Mobile. Demo website.</small>
      </footer>
    </>
  );
}
