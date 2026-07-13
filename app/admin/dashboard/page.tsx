"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase";
console.log("Dashboard Loaded");

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [company, setCompany] = useState("");
  const [genericName, setGenericName] = useState("");
  const [strength, setStrength] = useState("");
const [stripsPerBox, setStripsPerBox] = useState("");
const [tabletsPerStrip, setTabletsPerStrip] = useState("");
const [unitType, setUnitType] = useState("Tablet");
  const [discount, setDiscount] = useState("0");
  const [imageUrl, setImageUrl] = useState("");
const [size, setSize] = useState("");
const [brand, setBrand] = useState("");
const [model, setModel] = useState("");
const [warranty, setWarranty] = useState("");
const [pharmacology, setPharmacology] = useState("");
const [indication, setIndication] = useState("");
const [dosage, setDosage] = useState("");
const [administration, setAdministration] = useState("");
const [sideEffects, setSideEffects] = useState("");
const [precautions, setPrecautions] = useState("");
const [pregnancyLactation, setPregnancyLactation] = useState("");
const [drugInteraction, setDrugInteraction] = useState("");
const [storageInfo, setStorageInfo] = useState("");
const [description, setDescription] = useState("");
const [features, setFeatures] = useState("");
const [specifications, setSpecifications] = useState("");
  const [imageFile, setImageFile] =
    useState<File | null>(null);
    const [csvFile, setCsvFile] =
  useState<File | null>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const handleCsvImport = async () => {
  if (!csvFile) {
    alert("Please select a CSV file");
    return;
  }

  const text = await csvFile.text();
  const rows = text.split("\n").slice(1);

  for (const row of rows) {
    if (!row.trim()) continue;

const [
  name,
  genericName,
  strength,
  company,
  category,
  stripsPerBox,
  tabletsPerStrip,
  unitType,
  discount,
  imageUrl,
  price,
  stock,
] = row.split(",");
await addDoc(collection(db, "products"), {
  name: name?.trim(),
  genericName: genericName?.trim(),
  strength: strength?.trim(),
  company: company?.trim(),
  category: category?.trim(),
  description: description?.trim(),
features: features?.trim(),
specifications: specifications?.trim(),

pharmacology: pharmacology?.trim(),
indication: indication?.trim(),
dosage: dosage?.trim(),
administration: administration?.trim(),
sideEffects: sideEffects?.trim(),
precautions: precautions?.trim(),
pregnancyLactation: pregnancyLactation?.trim(),
drugInteraction: drugInteraction?.trim(),
storageInfo: storageInfo?.trim(),

  stripsPerBox: stripsPerBox?.trim(),
  tabletsPerStrip: tabletsPerStrip?.trim(),
  unitType: unitType?.trim(),

  discount: Number(discount || 0),
  imageUrl: imageUrl?.trim(),

  price: Number(price),
  stock: Number(stock),

  createdAt: new Date(),
});}

alert("CSV Import Completed");
};const toggleProductSelection = (id: string) => {
  setSelectedProducts((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};
const deleteSelectedProducts = async () => {
  if (selectedProducts.length === 0) return;

  const confirmed = confirm(
    `Delete ${selectedProducts.length} products?`
  );

  if (!confirmed) return;

  for (const id of selectedProducts) {
    await deleteDoc(doc(db, "products", id));
  }

  setProducts((prev) =>
    prev.filter(
      (product) => !selectedProducts.includes(product.id)
    )
  );

  setSelectedProducts([]);
};
  const [editingId, setEditingId] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [searchOrder, setSearchOrder] = useState("");
const pendingOrders = orders.filter(
  (o) => o.status === "pending"
).length;

const processingOrders = orders.filter(
  (o) => o.status === "processing"
).length;
const shippedOrders = orders.filter(
  (o) => o.status === "shipped"
).length;

const deliveredOrders = orders.filter(
  (o) => o.status === "delivered"
).length;

const totalSales = orders
  .filter((o) => o.status === "delivered")
  .reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
const totalProducts = products.length;
const lowStockProducts = products.filter(
  (product: any) =>
    Number(product.stock) > 0 &&
    Number(product.stock) <= 10
);const outOfStockProducts = products.filter(
  (product: any) => Number(product.stock) === 0
);
const [selectedStatus, setSelectedStatus] = useState("all");
const productSectionRef = useRef<HTMLDivElement>(null);
const filteredOrders =
  selectedStatus === "all"
    ? orders
    : orders.filter(
        (order: any) => order.status === selectedStatus
      );
      const filteredProducts =
  selectedStatus === "lowstock"
    ? lowStockProducts
    : selectedStatus === "outofstock"
    ? outOfStockProducts
    : products;
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
data.sort(
  (a: any, b: any) =>
    b.createdAt?.seconds - a.createdAt?.seconds
);
    setOrders(data);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      fetchProducts();
      fetchOrders();
    }
  );

  return () => unsubscribe();
}, []);
  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setImageUrl("");
    setImageFile(null);
    setEditingId("");
  };

  const saveProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

