"use client";

type Props = {
    // =========================
    // TEST IDENTITY
    // =========================
    testName: string;
    setTestName: (value: string) => void;

    shortName: string;
    setShortName: (value: string) => void;

    testCategory: string;
    setTestCategory: (value: string) => void;

    testCode: string;
    setTestCode: (value: string) => void;

    clinicalSpecialty: string;
    setClinicalSpecialty: (value: string) => void;

    targetDiseaseCondition: string;
    setTargetDiseaseCondition: (value: string) => void;

    // =========================
    // SPECIMEN & COLLECTION
    // =========================
    sampleType: string;
    setSampleType: (value: string) => void;

    preparation: string;
    setPreparation: (value: string) => void;

    specimen: string;
    setSpecimen: (value: string) => void;

    sampleVolume: string;
    setSampleVolume: (value: string) => void;

    sampleCollectionInstructions: string;
    setSampleCollectionInstructions: (value: string) => void;

    sampleStabilityHandling: string;
    setSampleStabilityHandling: (value: string) => void;

    fastingRequirement: string;
    setFastingRequirement: (value: string) => void;

    // =========================
    // METHODOLOGY
    // =========================
    testMethod: string;
    setTestMethod: (value: string) => void;

    testPrinciple: string;
    setTestPrinciple: (value: string) => void;

    testingPlatformAnalyzer: string;
    setTestingPlatformAnalyzer: (value: string) => void;

    referenceRangeCutoff: string;
    setReferenceRangeCutoff: (value: string) => void;

    unit: string;
    setUnit: (value: string) => void;

    resultType: string;
    setResultType: (value: string) => void;

    // =========================
    // SERVICE
    // =========================
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

    // =========================
    // PARTNER LABORATORY
    // =========================
    partnerLaboratory: string;
    setPartnerLaboratory: (value: string) => void;

    branchLocation: string;
    setBranchLocation: (value: string) => void;

    partnerLabTestCode: string;
    setPartnerLabTestCode: (value: string) => void;

    // =========================
    // COMMERCIAL
    // =========================
    partnerLabPrice: string;
    setPartnerLabPrice: (value: string) => void;

    sebaloySellingPrice: string;
    setSebaloySellingPrice: (value: string) => void;

    homeCollectionCharge: string;
    setHomeCollectionCharge: (value: string) => void;

    discountPromotionalPrice: string;
    setDiscountPromotionalPrice: (value: string) => void;

    // =========================
    // CLINICAL INFORMATION
    // =========================
    whyThisTest: string;
    setWhyThisTest: (value: string) => void;

    whenRecommended: string;
    setWhenRecommended: (value: string) => void;

    clinicalSignificance: string;
    setClinicalSignificance: (value: string) => void;

    sampleRequirements: string;
    setSampleRequirements: (value: string) => void;
};

