"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
type Props = {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ProductBasicFields({
    formData,
    setFormData,
}: Props) {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, "categories"));

                const data = snapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((category: any) => category.status === true)
                    .sort(
                        (a: any, b: any) =>
                            (a.sortOrder || 0) - (b.sortOrder || 0)
                    );

                setCategories(data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        console.log("FIELD:", name, "VALUE:", value);

        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-5">

            {/* Product Name */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Product Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Company */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Company
                </label>

                <input
                    type="text"
                    name="company"
                    value={formData.company || ""}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            {/* Generic Name */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Generic Name
                </label>

                <input
                    type="text"
                    name="genericName"
                    value={formData.genericName || ""}
                    onChange={handleChange}
                    placeholder="Enter generic name"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
            {/* Category */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Category
                </label>

                <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Personal Care Fields */}
            <div className="mt-6 p-5 rounded-xl border-2 border-red-500 bg-red-50">
                <h3 className="text-lg font-bold text-red-700">
                    TEST - Personal Care Fields
                </h3>
            </div>
            <div className="mt-6 p-5 rounded-xl border-2 border-teal-500 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Personal Care Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Brand
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand || ""}
                            onChange={handleChange}
                            placeholder="Enter brand name"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Product Type */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Product Type
                        </label>
                        <input
                            type="text"
                            name="productType"
                            value={formData.productType || ""}
                            onChange={handleChange}
                            placeholder="e.g. Face Wash, Shampoo, Lotion"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Size / Volume */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Size / Volume
                        </label>
                        <input
                            type="text"
                            name="size"
                            value={formData.size || ""}
                            onChange={handleChange}
                            placeholder="e.g. 100 ml, 200 ml"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Key Ingredients */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Key Ingredients
                        </label>
                        <input
                            type="text"
                            name="keyIngredients"
                            value={formData.keyIngredients || ""}
                            onChange={handleChange}
                            placeholder="e.g. Kojic Acid, Niacinamide"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Skin / Hair Type */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Skin / Hair Type
                        </label>
                        <input
                            type="text"
                            name="skinHairType"
                            value={formData.skinHairType || ""}
                            onChange={handleChange}
                            placeholder="e.g. All Skin Types"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Country of Origin */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Country of Origin
                        </label>
                        <input
                            type="text"
                            name="countryOfOrigin"
                            value={formData.countryOfOrigin || ""}
                            onChange={handleChange}
                            placeholder="e.g. India"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Benefits */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Benefits
                        </label>
                        <textarea
                            name="benefits"
                            value={formData.benefits || ""}
                            onChange={handleChange}
                            placeholder="Enter product benefits"
                            rows={3}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* How to Use */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            How to Use
                        </label>
                        <textarea
                            name="howToUse"
                            value={formData.howToUse || ""}
                            onChange={handleChange}
                            placeholder="Enter directions for use"
                            rows={3}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Ingredients */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Ingredients / Composition
                        </label>
                        <textarea
                            name="ingredients"
                            value={formData.ingredients || ""}
                            onChange={handleChange}
                            placeholder="Enter full ingredients / composition"
                            rows={4}
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Shelf Life */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Shelf Life
                        </label>
                        <input
                            type="text"
                            name="shelfLife"
                            value={formData.shelfLife || ""}
                            onChange={handleChange}
                            placeholder="e.g. 24 Months"
                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                </div>
            </div>
            {/* Price */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Price
                </label>

                <input
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    placeholder="Enter price"
                    min="0"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Stock */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Stock
                </label>

                <input
                    type="number"
                    name="stock"
                    value={formData.stock || ""}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    min="0"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Unit Type */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Selling Unit
                </label>

                <select
                    name="unitType"
                    value={formData.unitType || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Select Selling Unit</option>

                    <option value="Piece">Piece</option>
                    <option value="Box">Box</option>
                    <option value="Strip">Strip</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Pack">Pack</option>
                    <option value="Tube">Tube</option>
                    <option value="Kit">Kit</option>
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Features */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Features
                </label>

                <textarea
                    name="features"
                    value={formData.features || ""}
                    onChange={handleChange}
                    placeholder="Enter product features"
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Specifications */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Specifications
                </label>

                <textarea
                    name="specifications"
                    value={formData.specifications || ""}
                    onChange={handleChange}
                    placeholder="Enter product specifications"
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </div>
    );
}