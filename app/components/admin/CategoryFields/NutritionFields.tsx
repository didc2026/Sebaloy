// NutritionFields.tsx
// Nutrition category specific product fields for Sebaloy Admin Dashboard.

interface NutritionFieldsProps {
  brand: string;
  setBrand: (value: string) => void;

  company: string;
  setCompany: (value: string) => void;

  productType: string;
  setProductType: (value: string) => void;

  size: string;
  setSize: (value: string) => void;

  strength: string;
  setStrength: (value: string) => void;

  keyIngredients: string;
  setKeyIngredients: (value: string) => void;

  benefits: string;
  setBenefits: (value: string) => void;

  howToUse: string;
  setHowToUse: (value: string) => void;

  ingredients: string;
  setIngredients: (value: string) => void;

  countryOfOrigin: string;
  setCountryOfOrigin: (value: string) => void;

  shelfLife: string;
  setShelfLife: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  specifications: string;
  setSpecifications: (value: string) => void;
}

export default function NutritionFields({
  brand,
  setBrand,
  company,
  setCompany,
  productType,
  setProductType,
  size,
  setSize,
  strength,
  setStrength,
  keyIngredients,
  setKeyIngredients,
  benefits,
  setBenefits,
  howToUse,
  setHowToUse,
  ingredients,
  setIngredients,
  countryOfOrigin,
  setCountryOfOrigin,
  shelfLife,
  setShelfLife,
  description,
  setDescription,
  specifications,
  setSpecifications,
}: NutritionFieldsProps) {
  return (
    <div className="space-y-6">
      {/* =========================
          BASIC NUTRITION PRODUCT
      ========================== */}

      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Nutrition Product Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Brand
            </label>

            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Company / Manufacturer
            </label>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company / manufacturer"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Type
            </label>

            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              placeholder="e.g. Protein Powder, Multivitamin, Supplement"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Size / Pack Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Size / Pack Size
            </label>

            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 200 g, 500 g, 30 Tablets"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Strength / Specification */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Strength / Nutritional Specification
            </label>

            <input
              type="text"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              placeholder="e.g. 1000 mg, 25 g Protein"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Country of Origin */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Country of Origin
            </label>

            <input
              type="text"
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              placeholder="e.g. USA, Germany, Bangladesh"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* Shelf Life */}
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
        </div>
      </div>

      {/* =========================
          KEY INGREDIENTS
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Key Ingredients
        </label>

        <textarea
          value={keyIngredients}
          onChange={(e) => setKeyIngredients(e.target.value)}
          placeholder="Enter the main nutritional ingredients"
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>

      {/* =========================
          INGREDIENTS
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Ingredients / Composition
        </label>

        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter complete ingredients or composition"
          rows={5}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>

      {/* =========================
          BENEFITS
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Benefits
        </label>

        <textarea
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          placeholder="Enter product benefits"
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>

      {/* =========================
          HOW TO USE
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          How to Use
        </label>

        <textarea
          value={howToUse}
          onChange={(e) => setHowToUse(e.target.value)}
          placeholder="Enter recommended usage instructions"
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>

      {/* =========================
          PRODUCT DESCRIPTION
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Product Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a clear and detailed product description"
          rows={6}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>

      {/* =========================
          SPECIFICATIONS
      ========================== */}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Specifications
        </label>

        <textarea
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          placeholder="Enter nutritional or product specifications"
          rows={5}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
        />
      </div>
    </div>
  );
}
