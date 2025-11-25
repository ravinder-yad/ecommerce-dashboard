import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { FiSun, FiMoon } from 'react-icons/fi';

// Single-file React + Tailwind scaffold for:
// A) Products List Page (table, search, filters, sorting, pagination)
// B) Add New Product Page (form, multi-image upload preview)
// C) Edit Product Page (same form, prefilled)
// D) Orders List + Order Details
// Also includes a ThemeProvider, ThemeToggle and AdminLayout so pages are theme-aware.

// NOTE: This is a frontend-only scaffold using local state/mock data.
// Integrate with your API by replacing the mock functions (fetchProducts, createProduct, updateProduct, deleteProduct).

// ---------- Theme Context + Toggle + Admin Layout (top so components can use it) ----------
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((s) => !s);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  return useContext(ThemeContext);
}

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const buttonBg = isDark ? 'bg-slate-900' : 'bg-gray-100';
  const buttonBorder = isDark ? 'border-slate-700' : 'border-gray-300';
  const buttonHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-200';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400`}
    >
      {isDark ? (
        <FiSun className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
      ) : (
        <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
      )}
    </button>
  );
};

export function AdminLayout({ children }) {
  const { isDark } = useTheme();
  const bg = isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-slate-900';
  const panel = isDark ? 'bg-slate-800' : 'bg-white';

  return (
    <div className={`${bg} min-h-screen`}>
      <header className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'} ${panel}`}>
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>

      <main className="p-6">
        <div className={`${panel} rounded shadow p-4`}>{children}</div>
      </main>
    </div>
  );
}

// ---------- Mock backend (replace with real API calls) ----------
const MOCK_CATEGORIES = [
  { id: "cat1", name: "Clothing" },
  { id: "cat2", name: "Electronics" },
  { id: "cat3", name: "Home" },
];

let _mockProducts = Array.from({ length: 34 }).map((_, i) => ({
  id: `p${i + 1}`,
  name: `Sample Product ${i + 1}`,
  category: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length].name,
  price: (10 + i * 2).toFixed(2),
  salePrice: i % 3 === 0 ? (8 + i).toFixed(2) : null,
  stock: i % 5 === 0 ? 0 : 10 + (i % 7),
  sku: `SKU-${1000 + i}`,
  status: i % 4 === 0 ? "Draft" : "Active",
  tags: i % 2 === 0 ? ["new"] : ["bestseller"],
  images: [],
  description: `This is a description for product ${i + 1}`,
}));

const MOCK_ORDERS = Array.from({ length: 25 }).map((_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  paymentMode: ["COD", "UPI", "Card"][i % 3],
  status: ["Pending", "Shipped", "Delivered", "Cancelled"][i % 4],
  amount: (500 + i * 25).toFixed(2),
  items: [
    { name: `Sample Product ${i + 1}`, qty: 1 + (i % 3), price: (199 + i * 5) },
  ],
  shipping: {
    name: `Customer ${i + 1}`,
    address: `XYZ Street, City ${i + 1}`,
    city: "Jaipur",
    state: "Rajasthan",
    pin: "3020" + ((i % 10) + 1),
    phone: "+91 9876543210",
  },
  billing: {
    name: `Customer ${i + 1}`,
    address: `Billing Address ${i + 1}`,
    city: "Jaipur",
    state: "Rajasthan",
    pin: "3020" + ((i % 10) + 1),
  }
}));

const fetchProducts = async ({ page, perPage, q, category, sortBy, sortDir }) => {
  let items = [..._mockProducts];
  if (q) {
    const ql = q.toLowerCase();
    items = items.filter((p) => p.name.toLowerCase().includes(ql) || (p.sku || "").toLowerCase().includes(ql));
  }
  if (category) items = items.filter((p) => p.category === category);
  if (sortBy) {
    items.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      if (typeof av === "number" || typeof bv === "number") return (av - bv) * (sortDir === "asc" ? 1 : -1);
      return String(av).localeCompare(String(bv)) * (sortDir === "asc" ? 1 : -1);
    });
  }
  const total = items.length;
  const start = (page - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);
  await new Promise((r) => setTimeout(r, 120));
  return { items: pageItems, total };
};

const createProduct = async (data) => {
  const newP = { id: `p${_mockProducts.length + 1}`, ...data };
  _mockProducts = [newP, ..._mockProducts];
  return newP;
};
const updateProduct = async (id, data) => {
  _mockProducts = _mockProducts.map((p) => (p.id === id ? { ...p, ...data } : p));
  return _mockProducts.find((p) => p.id === id);
};
const deleteProduct = async (id) => {
  _mockProducts = _mockProducts.filter((p) => p.id !== id);
  return true;
};

