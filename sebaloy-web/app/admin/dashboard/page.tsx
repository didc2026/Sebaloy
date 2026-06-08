"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");
  const [orders, setOrders] = useState<any[]>([]);S

  const logout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
const fetchOrders = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "orders")
    );

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setOrders(data);
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImageFile(null);
    setEditingId("");
  };

  const saveProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageRef = ref(
          storage,
          `products/${Date.now()}-${imageFile.name}`
        );

        await uploadBytes(
          imageRef,
          imageFile
        );

        imageUrl =
          await getDownloadURL(imageRef);
      }

      if (editingId) {
        const updateData: any = {
          name,
          category,
          price: Number(price),
          stock: Number(stock),
        };

        if (imageUrl) {
          updateData.imageUrl = imageUrl;
        }

        await updateDoc(
          doc(db, "products", editingId),
          updateData
        );

        alert("Product Updated");
      } else {
        await addDoc(
          collection(db, "products"),
          {
            name,
            category,
            price: Number(price),
            stock: Number(stock),
            imageUrl,
            createdAt: Date.now(),
          }
        );

        alert("Product Added");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const editProduct = (product: any) => {
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {
      await deleteDoc(
        doc(db, "products", id)
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Sebaloy Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={saveProduct}
        className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold">
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files?.[0] || null
            )
          }
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded"
        >
          {editingId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
<h2 className="text-2xl font-bold mb-4 mt-8">
  Orders
</h2>

<div className="space-y-4 mb-8">
  {orders.map((order: any) => (
    <div
      key={order.id}
      className="bg-white border rounded-lg p-4"
    >
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Total:</strong> ৳{order.total}</p>
    </div>
  ))}
</div>
      <h2 className="text-2xl font-bold mb-4">
        Product List
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow p-4"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover rounded mb-4"
              />
            )}

            <h3 className="text-xl font-bold">
              {product.name}
            </h3>

            <p>
              Category: {product.category}
            </p>

            <p>
              Price: ৳ {product.price}
            </p>

            <p>
              Stock: {product.stock}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  editProduct(product)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}