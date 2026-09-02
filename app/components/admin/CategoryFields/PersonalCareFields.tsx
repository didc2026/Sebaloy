"use client";

type Props = {
  brand: string;
  setBrand: (value: string) => void;

  size: string;
  setSize: (value: string) => void;

  strength: string;
  setStrength: (value: string) => void;

  company: string;
  setCompany: (value: string) => void;

  productType: string;
  setProductType: (value: string) => void;

  keyIngredients: string;
  setKeyIngredients: (value: string) => void;

  skinHairType: string;
  setSkinHairType: (value: string) => void;

  countryOfOrigin: string;
  setCountryOfOrigin: (value: string) => void;

  benefits: string;
  setBenefits: (value: string) => void;

  howToUse: string;
  setHowToUse: (value: string) => void;

  ingredients: string;
  setIngredients: (value: string) => void;

  shelfLife: string;
  setShelfLife: (value: string) => void;
};

export default function PersonalCareFields({
  brand,
  setBrand,
  size,
  setSize,
  strength,
  setStrength,
  company,
  setCompany,
  productType,
  setProductType,
  keyIngredients,
  setKeyIngredients,
  skinHairType,
  setSkinHairType,
  countryOfOrigin,
  setCountryOfOrigin,
  benefits,
  setBenefits,
  howToUse,
  setHowToUse,
  ingredients,
  setIngredients,
  shelfLife,
  setShelfLife,
}: Props) {
  return (
    <div className="md:col-span-2 mt-4 p-5 rounded-xl border bg-slate-50">
      <h3 className="text-xl font-bold text-slate-800 mb-5">
        🧴 Personal Care Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Brand
          </label>

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. The Derma Co"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Type
          </label>

          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            placeholder="e.g. Face Serum, Face Wash, Moisturizer"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Size / Volume */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Size / Volume
          </label>

          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="e.g. 30 ml, 50 g, 100 ml"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Variant / Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Variant / Type
          </label>

          <input
            type="text"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
            placeholder="e.g. 10% Niacinamide, Sensitive Skin"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Key Ingredients */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Key Ingredients
          </label>

          <input
            type="text"
            value={keyIngredients}
            onChange={(e) => setKeyIngredients(e.target.value)}
            placeholder="e.g. Niacinamide, Zinc PCA"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Skin / Hair Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Skin / Hair Type
          </label>

          <input
            type="text"
            value={skinHairType}
            onChange={(e) => setSkinHairType(e.target.value)}
            placeholder="e.g. All Skin Types, Oily Skin"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Manufacturer / Company */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Manufacturer / Company
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Country of Origin */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Country of Origin
          </label>

          <input
            type="text"
            value={countryOfOrigin}
            onChange={(e) => setCountryOfOrigin(e.target.value)}
            placeholder="e.g. India"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Benefits */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Benefits
          </label>

          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="Enter key product benefits"
            rows={4}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* How to Use */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            How to Use
          </label>

          <textarea
            value={howToUse}
            onChange={(e) => setHowToUse(e.target.value)}
            placeholder="Enter directions for use"
            rows={4}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Ingredients / Composition */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Ingredients / Composition
          </label>

          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter full ingredients / composition"
            rows={5}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Shelf Life */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Shelf Life / Best Before
          </label>

          <input
            type="text"
            value={shelfLife}
            onChange={(e) => setShelfLife(e.target.value)}
            placeholder="e.g. 24 Months"
            className="w-full border rounded-lg p-3"
          />
        </div>

      </div>
    </div>
  );
}