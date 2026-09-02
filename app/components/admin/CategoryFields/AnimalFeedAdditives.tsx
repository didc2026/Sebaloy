"use client";

type Props = {
    brand: string;
    setBrand: (value: string) => void;

    company: string;
    setCompany: (value: string) => void;

    productType: string;
    setProductType: (value: string) => void;

    size: string;
    setSize: (value: string) => void;

    activeIngredient: string;
    setActiveIngredient: (value: string) => void;

    activeContent: string;
    setActiveContent: (value: string) => void;

    casNumber: string;
    setCasNumber: (value: string) => void;

    chemicalFormula: string;
    setChemicalFormula: (value: string) => void;

    targetAnimal: string;
    setTargetAnimal: (value: string) => void;

    applicationPurpose: string;
    setApplicationPurpose: (value: string) => void;

    inclusionRate: string;
    setInclusionRate: (value: string) => void;

    physicalForm: string;
    setPhysicalForm: (value: string) => void;

    countryOfOrigin: string;
    setCountryOfOrigin: (value: string) => void;

    shelfLife: string;
    setShelfLife: (value: string) => void;

    storageConditions: string;
    setStorageConditions: (value: string) => void;

    specifications: string;
    setSpecifications: (value: string) => void;
};

export default function AnimalFeedAdditives({
    brand,
    setBrand,

    company,
    setCompany,

    productType,
    setProductType,

    size,
    setSize,

    activeIngredient,
    setActiveIngredient,

    activeContent,
    setActiveContent,

    casNumber,
    setCasNumber,

    chemicalFormula,
    setChemicalFormula,

    targetAnimal,
    setTargetAnimal,

    applicationPurpose,
    setApplicationPurpose,

    inclusionRate,
    setInclusionRate,

    physicalForm,
    setPhysicalForm,

    countryOfOrigin,
    setCountryOfOrigin,

    shelfLife,
    setShelfLife,

    storageConditions,
    setStorageConditions,

    specifications,
    setSpecifications,
}: Props) {
    return (
        <div className="md:col-span-2 mt-6 p-5 rounded-xl border bg-slate-50">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🐄</span>

                <h2 className="text-xl font-semibold text-slate-800">
                    Animal Feed Additive Information
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* PRODUCT TYPE */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Product Type
                    </label>

                    <input
                        type="text"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        placeholder="e.g. Feed Acidifier, Mycotoxin Binder, Premix"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>
                {/* SIZE / PACK SIZE */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Size / Pack Size
                    </label>

                    <input
                        type="text"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="e.g. 25 kg, 50 kg, 1 L, 500 g"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* BRAND */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Brand
                    </label>

                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="e.g. Adisseo, Evonik"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* COMPANY */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Manufacturer / Company
                    </label>

                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter manufacturer or company name"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* ACTIVE INGREDIENT */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Active Ingredient
                    </label>

                    <input
                        type="text"
                        value={activeIngredient}
                        onChange={(e) => setActiveIngredient(e.target.value)}
                        placeholder="e.g. Calcium Propionate, L-Lysine"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* ACTIVE CONTENT */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Active Content / Assay
                    </label>

                    <input
                        type="text"
                        value={activeContent}
                        onChange={(e) => setActiveContent(e.target.value)}
                        placeholder="e.g. ≥99%, 60% Choline Chloride"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* CAS NUMBER */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        CAS Number
                    </label>

                    <input
                        type="text"
                        value={casNumber}
                        onChange={(e) => setCasNumber(e.target.value)}
                        placeholder="e.g. 4075-81-4"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* CHEMICAL FORMULA */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Chemical Formula
                    </label>

                    <input
                        type="text"
                        value={chemicalFormula}
                        onChange={(e) => setChemicalFormula(e.target.value)}
                        placeholder="e.g. C3H5NaO2"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* TARGET ANIMAL */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Target Animal
                    </label>

                    <input
                        type="text"
                        value={targetAnimal}
                        onChange={(e) => setTargetAnimal(e.target.value)}
                        placeholder="e.g. Poultry, Cattle, Swine, Aquaculture"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* APPLICATION / PURPOSE */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Application / Purpose
                    </label>

                    <textarea
                        value={applicationPurpose}
                        onChange={(e) => setApplicationPurpose(e.target.value)}
                        placeholder="e.g. Improves feed efficiency, controls mold growth, supports gut health"
                        rows={3}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
                    />
                </div>

                {/* INCLUSION RATE */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Recommended Inclusion Rate
                    </label>

                    <input
                        type="text"
                        value={inclusionRate}
                        onChange={(e) => setInclusionRate(e.target.value)}
                        placeholder="e.g. 1–2 kg/ton feed"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* PHYSICAL FORM */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Physical Form
                    </label>

                    <input
                        type="text"
                        value={physicalForm}
                        onChange={(e) => setPhysicalForm(e.target.value)}
                        placeholder="e.g. Powder, Granules, Liquid"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* COUNTRY OF ORIGIN */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Country of Origin
                    </label>

                    <input
                        type="text"
                        value={countryOfOrigin}
                        onChange={(e) => setCountryOfOrigin(e.target.value)}
                        placeholder="e.g. China, Germany, USA"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* SHELF LIFE */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Shelf Life
                    </label>

                    <input
                        type="text"
                        value={shelfLife}
                        onChange={(e) => setShelfLife(e.target.value)}
                        placeholder="e.g. 24 Months"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* STORAGE */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Storage Conditions
                    </label>

                    <input
                        type="text"
                        value={storageConditions}
                        onChange={(e) => setStorageConditions(e.target.value)}
                        placeholder="e.g. Store in a cool, dry and well-ventilated place"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3"
                    />
                </div>

                {/* SPECIFICATIONS */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Specifications
                    </label>

                    <textarea
                        value={specifications}
                        onChange={(e) => setSpecifications(e.target.value)}
                        placeholder="Enter detailed product specifications"
                        rows={5}
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
                    />
                </div>

            </div>
        </div>
    );
}