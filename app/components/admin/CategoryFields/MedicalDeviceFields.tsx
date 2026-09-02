"use client";

type Props = {
  brand: string;
  setBrand: (value: string) => void;

  company: string;
  setCompany: (value: string) => void;

  productType: string;
  setProductType: (value: string) => void;

  model: string;
  setModel: (value: string) => void;

  size: string;
  setSize: (value: string) => void;

  warranty: string;
  setWarranty: (value: string) => void;

  countryOfOrigin: string;
  setCountryOfOrigin: (value: string) => void;

  specifications: string;
  setSpecifications: (value: string) => void;

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
};

export default function MedicalDeviceFields({
  brand,
  setBrand,
  company,
  setCompany,
  productType,
  setProductType,
  model,
  setModel,
  size,
  setSize,
  warranty,
  setWarranty,
  countryOfOrigin,
  setCountryOfOrigin,
  specifications,
  setSpecifications,

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
}: Props) {
  return (
    <div className="md:col-span-2 mt-6 space-y-8">

      {/* =========================
          BASIC MEDICAL DEVICE INFORMATION
      ========================== */}

      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">🩺</span>

          <h2 className="text-xl font-semibold text-slate-800">
            Medical Device Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* BRAND */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Brand
            </label>

            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Omron, Roche, Abbott"
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
              placeholder="e.g. Roche Diagnostics"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* PRODUCT TYPE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Type
            </label>

            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              placeholder="e.g. Blood Pressure Monitor, IVD Reagent Kit"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* MODEL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Model
            </label>

            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. HEM-7120"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* SIZE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Size / Pack Size
            </label>

            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. Adult, 22–42 cm / 100 Tests"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* WARRANTY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Warranty
            </label>

            <input
              type="text"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g. 1 Year"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Country of Origin
            </label>

            <input
              type="text"
              value={countryOfOrigin}
              onChange={(e) => setCountryOfOrigin(e.target.value)}
              placeholder="e.g. Japan, Germany, USA"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

        </div>
      </div>


      {/* =========================
          IVD / DIAGNOSTIC PRODUCT
      ========================== */}

      <div className="border-t pt-7">

        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">🧪</span>

          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              IVD / Diagnostic Product Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Complete only the fields applicable to the IVD product.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* KIT TYPE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Kit Type
            </label>

            <input
              type="text"
              value={kitType}
              onChange={(e) => setKitType(e.target.value)}
              placeholder="e.g. Reagent Kit, Rapid Test Kit"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* NUMBER OF TESTS */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Tests
            </label>

            <input
              type="text"
              value={numberOfTests}
              onChange={(e) => setNumberOfTests(e.target.value)}
              placeholder="e.g. 100 Tests"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* REAGENT COMPONENTS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reagent Components
            </label>

            <textarea
              value={reagentComponents}
              onChange={(e) => setReagentComponents(e.target.value)}
              placeholder="Enter reagent components"
              rows={3}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
            />
          </div>

          {/* CALIBRATOR / CONTROL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Calibrator / Control
            </label>

            <textarea
              value={calibratorControl}
              onChange={(e) => setCalibratorControl(e.target.value)}
              placeholder="e.g. Calibrator included, 2-level control included"
              rows={3}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-y"
            />
          </div>

          {/* ANALYTICAL SENSITIVITY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Analytical Sensitivity
            </label>

            <input
              type="text"
              value={analyticalSensitivity}
              onChange={(e) => setAnalyticalSensitivity(e.target.value)}
              placeholder="Enter analytical sensitivity"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* ANALYTICAL SPECIFICITY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Analytical Specificity
            </label>

            <input
              type="text"
              value={analyticalSpecificity}
              onChange={(e) => setAnalyticalSpecificity(e.target.value)}
              placeholder="Enter analytical specificity"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* DETECTION / MEASURING RANGE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Detection / Measuring Range
            </label>

            <input
              type="text"
              value={detectionRange}
              onChange={(e) => setDetectionRange(e.target.value)}
              placeholder="e.g. 0.1–1000 IU/mL"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* CE / IVDR */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              CE / IVDR Status
            </label>

            <input
              type="text"
              value={ceIvdrStatus}
              onChange={(e) => setCeIvdrStatus(e.target.value)}
              placeholder="e.g. CE-IVD / IVDR Certified"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* IVD CLASSIFICATION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              IVD Classification
            </label>

            <input
              type="text"
              value={ivdClassification}
              onChange={(e) => setIvdClassification(e.target.value)}
              placeholder="e.g. Class B / Class C"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

          {/* INSTRUMENT COMPATIBILITY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Instrument / Analyzer Compatibility
            </label>

            <input
              type="text"
              value={instrumentCompatibility}
              onChange={(e) => setInstrumentCompatibility(e.target.value)}
              placeholder="e.g. Cobas e411, Architect i2000"
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />
          </div>

        </div>
      </div>


      {/* =========================
          SPECIFICATIONS
      ========================== */}

      <div className="border-t pt-7">

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
  );
}