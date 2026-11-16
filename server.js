const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, "data", "orders.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function ensureDataDir() {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
  }
}

function readOrders() {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8"));
}

function writeOrders(orders) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

app.post("/api/orders", (req, res) => {
  const { name, contact, address, items, paymentMethod, deliveryNotes, total } =
    req.body;

  if (!name || !contact || !items?.length || !paymentMethod) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const order = {
    id: `DP-${Date.now().toString(36).toUpperCase()}`,
    name,
    contact,
    address: address || "Pickup — 14-G Central Park",
    items,
    paymentMethod,
    deliveryNotes: deliveryNotes || "",
    total: total || 0,
    status: "received",
    createdAt: new Date().toISOString(),
  };

  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);

  res.status(201).json({ success: true, order });
});

app.get("/api/orders", (_req, res) => {
  res.json(readOrders());
});

app.patch("/api/orders/:id", (req, res) => {
  const orders = readOrders();
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Order not found" });
  if (req.body.status) orders[idx].status = req.body.status;
  writeOrders(orders);
  res.json(orders[idx]);
});

app.listen(PORT, () => {
  ensureDataDir();
  console.log(`DEEPIZZA demo running at http://localhost:${PORT}`);
});