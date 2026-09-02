"use client";

import Accordion from "./Accordion";

type Props = {
  product: any;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="mt-8">

      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          Product Information
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Detailed information about this product
        </p>
      </div>

      {/* =========================
          COMMON INFORMATION
      ========================== */}

      {product.description && (
        <Accordion title="📄 Description" defaultOpen>
          <div className="whitespace-pre-line leading-7 text-slate-700">
            {product.description}
          </div>
        </Accordion>
      )}

      {product.features && (
        <Accordion title="✨ Features">
          <div className="whitespace-pre-line leading-7 text-slate-700">
            {product.features}
          </div>
        </Accordion>
      )}

      {product.specifications && (
        <Accordion title="📋 Specifications">
          <div className="whitespace-pre-line leading-7 text-slate-700">
            {product.specifications}
          </div>
        </Accordion>
      )}

      {/* =========================
          PERSONAL CARE
      ========================== */}

      {product.category === "Personal Care" && (
        <>
          {product.brand && (
            <Accordion title="🏷️ Brand">
              {product.brand}
            </Accordion>
          )}

          {product.productType && (
            <Accordion title="🧴 Product Type">
              {product.productType}
            </Accordion>
          )}

          {product.size && (
            <Accordion title="📏 Size / Volume">
              {product.size}
            </Accordion>
          )}

          {product.strength && (
            <Accordion title="✨ Variant / Type">
              {product.strength}
            </Accordion>
          )}

          {product.keyIngredients && (
            <Accordion title="🧪 Key Ingredients">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.keyIngredients}
              </div>
            </Accordion>
          )}

          {product.skinHairType && (
            <Accordion title="👤 Suitable For">
              {product.skinHairType}
            </Accordion>
          )}

          {product.benefits && (
            <Accordion title="🌿 Benefits">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.benefits}
              </div>
            </Accordion>
          )}

          {product.howToUse && (
            <Accordion title="📖 How to Use">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.howToUse}
              </div>
            </Accordion>
          )}

          {product.ingredients && (
            <Accordion title="🧪 Ingredients / Composition">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.ingredients}
              </div>
            </Accordion>
          )}

          {product.countryOfOrigin && (
            <Accordion title="🌍 Country of Origin">
              {product.countryOfOrigin}
            </Accordion>
          )}

          {product.shelfLife && (
            <Accordion title="📦 Shelf Life / Best Before">
              {product.shelfLife}
            </Accordion>
          )}

          {product.company && (
            <Accordion title="🏢 Manufacturer / Company">
              {product.company}
            </Accordion>
          )}
        </>
      )}

      {/* =========================
          HEALTHCARE
      ========================== */}

      {product.category === "Healthcare" && (
        <>
          {product.brand && (
            <Accordion title="🏷️ Brand">
              {product.brand}
            </Accordion>
          )}

          {product.size && (
            <Accordion title="📏 Size">
              {product.size}
            </Accordion>
          )}

          {product.strength && (
            <Accordion title="⚙️ Strength / Specification">
              {product.strength}
            </Accordion>
          )}

          {product.company && (
            <Accordion title="🏢 Company">
              {product.company}
            </Accordion>
          )}
        </>
      )}

      {/* =========================
          MEDICINE
      ========================== */}

      {product.category === "Medicine" && (
        <>
          {product.pharmacology && (
            <Accordion title="💊 Pharmacology">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.pharmacology}
              </div>
            </Accordion>
          )}

          {product.indication && (
            <Accordion title="🩺 Indication">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.indication}
              </div>
            </Accordion>
          )}

          {product.dosage && (
            <Accordion title="💉 Dosage">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.dosage}
              </div>
            </Accordion>
          )}

          {product.administration && (
            <Accordion title="💊 Administration">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.administration}
              </div>
            </Accordion>
          )}

          {product.sideEffects && (
            <Accordion title="⚠️ Side Effects">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.sideEffects}
              </div>
            </Accordion>
          )}

          {product.precautions && (
            <Accordion title="🛡️ Precautions">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.precautions}
              </div>
            </Accordion>
          )}

          {product.pregnancyLactation && (
            <Accordion title="🤰 Pregnancy & Lactation">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.pregnancyLactation}
              </div>
            </Accordion>
          )}

          {product.drugInteraction && (
            <Accordion title="🔄 Drug Interaction">
              <div className="whitespace-pre-line leading-7 text-slate-700">
                {product.drugInteraction}
              </div>
            </Accordion>
          )}

          {product.storageInfo && (
            <Accordion title="📦 Storage">
              {product.storageInfo}
            </Accordion>
          )}
        </>
      )}

      {/* =========================
          BABY & MOM CARE
      ========================== */}

      {product.category === "Baby & Mom Care" && (
        <>
          {product.brand && (
            <Accordion title="🏷️ Brand">
              {product.brand}
            </Accordion>
          )}

          {product.size && (
            <Accordion title="📏 Size">
              {product.size}
            </Accordion>
          )}

          {product.strength && (
            <Accordion title="⚙️ Specification">
              {product.strength}
            </Accordion>
          )}

          {product.company && (
            <Accordion title="🏢 Company">
              {product.company}
            </Accordion>
          )}
        </>
      )}

      {/* =========================
          MEDICAL DEVICE
      ========================== */}

      {product.category === "Medical Device" && (
        <>
          {product.brand && (
            <Accordion title="🏷️ Brand">
              {product.brand}
            </Accordion>
          )}

          {product.model && (
            <Accordion title="🔧 Model">
              {product.model}
            </Accordion>
          )}

          {product.size && (
            <Accordion title="📏 Size / Specification">
              {product.size}
            </Accordion>
          )}

          {product.warranty && (
            <Accordion title="🛡️ Warranty">
              {product.warranty}
            </Accordion>
          )}

          {product.company && (
            <Accordion title="🏢 Manufacturer / Company">
              {product.company}
            </Accordion>
          )}
        </>
      )}

    </div>
  );
}