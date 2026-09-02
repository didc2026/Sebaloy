"use client";

type Props = {
    product: any;
    selectedProducts: string[];
    toggleProductSelection: (id: string) => void;
    editProduct: (product: any) => void;
    deleteProduct: (id: string) => void;
};

export default function ProductCard({
    product,
    selectedProducts,
    toggleProductSelection,
    editProduct,
    deleteProduct,
}: Props) {
    console.log("CUSTOMER PRODUCT:", product);
    return (
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">

            {/* Checkbox */}
            <div className="absolute top-3 left-3 z-10 bg-white rounded-lg p-1 shadow-sm">
                <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="w-5 h-5 cursor-pointer"
                />
            </div>

            {/* Product Image */}
            {product.imageUrl && (
                <div className="h-56 flex items-center justify-center bg-slate-50 p-4">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
            )}

            {/* Out of Stock */}
            {Number(product.stock) === 0 && (
                <div className="bg-red-500 text-white text-center py-2 font-semibold">
                    Out of Stock
                </div>
            )}

            {/* Product Information */}
            <div className="p-5">

                {/* Product Name */}
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                    {product.name?.split(" Powder for Suspension")[0]}
                </h3>

                {product.name?.includes("Powder for Suspension") && (
                    <p className="text-xs text-slate-500 italic mt-1">
                        Powder for Suspension
                    </p>
                )}

                {/* Strength */}
                {product.strength && (
                    <p className="text-blue-600 font-semibold mt-2">
                        Strength: {product.strength}
                    </p>
                )}

                {/* Brand */}
                {product.brand && (
                    <p className="text-sm text-slate-600 mt-1">
                        Brand: <span className="font-medium">{product.brand}</span>
                    </p>
                )}
                {/* Size */}
                {product.size && (
                    <p className="text-sm text-slate-600 mt-1">
                        Size: <span className="font-medium">{product.size}</span>
                    </p>
                )}

                {/* Category */}
                {product.category && (
                    <p className="text-sm text-slate-600 mt-1">
                        Category: {product.category}
                    </p>
                )}

                {/* Company */}
                {product.company && (
                    <p className="text-sm text-slate-600">
                        Company: {product.company}
                    </p>
                )}

                {/* Medicine Information */}
                {product.category === "Medicine" && (
                    <div className="mt-2 space-y-1">
                        {product.stripsPerBox && (
                            <p className="text-sm text-slate-600">
                                Pack: {product.stripsPerBox} Strips / Box
                            </p>
                        )}

                        {product.tabletsPerStrip && (
                            <p className="text-sm text-slate-600">
                                Tablet: {product.tabletsPerStrip} / Strip
                            </p>
                        )}
                    </div>
                )}

                {/* Baby & Mom Care */}
                {product.category === "Baby & Mom Care" && (
                    <div className="mt-2 space-y-1">
                        {product.size && (
                            <p className="text-blue-600 font-semibold">
                                Size: {product.size}
                            </p>
                        )}

                        {product.brand && (
                            <p className="text-sm text-slate-600">
                                Brand: {product.brand}
                            </p>
                        )}
                    </div>
                )}

                {/* Healthcare */}
                {product.category === "Healthcare" && (

                    <div className="mt-2 space-y-1">
                        {product.size && (
                            <p className="text-sm text-slate-600">
                                Size: {product.size}
                            </p>
                        )}

                        {product.brand && (
                            <p className="text-sm text-slate-600">
                                Brand: {product.brand}
                            </p>
                        )}
                    </div>
                )}
                {/* Personal Care */}
                {product.category === "Personal Care" && (
                    <div className="mt-2 space-y-1">

                        {product.productType && (
                            <p className="text-sm text-slate-600">
                                Type: <span className="font-medium">
                                    {product.productType}
                                </span>
                            </p>
                        )}

                        {product.keyIngredients && (
                            <p className="text-sm text-slate-600">
                                Key Ingredients: <span className="font-medium">
                                    {product.keyIngredients}
                                </span>
                            </p>
                        )}

                        {product.skinHairType && (
                            <p className="text-sm text-slate-600">
                                Suitable For: <span className="font-medium">
                                    {product.skinHairType}
                                </span>
                            </p>
                        )}

                    </div>
                )}
                {/* =========================
    MEDICAL DEVICE / IVD
========================= */}

                {product.category === "Medical Devices" && (
                    <div className="mt-2 space-y-1">

                        {product.model?.trim() && (
                            <p className="text-sm text-slate-600">
                                Model: {product.model}
                            </p>
                        )}

                        {product.warranty?.trim() && (
                            <p className="text-sm text-slate-600">
                                Warranty: {product.warranty}
                            </p>
                        )}

                        {product.kitType?.trim() && (
                            <p className="text-sm text-slate-600">
                                Kit Type: {product.kitType}
                            </p>
                        )}

                        {product.numberOfTests?.trim() && (
                            <p className="text-sm text-slate-600">
                                Tests: {product.numberOfTests}
                            </p>
                        )}

                        {product.ceIvdrStatus?.trim() && (
                            <p className="text-sm text-slate-600">
                                CE / IVDR: {product.ceIvdrStatus}
                            </p>
                        )}

                        {product.ivdClassification?.trim() && (
                            <p className="text-sm text-slate-600">
                                IVD Classification: {product.ivdClassification}
                            </p>
                        )}

                        {product.instrumentCompatibility?.trim() && (
                            <p className="text-sm text-slate-600">
                                Analyzer Compatibility: {product.instrumentCompatibility}
                            </p>
                        )}

                    </div>
                )}
                {/* =========================
    LAB TEST / DIAGNOSTIC SERVICE
========================= */}

                {product.category === "Lab Tests" && (
                    <div className="mt-2 space-y-1">

                        {product.testName?.trim() && (
                            <p className="text-sm text-slate-600">
                                Test Name: {product.testName}
                            </p>
                        )}

                        {product.shortName?.trim() && (
                            <p className="text-sm text-slate-600">
                                Short Name: {product.shortName}
                            </p>
                        )}

                        {product.testCategory?.trim() && (
                            <p className="text-sm text-slate-600">
                                Test Category: {product.testCategory}
                            </p>
                        )}

                        {product.testCode?.trim() && (
                            <p className="text-sm text-slate-600">
                                Test Code: {product.testCode}
                            </p>
                        )}

                        {product.clinicalSpecialty?.trim() && (
                            <p className="text-sm text-slate-600">
                                Clinical Specialty: {product.clinicalSpecialty}
                            </p>
                        )}

                        {product.targetDiseaseCondition?.trim() && (
                            <p className="text-sm text-slate-600">
                                Target Disease / Condition: {product.targetDiseaseCondition}
                            </p>
                        )}

                        {product.sampleType?.trim() && (
                            <p className="text-sm text-slate-600">
                                Sample Type: {product.sampleType}
                            </p>
                        )}

                        {product.specimen?.trim() && (
                            <p className="text-sm text-slate-600">
                                Specimen: {product.specimen}
                            </p>
                        )}

                        {product.sampleVolume?.trim() && (
                            <p className="text-sm text-slate-600">
                                Sample Volume: {product.sampleVolume}
                            </p>
                        )}

                        {product.testMethod?.trim() && (
                            <p className="text-sm text-slate-600">
                                Test Method: {product.testMethod}
                            </p>
                        )}

                        {product.testPrinciple?.trim() && (
                            <p className="text-sm text-slate-600">
                                Test Principle: {product.testPrinciple}
                            </p>
                        )}

                        {product.testingPlatformAnalyzer?.trim() && (
                            <p className="text-sm text-slate-600">
                                Testing Platform / Analyzer: {product.testingPlatformAnalyzer}
                            </p>
                        )}

                        {product.referenceRangeCutoff?.trim() && (
                            <p className="text-sm text-slate-600">
                                Reference Range / Cut-off: {product.referenceRangeCutoff}
                            </p>
                        )}

                        {product.unit?.trim() && (
                            <p className="text-sm text-slate-600">
                                Unit: {product.unit}
                            </p>
                        )}

                        {product.resultType?.trim() && (
                            <p className="text-sm text-slate-600">
                                Result Type: {product.resultType}
                            </p>
                        )}

                        {product.turnaroundTime?.trim() && (
                            <p className="text-sm text-slate-600">
                                TAT: {product.turnaroundTime}
                            </p>
                        )}

                        {product.homeSampleCollection?.trim() && (
                            <p className="text-sm text-slate-600">
                                Home Sample Collection: {product.homeSampleCollection}
                            </p>
                        )}

                        {product.partnerLaboratory?.trim() && (
                            <p className="text-sm text-slate-600">
                                Partner Laboratory: {product.partnerLaboratory}
                            </p>
                        )}

                        {product.branchLocation?.trim() && (
                            <p className="text-sm text-slate-600">
                                Branch / Location: {product.branchLocation}
                            </p>
                        )}

                        {product.partnerLabTestCode?.trim() && (
                            <p className="text-sm text-slate-600">
                                Partner Lab Test Code: {product.partnerLabTestCode}
                            </p>
                        )}

                    </div>
                )}
                {/* Selling Unit */}
                {product.unitType && (
                    <p className="font-semibold text-teal-600 mt-3">
                        Selling Unit: {product.unitType}
                    </p>
                )}

                {/* Price */}
                {product.price !== undefined && product.price !== null && (
                    <p className="font-bold text-xl text-green-600 mt-1">
                        ৳ {Number(product.price).toLocaleString()}
                        {product.unitType && (
                            <span className="text-sm font-medium text-slate-500">
                                {" "}
                                / {product.unitType}
                            </span>
                        )}
                    </p>
                )}

                {/* Stock */}
                {product.stock !== undefined && (
                    <div className="mt-3">
                        {Number(product.stock) === 0 ? (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                🔴 Out of Stock
                            </span>
                        ) : Number(product.stock) <= 10 ? (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                                🟠 Low Stock: {product.stock}
                            </span>
                        ) : (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                🟢 In Stock: {product.stock}
                            </span>
                        )}
                    </div>
                )}
                {/* Action Buttons */}
                <div className="flex gap-2 mt-5">

                    <button
                        type="button"
                        onClick={() => editProduct(product)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
}