"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";

export default function HomePage() {
  // ✅ Strongly typed state
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!newProduct.trim()) return;

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProduct }),
    });

    const data: { insertedId: string } = await res.json();
    console.log("Inserted ID:", data.insertedId);

    // Refresh list
    const updated: Product[] = await fetch("/api/products").then((r) =>
      r.json()
    );
    setProducts(updated);
    setNewProduct("");
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          placeholder="New product name"
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p._id ?? p.name}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}
