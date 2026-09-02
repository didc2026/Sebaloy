"use client";

type Props = {
  genericName: string;
  setGenericName: (value: string) => void;

  strength: string;
  setStrength: (value: string) => void;

  size: string;
  setSize: (value: string) => void;
  brand: string;
  setBrand: (value: string) => void;
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

  company: string;
  setCompany: (value: string) => void;

  stripsPerBox: string;
  setStripsPerBox: (value: string) => void;

  tabletsPerStrip: string;
  setTabletsPerStrip: (value: string) => void;
};

export default function MedicineFields({
  genericName,
  setGenericName,
  strength,
  setStrength,
  size,
  setSize,
  brand,
  setBrand,
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
  company,
  setCompany,
  stripsPerBox,
  setStripsPerBox,
  tabletsPerStrip,
  setTabletsPerStrip,
}: Props) {
  return (
    <>
      {/* Generic Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Generic Name
        </label>

        <input
          type="text"
          placeholder="Enter generic name"
          value={genericName}
          onChange={(e) => setGenericName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Strength */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Strength
        </label>

        <input
          type="text"
          placeholder="e.g. 500 mg, 20 mg, 5 ml"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          className="w-full border p-3 rounded"
          required
        />
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Size
        </label>

        <input
          type="text"
          placeholder="e.g. 60 ml, 100 ml"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>
      {/* Brand */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Brand
        </label>

        <input
          type="text"
          placeholder="Enter brand name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Pharmacology */}
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

      {/* Indication */}
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

      {/* Dosage */}
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

      {/* Administration */}
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

      {/* Side Effects */}
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

      {/* Precautions */}
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

      {/* Pregnancy & Lactation */}
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

      {/* Drug Interaction */}
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

      {/* Storage */}
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

      {/* Company */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Company
        </label>

        <input
          type="text"
          placeholder="Enter company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Strips Per Box */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Strips Per Box
        </label>

        <input
          type="number"
          placeholder="e.g. 10"
          value={stripsPerBox}
          onChange={(e) => setStripsPerBox(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Tablets Per Strip */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Tablets Per Strip
        </label>

        <input
          type="number"
          placeholder="e.g. 10"
          value={tabletsPerStrip}
          onChange={(e) => setTabletsPerStrip(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>
    </>
  );
}