// ---------- Utilities ----------
const formatCurrency = (v) => `₹${Number(v).toFixed(2)}`;

// ---------- Components ----------
function Badge({ children, color = "gray" }) {
  const colors = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${colors[color] || colors.gray}`}>{children}</span>;
}
function IconButton({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`px-2 py-1 rounded hover:bg-gray-100 ${className}`}>
      {children}
    </button>
  );
}

// ---------- A) Products List Page ----------
export function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 8;
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetchProducts({ page, perPage, q, category, sortBy, sortDir });
    setProducts(res.items);
    setTotal(res.total);
    setLoading(false);
  };

  useEffect(() => { load(); }, [page, q, category, sortBy, sortDir]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await deleteProduct(id);
    if (products.length === 1 && page > 1) setPage(page - 1);
    else load();
  };

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex gap-2">
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search by name or SKU" className="border rounded px-3 py-2" />
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="border rounded px-3 py-2">
            <option value="">All categories</option>
            {MOCK_CATEGORIES.map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Sort</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
          <button onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))} className="border rounded px-3 py-2">{sortDir === "asc" ? "Asc" : "Desc"}</button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {p.images && p.images[0] ? (<img src={p.images[0]} alt={p.name} className="object-cover w-full h-full" />) : (<span className="text-xs text-gray-500">No image</span>)}
                    </div>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.sku}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">{p.category}</td>
                  <td className="px-4 py-4 text-right">{formatCurrency(p.salePrice || p.price)}</td>
                  <td className="px-4 py-4 text-center">{p.stock > 0 ? <Badge color="green">In stock ({p.stock})</Badge> : <Badge color="red">Out of stock</Badge>}</td>
                  <td className="px-4 py-4 text-center">{p.status === "Active" ? <Badge color="green">Active</Badge> : <Badge color="yellow">Draft</Badge>}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <IconButton onClick={() => alert(`View ${p.name}`)} className="text-blue-600">View</IconButton>
                      <IconButton onClick={() => alert(`Edit ${p.name}`)} className="text-indigo-600">Edit</IconButton>
                      <IconButton onClick={() => handleDelete(p.id)} className="text-red-600">Delete</IconButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 border rounded">First</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
            <span className="px-3 py-1 border rounded">{page} / {totalPages}</span>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded">Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 border rounded">Last</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- B & C) Add/Edit Product Form ----------
function ProductForm({ initial = null, onCancel, onSave }) {
  const isEdit = !!initial;
  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [salePrice, setSalePrice] = useState(initial?.salePrice || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [subcategory, setSubcategory] = useState(initial?.subcategory || "");
  const [images, setImages] = useState(initial?.images || []);
  const [stock, setStock] = useState(initial?.stock ?? 0);
  const [sku, setSku] = useState(initial?.sku || "");
  const [status, setStatus] = useState(initial?.status || "Active");
  const [tagsStr, setTagsStr] = useState((initial?.tags || []).join(", "));
  const [saving, setSaving] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList);
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      name,
      description,
      price,
      salePrice: salePrice || null,
      category,
      subcategory,
      images: images.map((it) => it.url || it),
      stock: Number(stock),
      sku,
      status,
      tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (isEdit) await updateProduct(initial.id, data);
      else await createProduct(data);
      onSave && onSave();
    } catch (err) {
      alert("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="p-6 bg-white rounded shadow" onSubmit={submit}>
      <h3 className="text-xl font-semibold mb-4">{isEdit ? "Edit Product" : "Add New Product"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <input value={sku} onChange={(e) => setSku(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full border rounded px-3 py-2"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sale price</label>
          <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="">Select category</option>
            {MOCK_CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sub-category</label>
          <input value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock quantity</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
            <option>Active</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Product images</label>
          <div className="flex gap-3 items-center">
            <input type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative border rounded overflow-hidden">
                <img src={img.url} alt={img.name || `img-${idx}`} className="w-full h-28 object-cover" />
                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1">✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
          <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">{saving ? "Saving..." : isEdit ? "Update product" : "Add product"}</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
      </div>
    </form>
  );
}

export function AddProductPage({ onDone }) {
  return (
    <div className="p-6">
      <ProductForm onCancel={onDone} onSave={onDone} />
    </div>
  );
}

export function EditProductPage({ productId, onDone }) {
  const [initial, setInitial] = useState(null);
  useEffect(() => {
    const p = _mockProducts.find((x) => x.id === productId);
    setInitial(p || null);
  }, [productId]);

  if (!initial) return <div className="p-6">Loading product...</div>;
  return (
    <div className="p-6">
      <ProductForm initial={initial} onCancel={onDone} onSave={onDone} />
    </div>
  );
}

// ---------- Orders List Page (now accepts onView to open details) ----------
export function OrdersListPage({ onView }) {
  const [orders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const filtered = orders.filter((o) => {
    return (
      (search === "" || o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase())) &&
      (status === "" || o.status === status) &&
      (paymentMode === "" || o.paymentMode === paymentMode)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Order ID / Customer"
          className="border rounded px-3 py-2"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} className="border rounded px-3 py-2">
          <option value="">All Payments</option>
          <option>COD</option>
          <option>UPI</option>
          <option>Card</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3">{o.date}</td>
                <td className="px-4 py-3">{o.paymentMode}</td>
                <td className="px-4 py-3">{o.status}</td>
                <td className="px-4 py-3 text-right">₹{o.amount}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => onView && onView(o)} className="px-3 py-1 text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------- Order Details Page ----------
export function OrderDetailsPage({ order, onBack }) {
  if (!order) return <div className="p-6">Order not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Order Details</h2>
        <button onClick={onBack} className="px-3 py-2 border rounded">Back to orders</button>
      </div>

      {/* Summary */}
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Order ID</span>
          <span>{order.id}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Order Date</span>
          <span>{order.date}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Payment Status</span>
          <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{order.paymentStatus || 'Paid'}</span>
        </div>
      </div>

      {/* Customer */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Customer Details</h3>
        <p>{order.customer}</p>
        <p>Email: customer@example.com</p>
        <p>Phone: {order.shipping?.phone}</p>
      </div>

      {/* Shipping & Billing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>{order.shipping?.name}</p>
          <p>{order.shipping?.address}</p>
          <p>{order.shipping?.city}, {order.shipping?.state} - {order.shipping?.pin}</p>
          <p>Phone: {order.shipping?.phone}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-2">Billing Address</h3>
          <p>{order.billing?.name}</p>
          <p>{order.billing?.address}</p>
          <p>{order.billing?.city}, {order.billing?.state} - {order.billing?.pin}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Items</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Item</th>
              <th className="px-3 py-2 text-left">Qty</th>
              <th className="px-3 py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, idx) => (
              <tr className="border-t" key={idx}>
                <td className="px-3 py-2">{it.name}</td>
                <td className="px-3 py-2">{it.qty}</td>
                <td className="px-3 py-2 text-right">₹{it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Status */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-2">Delivery Status</h3>
        <select defaultValue={order.status} className="border rounded px-3 py-2">
          <option>Pending</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Total */}
      <div className="bg-white shadow rounded p-4 flex justify-between items-center">
        <span className="text-xl font-medium">Total Amount</span>
        <span className="text-xl">₹{order.amount}</span>
      </div>

      <button className="px-4 py-2 bg-indigo-600 text-white rounded">Download Invoice</button>
    </div>
  );
}

// ---------- Demo wrapper with simple navigation between pages ----------
export default function ProductAdminDemo() {
  const [view, setView] = useState("products"); // products | add | edit | orders | orderDetails
  const [editId, setEditId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshAndList = () => { setView("products"); };

  return (
    <ThemeProvider>
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin — Manage</h1>
          <div className="flex gap-2">
            <button onClick={() => { setView("products"); }} className="px-3 py-2 border rounded">Products</button>
            <button onClick={() => { setView("orders"); }} className="px-3 py-2 border rounded">Orders</button>
            <button onClick={() => { setView("add"); setEditId(null); }} className="px-3 py-2 bg-green-600 text-white rounded">+ Add product</button>
          </div>
        </div>

        <div>
          {view === "products" && (
            <div className="bg-white rounded shadow"><ProductsListPage /></div>
          )}

          {view === "add" && (
            <div className="bg-white rounded shadow"><AddProductPage onDone={refreshAndList} /></div>
          )}

          {view === "edit" && editId && (
            <div className="bg-white rounded shadow"><EditProductPage productId={editId} onDone={refreshAndList} /></div>
          )}

          {view === "orders" && (
            <div className="bg-white rounded shadow">
              <OrdersListPage onView={(o) => { setSelectedOrder(o); setView('orderDetails'); }} />
            </div>
          )}

          {view === "orderDetails" && selectedOrder && (
            <div className="bg-white rounded shadow">
              <OrderDetailsPage order={selectedOrder} onBack={() => { setSelectedOrder(null); setView('orders'); }} />
            </div>
          )}
        </div>
      </AdminLayout>
    </ThemeProvider>
  );
}

// ---------- Usage instructions (in comments) ----------
// This single-file component is ready to use. Paste into a Next.js page (e.g. pages/admin.js) and ensure Tailwind & react-icons are installed.
// Replace mock data and mock functions with your API calls as needed.