try {
  let currentImageUrl = imageUrl || "";
if (imageFile) {
  console.log("Selected file:", imageFile.name);

  const imageRef = ref(
    storage,
    `products/${Date.now()}-${imageFile.name}`
  );

  console.log("Uploading...");

  await uploadBytes(
    imageRef,
    imageFile
  );

  console.log("Upload Success");

currentImageUrl =
    await getDownloadURL(imageRef);

console.log("Image URL:", currentImageUrl);}
      if (editingId) {
const updateData: any = {
  name,
  genericName,
  strength,
  category,
  price: Number(price),
  stock: Number(stock),
  company,

  stripsPerBox,
  tabletsPerStrip,
unitType,
  discount: Number(discount) || 0,
  description,
features,
specifications,

pharmacology,
indication,
dosage,
administration,
sideEffects,
precautions,
pregnancyLactation,
drugInteraction,
storageInfo,
};
if (currentImageUrl) {
  updateData.imageUrl = currentImageUrl;
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
    strength,
    size,
    brand,
    model,
    warranty,

    category,
    company,
    genericName,
    stripsPerBox,
    tabletsPerStrip,
    unitType,

    price: Number(price),
    stock: Number(stock),
    discount: Number(discount) || 0,

    imageUrl: currentImageUrl,
    createdAt: Timestamp.fromDate(new Date()),
  }
);        alert("Product Added");
}

resetForm();
fetchProducts();

} catch (error: any) {
  console.error(error);

  alert(error.message);
}
};

