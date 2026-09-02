"use client";

import MedicineFields from "@/app/components/admin/CategoryFields/MedicineFields";
import BabyMomFields from "@/app/components/admin/CategoryFields/BabyMomFields";
import HealthcareFields from "@/app/components/admin/CategoryFields/HealthcareFields";
import PersonalCareFields from "@/app/components/admin/CategoryFields/PersonalCareFields";
import MedicalDeviceFields from "./CategoryFields/MedicalDeviceFields";
import LabTestFields from "./CategoryFields/LabTestFields";
import AnimalFeedAdditives from "./CategoryFields/AnimalFeedAdditives";

type Props = {
  editingId: string;

  name: string;
  setName: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  stock: string;
  setStock: (value: string) => void;

  company: string;
  setCompany: (value: string) => void;

  genericName: string;
  setGenericName: (value: string) => void;

  strength: string;
  setStrength: (value: string) => void;
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

  size: string;
  setSize: (value: string) => void;

  brand: string;
  setBrand: (value: string) => void;

  model: string;
  setModel: (value: string) => void;

  warranty: string;
  setWarranty: (value: string) => void;

  kitType: string;
  setKitType: (value: string) => void;

  numberOfTests: string;
  setNumberOfTests: (value: string) => void;

  reagentComponents: string;
  setReagentComponents: (value: string) => void;

  calibratorControl: string;
  setCalibratorControl: (value: string) => void;

  analyticalSensitivity: string;
  setAnalyticalSensitivity: (value: string) => void;

  analyticalSpecificity: string;
  setAnalyticalSpecificity: (value: string) => void;

  detectionRange: string;
  setDetectionRange: (value: string) => void;

  ceIvdrStatus: string;
  setCeIvdrStatus: (value: string) => void;

  ivdClassification: string;
  setIvdClassification: (value: string) => void;

  instrumentCompatibility: string;
  setInstrumentCompatibility: (value: string) => void;

  stripsPerBox: string;
  setStripsPerBox: (value: string) => void;

  tabletsPerStrip: string;
  setTabletsPerStrip: (value: string) => void;

  unitType: string;
  setUnitType: (value: string) => void;

  discount: string;
  setDiscount: (value: string) => void;

  featured: boolean;
  setFeatured: (value: boolean) => void;

  imageUrl: string;
  setImageUrl: (value: string) => void;

  imageFile: File | null;
  setImageFile: (value: File | null) => void;

  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;

  existingImages: string[];

  description: string;
  setDescription: (value: string) => void;

  features: string;
  setFeatures: (value: string) => void;

  specifications: string;
  setSpecifications: (value: string) => void;

  testCategory: string;
  setTestCategory: (value: string) => void;

  sampleType: string;
  setSampleType: (value: string) => void;

  specimen: string;
  setSpecimen: (value: string) => void;

  sampleVolume: string;
  setSampleVolume: (value: string) => void;

  testMethod: string;
  setTestMethod: (value: string) => void;

  testPrinciple: string;
  setTestPrinciple: (value: string) => void;

  testName: string;
  setTestName: (value: string) => void;

  shortName: string;
  setShortName: (value: string) => void;

  testCode: string;
  setTestCode: (value: string) => void;

  clinicalSpecialty: string;
  setClinicalSpecialty: (value: string) => void;

  targetDiseaseCondition: string;
  setTargetDiseaseCondition: (value: string) => void;

  sampleCollectionInstructions: string;
  setSampleCollectionInstructions: (value: string) => void;

  sampleStabilityHandling: string;
  setSampleStabilityHandling: (value: string) => void;

  fastingRequirement: string;
  setFastingRequirement: (value: string) => void;

  testingPlatformAnalyzer: string;
  setTestingPlatformAnalyzer: (value: string) => void;

  referenceRangeCutoff: string;
  setReferenceRangeCutoff: (value: string) => void;

  unit: string;
  setUnit: (value: string) => void;

  resultType: string;
  setResultType: (value: string) => void;

  turnaroundTime: string;
  setTurnaroundTime: (value: string) => void;

  homeSampleCollection: string;
  setHomeSampleCollection: (value: string) => void;

  sampleCollectionSchedule: string;
  setSampleCollectionSchedule: (value: string) => void;

  specialInstructions: string;
  setSpecialInstructions: (value: string) => void;

  reportDelivery: string;
  setReportDelivery: (value: string) => void;

  partnerLaboratory: string;
  setPartnerLaboratory: (value: string) => void;

  branchLocation: string;
  setBranchLocation: (value: string) => void;

  partnerLabTestCode: string;
  setPartnerLabTestCode: (value: string) => void;

  partnerLabPrice: string;
  setPartnerLabPrice: (value: string) => void;

  sebaloySellingPrice: string;
  setSebaloySellingPrice: (value: string) => void;

  homeCollectionCharge: string;
  setHomeCollectionCharge: (value: string) => void;

  discountPromotionalPrice: string;
  setDiscountPromotionalPrice: (value: string) => void;

  whyThisTest: string;
  setWhyThisTest: (value: string) => void;

  whenRecommended: string;
  setWhenRecommended: (value: string) => void;

  clinicalSignificance: string;
  setClinicalSignificance: (value: string) => void;

  sampleRequirements: string;
  setSampleRequirements: (value: string) => void;
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

  storageConditions: string;
  setStorageConditions: (value: string) => void;

  pharmacology: string;
  setPharmacology: (value: string) => void;

  indication: string;
  setIndication: (value: string) => void;

  dosage: string;
  setDosage: (value: string) => void;

  administration: string;
  setAdministration: (value: string) => void;

  sideEffects: string;
  setSideEffects: (value: string) => void;

  precautions: string;
  setPrecautions: (value: string) => void;

  pregnancyLactation: string;
  setPregnancyLactation: (value: string) => void;

  drugInteraction: string;
  setDrugInteraction: (value: string) => void;

  storageInfo: string;
  setStorageInfo: (value: string) => void;

  categories: any[];
  selectedCategory: any;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddProductForm({
  editingId,

  name,
  setName,

  category,
  setCategory,

  price,
  setPrice,

  stock,
  setStock,

  company,
  setCompany,

  genericName,
  setGenericName,

  strength,
  setStrength,

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

  size,
  setSize,
  brand,
  setBrand,

  model,
  setModel,

  warranty,
  setWarranty,
  kitType,
  setKitType,

  numberOfTests,
  setNumberOfTests,

  reagentComponents,
  setReagentComponents,

  calibratorControl,
  setCalibratorControl,

  analyticalSensitivity,
  setAnalyticalSensitivity,

  analyticalSpecificity,
  setAnalyticalSpecificity,

  detectionRange,
  setDetectionRange,

  ceIvdrStatus,
  setCeIvdrStatus,

  ivdClassification,
  setIvdClassification,

  instrumentCompatibility,
  setInstrumentCompatibility,

  stripsPerBox,
  setStripsPerBox,

  tabletsPerStrip,
  setTabletsPerStrip,

  unitType,
  setUnitType,

  discount,
  setDiscount,

  featured,
  setFeatured,

  imageUrl,
  setImageUrl,

  imageFile,
  setImageFile,

  imageFiles,
  setImageFiles,

  existingImages,

  description,
  setDescription,

  features,
  setFeatures,

  specifications,
  setSpecifications,

  testCategory,
  setTestCategory,

  sampleType,
  setSampleType,

  specimen,
  setSpecimen,

  sampleVolume,
  setSampleVolume,

  testMethod,
  setTestMethod,

  testPrinciple,
  setTestPrinciple,
  testName,
  setTestName,

  shortName,
  setShortName,

  testCode,
  setTestCode,

  clinicalSpecialty,
  setClinicalSpecialty,

  targetDiseaseCondition,
  setTargetDiseaseCondition,

  sampleCollectionInstructions,
  setSampleCollectionInstructions,

  sampleStabilityHandling,
  setSampleStabilityHandling,

  fastingRequirement,
  setFastingRequirement,

  testingPlatformAnalyzer,
  setTestingPlatformAnalyzer,

  referenceRangeCutoff,
  setReferenceRangeCutoff,

  unit,
  setUnit,

  resultType,
  setResultType,

  turnaroundTime,
  setTurnaroundTime,

  homeSampleCollection,
  setHomeSampleCollection,

  sampleCollectionSchedule,
  setSampleCollectionSchedule,

  specialInstructions,
  setSpecialInstructions,

  reportDelivery,
  setReportDelivery,

  partnerLaboratory,
  setPartnerLaboratory,

  branchLocation,
  setBranchLocation,

  partnerLabTestCode,
  setPartnerLabTestCode,

  partnerLabPrice,
  setPartnerLabPrice,

  sebaloySellingPrice,
  setSebaloySellingPrice,

  homeCollectionCharge,
  setHomeCollectionCharge,

  discountPromotionalPrice,
  setDiscountPromotionalPrice,

  whyThisTest,
  setWhyThisTest,

  whenRecommended,
  setWhenRecommended,

  clinicalSignificance,
  setClinicalSignificance,

  sampleRequirements,
  setSampleRequirements,

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

  storageConditions,
  setStorageConditions,

  pharmacology,
  setPharmacology,

  indication,
  setIndication,

  dosage,
  setDosage,

  administration,
  setAdministration,

  sideEffects,
  setSideEffects,

  precautions,
  setPrecautions,

  pregnancyLactation,
  setPregnancyLactation,

  drugInteraction,
  setDrugInteraction,

  storageInfo,
  setStorageInfo,

  categories,
  selectedCategory,

  onSubmit,
}: Props) {

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = e.target.value;

    setCategory(newCategory);
  };
  const normalizedCategory = category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const isLabTest =
    normalizedCategory === "lab-test" ||
    normalizedCategory === "lab-tests";
    console.log("ADD PRODUCT FORM COMPONENT IS RENDERING");
  return (

    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8"
    >

      {/* =========================
          FORM HEADER
      ========================== */}

      <h2 className="text-2xl font-semibold mb-6">
        {editingId ? "Edit Product" : "Add Product"}
      </h2>

      {/* =========================
          BASIC PRODUCT INFORMATION
      ========================== */}
      <div className="text-red-600 font-bold mb-2">
        DEBUG CATEGORY: {category}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Name - Hidden for Lab Tests */}
        {category !== "lab-tests" && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
              required
            />
          </div>
        )}
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>

          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
            required
          >
            <option value="">Select Category</option>

            {categories
              .filter((cat: any) => cat.status === true)
              .sort(
                (a: any, b: any) =>
                  (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              )
              .map((cat: any) => (
                <option
                  key={cat.id}
                  value={cat.name}
                >
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Company
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

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

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            min="0"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
            required
          />
        </div>

        {/* <div className="md:col-span-2 mt-6"> */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock"
            min="0"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
            required
          />
        </div>

        {/* Unit Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Selling Unit
          </label>

          <select
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          >
            <option value="">Select Selling Unit</option>

            {selectedCategory?.unitTypes?.map(
              (unit: string) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              )
            )}
          </select>
        </div>

        {/* Discount */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Discount %
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Discount %"
            min="0"
            className="w-full border border-slate-300 rounded-xl px-4 py-3"
          />
        </div>

      </div>

      {/* =========================
          DESCRIPTION
      ========================== */}

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={5}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />
      </div>

      {/* =========================
          FEATURES
      ========================== */}

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Features
        </label>

        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Enter product features"
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />
      </div>

      {/* =========================
          SPECIFICATIONS
      ========================== */}

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Specifications
        </label>

        <textarea
          value={specifications}
          onChange={(e) =>
            setSpecifications(e.target.value)
          }
          placeholder="Enter product specifications"
          rows={4}
          className="w-full border border-slate-300 rounded-xl px-4 py-3"
        />
      </div>

      {/* =========================
          MEDICINE
      ========================== */}

      {category === "Medicine" && (
        <div className="mt-6">
          <MedicineFields
            genericName={genericName}
            setGenericName={setGenericName}

            strength={strength}
            setStrength={setStrength}

            size={size}
            setSize={setSize}
            brand={brand}
            setBrand={setBrand}
            pharmacology={pharmacology}
            setPharmacology={setPharmacology}
            indication={indication}
            setIndication={setIndication}
            dosage={dosage}
            setDosage={setDosage}
            administration={administration}
            setAdministration={setAdministration}
            sideEffects={sideEffects}
            setSideEffects={setSideEffects}
            precautions={precautions}
            setPrecautions={setPrecautions}
            pregnancyLactation={pregnancyLactation}
            setPregnancyLactation={setPregnancyLactation}
            drugInteraction={drugInteraction}
            setDrugInteraction={setDrugInteraction}
            storageInfo={storageInfo}
            setStorageInfo={setStorageInfo}
            company={company}
            setCompany={setCompany}
            stripsPerBox={stripsPerBox}
            setStripsPerBox={setStripsPerBox}
            tabletsPerStrip={tabletsPerStrip}
            setTabletsPerStrip={setTabletsPerStrip}
          />
        </div>
      )}

      {/* =========================
          BABY & MOM CARE
      ========================== */}

      {category === "Baby & Mom Care" && (
        <div className="mt-6">
          <BabyMomFields
            brand={brand}
            setBrand={setBrand}
            size={size}
            setSize={setSize}
            strength={strength}
            setStrength={setStrength}
            company={company}
            setCompany={setCompany}
          />
        </div>
      )}

      {/* =========================
          HEALTHCARE
      ========================== */}

      {category === "Healthcare" && (
        <div className="mt-6">
          <HealthcareFields
            brand={brand}
            setBrand={setBrand}
            size={size}
            setSize={setSize}
            strength={strength}
            setStrength={setStrength}
            company={company}
            setCompany={setCompany}
          />
        </div>
      )}

      {/* =========================
    PERSONAL CARE
========================= */}
      {category === "Personal Care" && (
        <div className="mt-6">
          <PersonalCareFields
            brand={brand}
            setBrand={setBrand}

            size={size}
            setSize={setSize}

            strength={strength}
            setStrength={setStrength}

            company={company}
            setCompany={setCompany}

            productType={productType}
            setProductType={setProductType}

            keyIngredients={keyIngredients}
            setKeyIngredients={setKeyIngredients}

            skinHairType={skinHairType}
            setSkinHairType={setSkinHairType}

            countryOfOrigin={countryOfOrigin}
            setCountryOfOrigin={setCountryOfOrigin}

            benefits={benefits}
            setBenefits={setBenefits}

            howToUse={howToUse}
            setHowToUse={setHowToUse}

            ingredients={ingredients}
            setIngredients={setIngredients}

            shelfLife={shelfLife}
            setShelfLife={setShelfLife}
          />
        </div>
      )}
      {/* =========================
          MEDICAL DEVICE
      ========================== */}

      {category === "Medical Devices" && (
        <MedicalDeviceFields
          brand={brand}
          setBrand={setBrand}

          company={company}
          setCompany={setCompany}

          productType={productType}
          setProductType={setProductType}

          model={model}
          setModel={setModel}

          size={size}
          setSize={setSize}

          warranty={warranty}
          setWarranty={setWarranty}

          countryOfOrigin={countryOfOrigin}
          setCountryOfOrigin={setCountryOfOrigin}

          specifications={specifications}
          setSpecifications={setSpecifications}

          kitType={kitType}
          setKitType={setKitType}

          numberOfTests={numberOfTests}
          setNumberOfTests={setNumberOfTests}

          reagentComponents={reagentComponents}
          setReagentComponents={setReagentComponents}

          calibratorControl={calibratorControl}
          setCalibratorControl={setCalibratorControl}

          analyticalSensitivity={analyticalSensitivity}
          setAnalyticalSensitivity={setAnalyticalSensitivity}

          analyticalSpecificity={analyticalSpecificity}
          setAnalyticalSpecificity={setAnalyticalSpecificity}

          detectionRange={detectionRange}
          setDetectionRange={setDetectionRange}

          ceIvdrStatus={ceIvdrStatus}
          setCeIvdrStatus={setCeIvdrStatus}

          ivdClassification={ivdClassification}
          setIvdClassification={setIvdClassification}

          instrumentCompatibility={instrumentCompatibility}
          setInstrumentCompatibility={setInstrumentCompatibility}
        />
      )}
      {/* =========================
    LAB TEST / DIAGNOSTIC SERVICE
========================= */}
      {category === "Lab Test" && (
        <LabTestFields
          testName={testName}
          setTestName={setTestName}

          shortName={shortName}
          setShortName={setShortName}

          testCategory={testCategory}
          setTestCategory={setTestCategory}

          testCode={testCode}
          setTestCode={setTestCode}

          clinicalSpecialty={clinicalSpecialty}
          setClinicalSpecialty={setClinicalSpecialty}

          targetDiseaseCondition={targetDiseaseCondition}
          setTargetDiseaseCondition={setTargetDiseaseCondition}

          sampleType={sampleType}
          setSampleType={setSampleType}

          specimen={specimen}
          setSpecimen={setSpecimen}

          sampleVolume={sampleVolume}
          setSampleVolume={setSampleVolume}

          sampleCollectionInstructions={sampleCollectionInstructions}
          setSampleCollectionInstructions={setSampleCollectionInstructions}

          sampleStabilityHandling={sampleStabilityHandling}
          setSampleStabilityHandling={setSampleStabilityHandling}

          fastingRequirement={fastingRequirement}
          setFastingRequirement={setFastingRequirement}

          testMethod={testMethod}
          setTestMethod={setTestMethod}

          testPrinciple={testPrinciple}
          setTestPrinciple={setTestPrinciple}

          testingPlatformAnalyzer={testingPlatformAnalyzer}
          setTestingPlatformAnalyzer={setTestingPlatformAnalyzer}

          referenceRangeCutoff={referenceRangeCutoff}
          setReferenceRangeCutoff={setReferenceRangeCutoff}

          unit={unit}
          setUnit={setUnit}

          resultType={resultType}
          setResultType={setResultType}

          turnaroundTime={turnaroundTime}
          setTurnaroundTime={setTurnaroundTime}

          homeSampleCollection={homeSampleCollection}
          setHomeSampleCollection={setHomeSampleCollection}

          sampleCollectionSchedule={sampleCollectionSchedule}
          setSampleCollectionSchedule={setSampleCollectionSchedule}

          specialInstructions={specialInstructions}
          setSpecialInstructions={setSpecialInstructions}

          reportDelivery={reportDelivery}
          setReportDelivery={setReportDelivery}

          partnerLaboratory={partnerLaboratory}
          setPartnerLaboratory={setPartnerLaboratory}

          branchLocation={branchLocation}
          setBranchLocation={setBranchLocation}

          partnerLabTestCode={partnerLabTestCode}
          setPartnerLabTestCode={setPartnerLabTestCode}

          partnerLabPrice={partnerLabPrice}
          setPartnerLabPrice={setPartnerLabPrice}

          sebaloySellingPrice={sebaloySellingPrice}
          setSebaloySellingPrice={setSebaloySellingPrice}

          homeCollectionCharge={homeCollectionCharge}
          setHomeCollectionCharge={setHomeCollectionCharge}

          discountPromotionalPrice={discountPromotionalPrice}
          setDiscountPromotionalPrice={setDiscountPromotionalPrice}

          whyThisTest={whyThisTest}
          setWhyThisTest={setWhyThisTest}

          whenRecommended={whenRecommended}
          setWhenRecommended={setWhenRecommended}

          clinicalSignificance={clinicalSignificance}
          setClinicalSignificance={setClinicalSignificance}

          sampleRequirements={sampleRequirements}
          setSampleRequirements={setSampleRequirements}
        />
      )}      {/* =========================
          ANIMAL FEED ADDITIVES
      ========================== */}

      {category === "Animal Feed Additives" && (
        <AnimalFeedAdditives
          brand={brand}
          setBrand={setBrand}

          company={company}
          setCompany={setCompany}

          productType={productType}
          setProductType={setProductType}

          size={size}
          setSize={setSize}

          activeIngredient={activeIngredient}
          setActiveIngredient={setActiveIngredient}

          activeContent={activeContent}
          setActiveContent={setActiveContent}

          casNumber={casNumber}
          setCasNumber={setCasNumber}

          chemicalFormula={chemicalFormula}
          setChemicalFormula={setChemicalFormula}

          targetAnimal={targetAnimal}
          setTargetAnimal={setTargetAnimal}

          applicationPurpose={applicationPurpose}
          setApplicationPurpose={setApplicationPurpose}

          inclusionRate={inclusionRate}
          setInclusionRate={setInclusionRate}

          physicalForm={physicalForm}
          setPhysicalForm={setPhysicalForm}

          countryOfOrigin={countryOfOrigin}
          setCountryOfOrigin={setCountryOfOrigin}

          shelfLife={shelfLife}
          setShelfLife={setShelfLife}

          storageConditions={storageConditions}
          setStorageConditions={setStorageConditions}

          specifications={specifications}
          setSpecifications={setSpecifications}
        />
      )}
      {/* =========================
          FEATURED
      ========================== */}

      <div className="mt-6 flex items-center gap-3">

        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(e.target.checked)
          }
          className="w-5 h-5"
        />

        <label
          htmlFor="featured"
          className="font-medium"
        >
          ⭐ Featured Product
        </label>

      </div>

      {/* =========================
          IMAGE URL
      ========================== */}

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Image URL
        </label>

        <input
          type="text"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
          placeholder="Optional image URL"
          className="w-full border rounded-xl p-3"
        />

      </div>

      {/* =========================
          MAIN IMAGE
      ========================== */}

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Main Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImageFile(
              e.target.files?.[0] || null
            );
          }}
          className="w-full border rounded-xl p-3"
        />

        {imageFile && (
          <p className="text-sm text-slate-500 mt-2">
            Selected: {imageFile.name}
          </p>
        )}

      </div>

      {/* =========================
          MULTIPLE ADDITIONAL IMAGES
      ========================== */}

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Additional Product Images
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {

            const newFiles = Array.from(
              e.target.files || []
            );

            setImageFiles((prev) => [
              ...prev,
              ...newFiles,
            ]);

            e.target.value = "";
          }}
          className="w-full border rounded-xl p-3"
        />

        {imageFiles.length > 0 && (
          <p className="text-sm text-slate-500 mt-2">
            {imageFiles.length} additional image
            {imageFiles.length > 1 ? "s" : ""}
            {" "}selected
          </p>
        )}

      </div>

      {/* =========================
          EXISTING IMAGES
      ========================== */}

      {editingId &&
        existingImages.length > 0 && (
          <div className="mt-6">

            <p className="text-sm font-medium text-slate-700 mb-3">
              Existing Product Images
            </p>

            <div className="flex gap-3 flex-wrap">

              {existingImages.map(
                (img, index) => (
                  <div
                    key={`${img}-${index}`}
                    className="w-20 h-20 border rounded-lg p-1 bg-white"
                  >
                    <img
                      src={img}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )
              )}

            </div>

          </div>
        )}

      {/* =========================
          SUBMIT
      ========================== */}

      <button
        type="submit"
        className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-colors"
      >
        {editingId
          ? "Update Product"
          : "Add Product"}
      </button>

    </form>
  );
}