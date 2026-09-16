"use client";

import Accordion from "./Accordion";

type Props = {
  product: any;
};

export default function ProductInfo({ product }: Props) {
  // Show information only when a real value exists.
  // Empty strings and whitespace-only values are treated as missing.
  const hasValue = (value: unknown) =>
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "";

  const isVial =
    String(product.unitType ?? "").toLowerCase() === "vial" ||
    String(product.packType ?? "").toLowerCase() === "vial" ||
    String(product.dosageForm ?? "").toLowerCase() === "vial" ||
    String(product.form ?? "").toLowerCase() === "vial" ||
    String(product.sellingUnit ?? "").toLowerCase() === "vial" ||
    String(product.selectedUnit ?? "").toLowerCase() === "vial" ||
    product.vialPrice !== undefined ||
    product.vialSize !== undefined ||
    product.unitOptions?.some(
      (unit: string) =>
        String(unit).toLowerCase() === "vial"
    );

  return (
    <div className="mt-6 sm:mt-8 w-full min-w-0 overflow-hidden">

      {/* Section Heading */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Product Information
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed information about this product
        </p>
      </div>

      {/* =========================
          COMMON INFORMATION
      ========================== */}

      {product.description && (
        <Accordion
          title="📄 Description"
          defaultOpen
        >
          <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
            {product.description}
          </div>
        </Accordion>
      )}

      {product.features && (
        <Accordion title="✨ Features">
          <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
            {product.features}
          </div>
        </Accordion>
      )}

      {product.specifications && (
        <Accordion title="📋 Specifications">
          <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
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
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
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
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.benefits}
              </div>
            </Accordion>
          )}

          {product.howToUse && (
            <Accordion title="📖 How to Use">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.howToUse}
              </div>
            </Accordion>
          )}

          {product.ingredients && (
            <Accordion title="🧪 Ingredients / Composition">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
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
          {/* VIAL INFORMATION */}
          {isVial && (
            <Accordion
              title="💉 Vial Information"
              defaultOpen
            >
              <div className="space-y-3 text-sm sm:text-base">

                {product.vialSize && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-slate-100 pb-2">
                    <span className="font-semibold text-slate-700">
                      Vial Size
                    </span>

                    <span className="text-slate-600 sm:text-right">
                      {product.vialSize}
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-700">
                    Available Unit
                  </span>

                  <span className="font-semibold text-blue-600 sm:text-right">
                    Vial
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                  <span className="font-semibold text-slate-700">
                    Selling Unit
                  </span>

                  <span className="font-semibold text-green-600 sm:text-right">
                    Vial
                  </span>
                </div>

              </div>
            </Accordion>
          )}

          {/* NORMAL TABLET / STRIP / BOX INFORMATION */}
          {!isVial && (
            <>
              {(hasValue(product.stripsPerBox) ||
                hasValue(product.tabletsPerStrip) ||
                hasValue(product.unitType)) && (
                <Accordion title="💊 Pack Information">
                  <div className="space-y-3 text-sm sm:text-base">

                    {hasValue(product.stripsPerBox) && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-slate-100 pb-2">
                        <span className="font-semibold text-slate-700">
                          Strips Per Box
                        </span>

                        <span className="text-slate-600 sm:text-right">
                          {product.stripsPerBox}
                        </span>
                      </div>
                    )}

                    {hasValue(product.tabletsPerStrip) && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-slate-100 pb-2">
                        <span className="font-semibold text-slate-700">
                          Tablets Per Strip
                        </span>

                        <span className="text-slate-600 sm:text-right">
                          {product.tabletsPerStrip}
                        </span>
                      </div>
                    )}

                    {hasValue(product.unitType) && (
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                        <span className="font-semibold text-slate-700">
                          Selling Unit
                        </span>

                        <span className="text-green-600 font-semibold sm:text-right">
                          {product.unitType}
                        </span>
                      </div>
                    )}

                  </div>
                </Accordion>
              )}
            </>
          )}

          {/* PHARMACOLOGY */}
          {hasValue(product.pharmacology) && (
            <Accordion title="💊 Pharmacology">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.pharmacology}
              </div>
            </Accordion>
          )}

          {/* INDICATION */}
          {hasValue(product.indication) && (
            <Accordion title="🩺 Indication">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.indication}
              </div>
            </Accordion>
          )}

          {/* DOSAGE */}
          {hasValue(product.dosage) && (
            <Accordion title="💉 Dosage">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.dosage}
              </div>
            </Accordion>
          )}

          {/* ADMINISTRATION */}
          {hasValue(product.administration) && (
            <Accordion title="💊 Administration">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.administration}
              </div>
            </Accordion>
          )}

          {/* SIDE EFFECTS */}
          {hasValue(product.sideEffects) && (
            <Accordion title="⚠️ Side Effects">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.sideEffects}
              </div>
            </Accordion>
          )}

          {/* PRECAUTIONS */}
          {hasValue(product.precautions) && (
            <Accordion title="🛡️ Precautions">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.precautions}
              </div>
            </Accordion>
          )}

          {/* PREGNANCY */}
          {hasValue(product.pregnancyLactation) && (
            <Accordion title="🤰 Pregnancy & Lactation">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.pregnancyLactation}
              </div>
            </Accordion>
          )}

          {/* DRUG INTERACTION */}
          {hasValue(product.drugInteraction) && (
            <Accordion title="🔄 Drug Interaction">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.drugInteraction}
              </div>
            </Accordion>
          )}

          {/* STORAGE */}
          {hasValue(product.storageInfo) && (
            <Accordion title="📦 Storage">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.storageInfo}
              </div>
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
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.brand}
              </div>
            </Accordion>
          )}

          {product.size && (
            <Accordion title="📏 Size">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.size}
              </div>
            </Accordion>
          )}

          {product.strength && (
            <Accordion title="⚙️ Specification">
              <div className="whitespace-pre-line leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.strength}
              </div>
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

      {/* =========================
          ANIMAL FEED ADDITIVES
      ========================== */}

      {product.category === "Animal Feed Additives" && (
        <>
          {hasValue(product.brand) && (
            <Accordion title="🏷️ Brand">
              {product.brand}
            </Accordion>
          )}

          {hasValue(product.company) && (
            <Accordion title="🏢 Manufacturer / Company">
              {product.company}
            </Accordion>
          )}

          {hasValue(product.productType) && (
            <Accordion title="🧪 Product Type">
              {product.productType}
            </Accordion>
          )}

          {hasValue(product.size) && (
            <Accordion title="📏 Size / Pack Size">
              {product.size}
            </Accordion>
          )}

          {hasValue(product.activeIngredient) && (
            <Accordion title="⚗️ Active Ingredient">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.activeIngredient}
              </div>
            </Accordion>
          )}

          {hasValue(product.activeContent) && (
            <Accordion title="📊 Active Content / Assay">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.activeContent}
              </div>
            </Accordion>
          )}

          {hasValue(product.casNumber) && (
            <Accordion title="🔢 CAS Number">
              <div className="break-words text-sm sm:text-base text-slate-700">
                {product.casNumber}
              </div>
            </Accordion>
          )}

          {hasValue(product.chemicalFormula) && (
            <Accordion title="🧬 Chemical Formula">
              <div className="break-words text-sm sm:text-base text-slate-700">
                {product.chemicalFormula}
              </div>
            </Accordion>
          )}

          {hasValue(product.targetAnimal) && (
            <Accordion title="🐄 Target Animal">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.targetAnimal}
              </div>
            </Accordion>
          )}

          {hasValue(product.applicationPurpose) && (
            <Accordion title="🎯 Application / Purpose">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.applicationPurpose}
              </div>
            </Accordion>
          )}

          {hasValue(product.inclusionRate) && (
            <Accordion title="📋 Recommended Inclusion Rate">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.inclusionRate}
              </div>
            </Accordion>
          )}

          {hasValue(product.physicalForm) && (
            <Accordion title="🔬 Physical Form">
              {product.physicalForm}
            </Accordion>
          )}

          {hasValue(product.countryOfOrigin) && (
            <Accordion title="🌍 Country of Origin">
              <div className="break-words text-sm sm:text-base text-slate-700">
                {product.countryOfOrigin}
              </div>
            </Accordion>
          )}

          {hasValue(product.shelfLife) && (
            <Accordion title="📦 Shelf Life / Best Before">
              {product.shelfLife}
            </Accordion>
          )}

          {hasValue(product.storageConditions) && (
            <Accordion title="🗄️ Storage Conditions">
              <div className="whitespace-pre-line break-words leading-6 sm:leading-7 text-sm sm:text-base text-slate-700">
                {product.storageConditions}
              </div>
            </Accordion>
          )}
        </>
      )}

    </div>
  );
}