const editProduct = (product: any) => {  
    setEditingId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setDiscount(String(product.discount || 0));
    setImageUrl(product.imageUrl || "");
      setCompany(product.company || "");
setStripsPerBox(String(product.stripsPerBox || ""));
setTabletsPerStrip(String(product.tabletsPerStrip || ""));
 setUnitType(product.unitType || "");
setStrength(product.strength || "");
setGenericName(product.genericName || "");
setDescription(product.description || "");
setFeatures(product.features || "");
setSpecifications(product.specifications || "");

setPharmacology(product.pharmacology || "");
setIndication(product.indication || "");
setDosage(product.dosage || "");
setAdministration(product.administration || "");
setSideEffects(product.sideEffects || "");
setPrecautions(product.precautions || "");
setPregnancyLactation(product.pregnancyLactation || "");
setDrugInteraction(product.drugInteraction || "");
setStorageInfo(product.storageInfo || "");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const deleteOrder = async (id: string) => {
  const ok = window.confirm(
    "Are you sure you want to delete this order?"
  );

  if (!ok) return;

  try {
    await deleteDoc(doc(db, "orders", id));

    setOrders((prev) =>
      prev.filter((order) => order.id !== id)
    );

    alert("Order deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete order");
  }
};
const updateOrderStatus = async (
  id: string,
  status: string
) => {
  try {
    await updateDoc(
      doc(db, "orders", id),
      {
        status,
      }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );
  } catch (error) {
    console.error(error);
    alert("Status update failed");
  }
};

const deleteProduct = async (
    id: string
) => {    const ok = confirm(
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
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 mb-8">
  <div
    onClick={() => setSelectedStatus("pending")}
className="bg-yellow-500 text-white p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[120px] flex flex-col justify-center"  >
    <h3 className="font-bold">Pending</h3>
    <p className="text-3xl font-bold">{pendingOrders}</p>
  </div>

  <div
    onClick={() => setSelectedStatus("processing")}
    className="bg-blue-500 text-white p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[120px] flex flex-col justify-center"
  >
    <h3 className="font-bold">Processing</h3>
    <p className="text-3xl font-bold">{processingOrders}</p>
  </div>

  <div
    onClick={() => setSelectedStatus("delivered")}
    className="bg-green-500 text-white p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[120px] flex flex-col justify-center"
  >
    <h3 className="font-bold">Delivered</h3>
    <p className="text-3xl font-bold">{deliveredOrders}</p>
  </div>
  <div
  onClick={() => setSelectedStatus("shipped")}
  className="bg-purple-500 text-white p-6 rounded-2xl cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all"
>
  <h3 className="font-bold">Shipped</h3>
  <p className="text-3xl font-bold">{shippedOrders}</p>
</div>

  <div className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[120px] flex flex-col justify-center">
    <h3 className="font-bold">Sales</h3>
    <p className="text-3xl font-bold">৳{totalSales}</p>
  </div>

  <div className="bg-indigo-500 text-white p-4 rounded-xl">
    <h3 className="font-bold">Total Orders</h3>
    <p className="text-3xl font-bold">{totalOrders}</p>
  </div>

  <div className="bg-orange-500 text-white p-4 rounded-xl">
    <h3 className="font-bold">Total Products</h3>
    <p className="text-3xl font-bold">{totalProducts}</p>
  </div>

  <div
onClick={() => {
  setSelectedStatus("lowstock");
  productSectionRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}}    className="bg-amber-600 text-white p-4 rounded-xl cursor-pointer"
  >
    <h3 className="font-bold">Low Stock Products</h3>
    <p className="text-3xl font-bold">{lowStockProducts.length}</p>
  </div>

  <div
onClick={() => {
  setSelectedStatus("outofstock");
  productSectionRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}}    className="bg-red-600 text-white p-4 rounded-xl cursor-pointer"
  >
    <h3 className="font-bold">Out of Stock</h3>
    <p className="text-3xl font-bold">{outOfStockProducts.length}</p>
  </div>

</div>   <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
{/* CSV Import */}

<input
  type="file"
  accept=".csv"
  onChange={(e) =>
    setCsvFile(e.target.files?.[0] || null)
  }
  className="mb-4 border p-2 rounded"
/>

<button
  type="button"
  onClick={handleCsvImport}
  className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
>
  Import CSV
</button>

<form
  onSubmit={saveProduct}
  className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
></form>
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
        <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">
  📝 Product Information
</h3>
<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Description
  </label>

  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={5}
    className="w-full border rounded p-3"
    placeholder="Enter product description"
  />
</div>
<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Features
  </label>

  <textarea
    value={features}
    onChange={(e) => setFeatures(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter product features"
  />
</div>
<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Specifications
  </label>
  <textarea
  value={specifications}
  onChange={(e) => setSpecifications(e.target.value)}
  rows={4}
  className="w-full border rounded p-3"
  placeholder="Enter product specifications"
/>
</div>
        {category === "Medicine" && (
  <>
<input
  type="text"
  placeholder="Generic Name"
  value={genericName}
  onChange={(e) => setGenericName(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
      <input
  type="text"
  placeholder="Strength (e.g. 500 mg, 20 mg, 5 ml)"
  value={strength}
  onChange={(e) => setStrength(e.target.value)}
  className="w-full border p-3 rounded"
  required
/>
<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Pharmacology
  </label>
  <textarea
    value={pharmacology}
    onChange={(e) => setPharmacology(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter pharmacology"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Indication
  </label>
  <textarea
    value={indication}
    onChange={(e) => setIndication(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter indications"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Dosage
  </label>
  <textarea
    value={dosage}
    onChange={(e) => setDosage(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter dosage"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Administration
  </label>
  <textarea
    value={administration}
    onChange={(e) => setAdministration(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter administration instructions"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Side Effects
  </label>
  <textarea
    value={sideEffects}
    onChange={(e) => setSideEffects(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter side effects"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Precautions
  </label>
  <textarea
    value={precautions}
    onChange={(e) => setPrecautions(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter precautions"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Pregnancy & Lactation
  </label>
  <textarea
    value={pregnancyLactation}
    onChange={(e) => setPregnancyLactation(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter pregnancy & lactation information"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Drug Interaction
  </label>
  <textarea
    value={drugInteraction}
    onChange={(e) => setDrugInteraction(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter drug interactions"
  />
</div>

<div className="col-span-2">
  <label className="block text-sm font-medium mb-2">
    Storage
  </label>
  <textarea
    value={storageInfo}
    onChange={(e) => setStorageInfo(e.target.value)}
    rows={4}
    className="w-full border rounded p-3"
    placeholder="Enter storage instructions"
  />
</div>
<input
  type="text"
  placeholder="Company"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
  className="w-full border p-3 rounded"
/>
<input
  type="number"
  placeholder="Strips Per Box"
  value={stripsPerBox}
  onChange={(e) => setStripsPerBox(e.target.value)}
  className="w-full border p-3 rounded"
/><input
  type="number"
  placeholder="Tablets Per Strip"
  value={tabletsPerStrip}
  onChange={(e) => setTabletsPerStrip(e.target.value)}
  className="w-full border p-3 rounded"
/>
  </>
)}
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Category</option>

  <option value="Medicine">Medicine</option>

<option value="Baby & Mom Care">
  Baby & Mom Care
</option>
  <option value="Healthcare">Healthcare</option>

  <option value="Medical Device">Medical Device</option>

  <option value="Personal Care">Personal Care</option>
</select>
<select
  value={unitType}
  onChange={(e) => setUnitType(e.target.value)}
  className="w-full border p-3 rounded-lg"
>
  <option value="">Select Unit Type</option>

  {category === "Medicine" && (
    <>
      <option value="Strip">Strip</option>
      <option value="Box">Box</option>
      <option value="Tablet">Tablet</option>
      <option value="Capsule">Capsule</option>
    </>
  )}

  {(category === "Baby & Mom Care" ||
    category === "Healthcare" ||
    category === "Personal Care") && (
    <>
      <option value="Bottle">Bottle</option>
      <option value="Piece">Piece</option>
    </>
  )}

  {category === "Medical Device" && (
    <option value="Piece">Piece</option>
  )}
</select>
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
  type="number"
  placeholder="Discount %"
  value={discount}
  onChange={(e) => setDiscount(e.target.value)}
  className="w-full border p-3 rounded"
  required
/>
<input
  type="text"
  placeholder="Image URL"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  className="w-full border p-3 rounded"
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
<input
  type="text"
  placeholder="Search by name or phone..."
  value={searchOrder}
  onChange={(e) => setSearchOrder(e.target.value)}
  className="w-full border p-3 rounded-lg mb-4"
/>
<div className="space-y-4 mb-8">
{filteredOrders
  .filter(
    (order) =>
      order.customerName
        ?.toLowerCase()
        .includes(searchOrder.toLowerCase()) ||
      order.phone?.includes(searchOrder)
  )
.map((order: any) => (
  <div
    key={order.id}
    className="bg-white border rounded-lg p-4"
  >    
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>

      <p>
        <strong>Name:</strong> {order.customerName}
      </p>

      <p>
        <strong>Phone:</strong> {order.phone}
      </p>

      <p>
        <strong>Address:</strong> {order.address}
      </p>

      <p>
        <strong>Total:</strong> ৳{order.total}
      </p>

<div className="mt-2">
  <strong>Status:</strong>{" "}

  <span
    className={`px-3 py-1 rounded-full text-white text-sm font-semibold
      ${
order.status === "pending"
  ? "bg-yellow-500"
  : order.status === "processing"
  ? "bg-blue-500"
  : order.status === "shipped"
  ? "bg-purple-500"
  : "bg-green-600"      }`}
  >
    {order.status}
  </span>
</div>
      <p>
        <strong>Date:</strong>{" "}
        {order.createdAt?.toDate
          ? order.createdAt
              .toDate()
              .toLocaleString()
          : "N/A"}
      </p>
<div className="mt-3">
  <strong>Products:</strong>

  <ul className="list-disc ml-5 mt-2">
    {order.items?.map(
      (item: any, index: number) => (
        <li key={index}>
          {item.name} × {item.quantity}
        </li>
      )
    )}
  </ul>
</div>
      <select
        value={order.status}
        onChange={(e) =>
          updateOrderStatus(
            order.id,
            e.target.value
          )
        }
        className="border p-2 rounded mt-3 mr-3"
      >
        <option value="pending">
          Pending
        </option>

        <option value="processing">
          Processing
        </option>
        <option value="shipped">Shipped</option>


        <option value="delivered">
          Delivered
        </option>
      </select>

      <button
        onClick={() => deleteOrder(order.id)}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Delete Order
      </button>
    </div>
  ))}
</div>
      <h2 className="text-2xl font-bold mb-4">
        Product List
      </h2>
      {lowStockProducts.length > 0 && (
        <div className="bg-red-100 border border-red-300 p-4 rounded-xl mb-4">
          <h3 className="font-bold text-red-700 mb-2">
            ⚠ Low Stock Products
          </h3>

          {lowStockProducts.map((product: any) => (
            <p key={product.id}>
              {product.name} (Stock: {product.stock})
            </p>
          ))}
        </div>
      )}
      <button
  onClick={deleteSelectedProducts}
  disabled={selectedProducts.length === 0}
  className="bg-red-600 text-white px-4 py-2 rounded mb-4"
>
  Delete Selected ({selectedProducts.length})
</button>
      <div
        ref={productSectionRef}
        className="grid md:grid-cols-2 gap-6"
      >
        {filteredProducts.map((product: any) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl shadow-sm overflow-hidden"
          >
      <div className="p-3">
  <input
    type="checkbox"
    checked={selectedProducts.includes(product.id)}
    onChange={() => toggleProductSelection(product.id)}
    className="w-5 h-5"
  />
</div>
      {product.imageUrl && (
        <div className="h-56 flex items-center justify-center bg-gray-50 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
{Number(product.stock) === 0 && (
  <div className="bg-red-500 text-white text-center py-2 font-semibold">
    Out of Stock
  </div>
)}
      <div className="p-4">
        <h3 className="text-xl font-bold">
          {product.name}
        </h3>
        {product.strength && (
          <p className="text-blue-600 font-semibold">
            Strength: {product.strength}
          </p>
        )}
<p>Category: {product.category}</p>

{product.company && (
  <p>Company: {product.company}</p>
)}

{product.category === "Medicine" && (
  <>
    <p>
      Pack: {product.stripsPerBox} Strips / Box
    </p>

    <p>
      Tablet: {product.tabletsPerStrip} / Strip
    </p>

  </>
)}

{product.category === "Baby & Mom Care" && (
  <>
    {product.size && (
      <p className="text-blue-600 font-semibold">
        Size: {product.size}
      </p>
    )}

    {product.brand && (
      <p>Brand: {product.brand}</p>
    )}
  </>
)}

{product.category === "Healthcare" && (
  <>
    {product.size && <p>Size: {product.size}</p>}
    {product.brand && <p>Brand: {product.brand}</p>}
  </>
)}

{product.category === "Medical Device" && (
  <>
    {product.model && <p>Model: {product.model}</p>}
    {product.warranty && (
      <p>Warranty: {product.warranty}</p>
    )}
  </>
)}
<p className="font-semibold text-teal-600">
  Selling Unit: {product.unitType}
</p>
<p className="font-bold text-lg text-green-600">
  ৳ {product.price} / {product.unitType}
</p>
<p
  className={
    Number(product.stock) === 0
      ? "text-red-600 font-bold"
      : Number(product.stock) <= 10
      ? "text-orange-500 font-bold"
      : "text-green-600"
  }
>
  Stock: {product.stock}
</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => editProduct(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

</div>
  );
}