export default function LabTestFields({
    testName,
    setTestName,

    shortName,
    setShortName,

    testCategory,
    setTestCategory,

    testCode,
    setTestCode,

    clinicalSpecialty,
    setClinicalSpecialty,

    targetDiseaseCondition,
    setTargetDiseaseCondition,

    sampleType,
    setSampleType,

    preparation,
    setPreparation,

    specimen,
    setSpecimen,

    sampleVolume,
    setSampleVolume,

    sampleCollectionInstructions,
    setSampleCollectionInstructions,

    sampleStabilityHandling,
    setSampleStabilityHandling,

    fastingRequirement,
    setFastingRequirement,

    testMethod,
    setTestMethod,

    testPrinciple,
    setTestPrinciple,

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
}: Props) {
    const inputClass =
        "w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

    const labelClass =
        "block text-sm font-medium text-slate-700 mb-1";

    return (
        <div className="mt-6 space-y-8">

            {/* =========================
          TEST IDENTITY
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    🧪 Test Identity
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>Test Name</label>
                        <input
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Complete Blood Count"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Short Name</label>
                        <input
                            value={shortName}
                            onChange={(e) => setShortName(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. CBC"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Test Category</label>
                        <input
                            value={testCategory}
                            onChange={(e) => setTestCategory(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Hematology"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Test Code</label>
                        <input
                            value={testCode}
                            onChange={(e) => setTestCode(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. CBC-001"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Clinical Specialty</label>
                        <input
                            value={clinicalSpecialty}
                            onChange={(e) =>
                                setClinicalSpecialty(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. Hematology"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Target Disease / Condition
                        </label>
                        <input
                            value={targetDiseaseCondition}
                            onChange={(e) =>
                                setTargetDiseaseCondition(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. Anemia"
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          SPECIMEN & COLLECTION
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    🩸 Specimen & Collection
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>Sample Type</label>
                        <input
                            value={sampleType}
                            onChange={(e) => setSampleType(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Blood"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Preparation</label>
                        <input
                            value={preparation}
                            onChange={(e) => setPreparation(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. No special preparation required"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Specimen</label>
                        <input
                            value={specimen}
                            onChange={(e) => setSpecimen(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. EDTA Whole Blood"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Sample Volume</label>
                        <input
                            value={sampleVolume}
                            onChange={(e) => setSampleVolume(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. 2 mL"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Fasting Requirement
                        </label>
                        <input
                            value={fastingRequirement}
                            onChange={(e) =>
                                setFastingRequirement(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. Not Required"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Sample Collection Instructions
                        </label>
                        <textarea
                            value={sampleCollectionInstructions}
                            onChange={(e) =>
                                setSampleCollectionInstructions(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Sample Stability / Handling
                        </label>
                        <textarea
                            value={sampleStabilityHandling}
                            onChange={(e) =>
                                setSampleStabilityHandling(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          METHODOLOGY
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    🔬 Methodology
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>Test Method</label>
                        <input
                            value={testMethod}
                            onChange={(e) => setTestMethod(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. CLIA"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Test Principle</label>
                        <input
                            value={testPrinciple}
                            onChange={(e) =>
                                setTestPrinciple(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. Chemiluminescence"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Testing Platform / Analyzer
                        </label>
                        <input
                            value={testingPlatformAnalyzer}
                            onChange={(e) =>
                                setTestingPlatformAnalyzer(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. Liaison XL"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Reference Range / Cut-off
                        </label>
                        <input
                            value={referenceRangeCutoff}
                            onChange={(e) =>
                                setReferenceRangeCutoff(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Unit</label>
                        <input
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. mg/dL"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Result Type</label>
                        <input
                            value={resultType}
                            onChange={(e) => setResultType(e.target.value)}
                            className={inputClass}
                            placeholder="e.g. Numeric / Positive-Negative"
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          SERVICE
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    🏥 Service
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>
                            Turnaround Time (TAT)
                        </label>
                        <input
                            value={turnaroundTime}
                            onChange={(e) =>
                                setTurnaroundTime(e.target.value)
                            }
                            className={inputClass}
                            placeholder="e.g. 4 Hours"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Home Sample Collection
                        </label>
                        <input
                            value={homeSampleCollection}
                            onChange={(e) =>
                                setHomeSampleCollection(e.target.value)
                            }
                            className={inputClass}
                            placeholder="Available / Not Available"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Sample Collection Schedule
                        </label>
                        <input
                            value={sampleCollectionSchedule}
                            onChange={(e) =>
                                setSampleCollectionSchedule(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Report Delivery
                        </label>
                        <input
                            value={reportDelivery}
                            onChange={(e) =>
                                setReportDelivery(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Special Instructions
                        </label>
                        <textarea
                            value={specialInstructions}
                            onChange={(e) =>
                                setSpecialInstructions(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          PARTNER LABORATORY
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    🏢 Partner Laboratory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>
                            Partner Laboratory
                        </label>
                        <input
                            value={partnerLaboratory}
                            onChange={(e) =>
                                setPartnerLaboratory(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Branch / Location
                        </label>
                        <input
                            value={branchLocation}
                            onChange={(e) =>
                                setBranchLocation(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Partner Lab Test Code
                        </label>
                        <input
                            value={partnerLabTestCode}
                            onChange={(e) =>
                                setPartnerLabTestCode(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          COMMERCIAL
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    💰 Commercial
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className={labelClass}>
                            Partner Lab Price
                        </label>
                        <input
                            type="number"
                            value={partnerLabPrice}
                            onChange={(e) =>
                                setPartnerLabPrice(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Sebaloy Selling Price
                        </label>
                        <input
                            type="number"
                            value={sebaloySellingPrice}
                            onChange={(e) =>
                                setSebaloySellingPrice(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Home Collection Charge
                        </label>
                        <input
                            type="number"
                            value={homeCollectionCharge}
                            onChange={(e) =>
                                setHomeCollectionCharge(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Discount / Promotional Price
                        </label>
                        <input
                            type="number"
                            value={discountPromotionalPrice}
                            onChange={(e) =>
                                setDiscountPromotionalPrice(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>

                </div>
            </section>

            {/* =========================
          CLINICAL INFORMATION
      ========================== */}
            <section>
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    📋 Clinical Information
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className={labelClass}>
                            Why This Test?
                        </label>
                        <textarea
                            value={whyThisTest}
                            onChange={(e) =>
                                setWhyThisTest(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            When is it Recommended?
                        </label>
                        <textarea
                            value={whenRecommended}
                            onChange={(e) =>
                                setWhenRecommended(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Clinical Significance
                        </label>
                        <textarea
                            value={clinicalSignificance}
                            onChange={(e) =>
                                setClinicalSignificance(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Sample Requirements
                        </label>
                        <textarea
                            value={sampleRequirements}
                            onChange={(e) =>
                                setSampleRequirements(e.target.value)
                            }
                            className={inputClass}
                            rows={3}
                        />
                    </div>

                </div>
            </section>

        </div>
    );
}