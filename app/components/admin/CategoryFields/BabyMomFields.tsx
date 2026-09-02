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
};

export default function BabyMomFields({
  brand,
  setBrand,
  size,
  setSize,
  strength,
  setStrength,
  company,
  setCompany,
}: Props) {
  return (
    <>
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

      {/* Size */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Size
        </label>

        <input
          type="text"
          placeholder="e.g. 200 ml, 500 g, 1 Pack"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Strength */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Strength / Specification
        </label>

        <input
          type="text"
          placeholder="Enter strength or specification"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Company
        </label>

        <input
          type="text"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>
    </>
  );
}