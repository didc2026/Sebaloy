"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductGallery from "../../components/ProductGallery";
import PriceCard from "../../components/PriceCard";
import ProductInfo from "../../components/ProductInfo";
import DeliveryCard from "../../components/DeliveryCard";
import AlternativeBrands from "@/app/components/AlternativeBrands";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useCart } from "@/app/context/CartContext";
import Accordion from "../../components/Accordion";

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = decodeURIComponent(params.id as string);

  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [alternativeProducts, setAlternativeProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const data: any = {
          id: docSnap.id,
          ...docSnap.data(),
        };

        setProduct(data);
        if (data.genericName) {
          const allProductsSnapshot = await getDocs(
            collection(db, "products")
          );

          const alternatives = allProductsSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((item: any) => {
              const currentGeneric = String(data.genericName)
                .trim()
                .toLowerCase();

              const itemGeneric = String(item.genericName || "")
                .trim()
                .toLowerCase();

              return (
                itemGeneric === currentGeneric &&
                item.id !== data.id
              );
            });

          console.log("CURRENT GENERIC:", data.genericName);
          console.log("ALTERNATIVE PRODUCTS:", alternatives);

          setAlternativeProducts(alternatives);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;
  return (
    <main className="min-h-screen bg-slate-100 py-3 px-2 sm:py-6">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-3 sm:p-6">
        <div
          className="mb-4 rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white px-3 py-3 sm:px-6 sm:py-4 shadow-sm"        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            ← Back
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">

            <button
              onClick={() => router.push("/")}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>

            <span>›</span>

            <button
              onClick={() => router.push(`/?category=${encodeURIComponent(product.category)}`)}
              className="hover:text-blue-600 transition-colors"
            >
              {product.category}
            </button>

            <span>›</span>

            <span className="font-medium text-slate-700">
              {product.name}
            </span>

          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-start">
          {/* Left Side */}
          <div>
            <ProductGallery
              productName={product.name}
              images={
                product.images && product.images.length > 0
                  ? product.images
                  : [product.imageUrl]
              }
            />

            {/* Desktop: Product Information stays on Left Side */}
            <div className="hidden lg:block">
              <ProductInfo product={product} />
            </div>
            {alternativeProducts.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-5">
                  Alternative Brands
                </h2>

                <div className="space-y-4">
                  {alternativeProducts.map((item) => {
                    const finalPrice = Math.round(
                      item.price -
                      (item.price * (item.discount || 0)) / 100
                    );

                    return (
                      <div
                        key={item.id}
                        onClick={() => router.push(`/product/${item.id}`)}
                        className="flex items-center justify-between border rounded-xl p-4 hover:bg-slate-50 cursor-pointer transition"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-20 h-20 object-contain border rounded-lg p-1"
                          />

                          <div>
                            <h3 className="font-bold">{item.name}</h3>

                            <p className="text-gray-500">
                              {item.company}
                            </p>

                            <p className="text-sm text-gray-400">
                              {item.genericName} {item.strength}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">
                            ৳ {finalPrice}
                          </p>

                          <p className="text-gray-500 text-sm">
                            {item.unitType}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Side */}
          <div>
            <h1 className="text-3xl font-bold leading-tight">
              {product.name}
            </h1>

            <div className="mt-2 space-y-1">
              <p className="text-xl text-gray-600">
                {product.genericName} {product.strength}
              </p>

              {product.size && (
                <p className="text-base text-gray-500">
                  Size: <span className="font-medium text-gray-700">
                    {product.size}
                  </span>
                </p>
              )}

              {product.company && (
                <p className="text-base text-gray-500">
                  Company: <span className="font-medium text-gray-700">
                    {product.company}
                  </span>
                </p>
              )}
              {product.brand && (
                <p className="text-base text-gray-500">
                  Brand: <span className="font-medium text-gray-700">
                    {product.brand}
                  </span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-500">
                4.8 (128 Reviews)
              </span>
            </div>
            {/* =========================
    MEDICAL DEVICE / IVD INFORMATION
========================= */}

            {product.category === "Medical Devices" &&
              [
                product.model,
                product.warranty,
                product.kitType,
                product.numberOfTests,
                product.analyticalSensitivity,
                product.analyticalSpecificity,
                product.detectionRange,
                product.ceIvdrStatus,
                product.ivdClassification,
                product.instrumentCompatibility,
                product.reagentComponents,
                product.calibratorControl,
              ].some((value) => value?.trim()) && (

                <div className="mt-6 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">

                  {/* Section Header */}
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <span className="text-xl">🩺</span>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-slate-800">
                          Medical Device / IVD Information
                        </h2>

                        <p className="text-xs text-slate-500 mt-0.5">
                          Technical specifications and compatibility
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Information */}
                  <div className="p-5">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                      {/* MODEL */}
                      {product.model?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Model
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.model}
                          </p>
                        </div>
                      )}

                      {/* WARRANTY */}
                      {product.warranty?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Warranty
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.warranty}
                          </p>
                        </div>
                      )}

                      {/* KIT TYPE */}
                      {product.kitType?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Kit Type
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.kitType}
                          </p>
                        </div>
                      )}

                      {/* NUMBER OF TESTS */}
                      {product.numberOfTests?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Number of Tests
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.numberOfTests}
                          </p>
                        </div>
                      )}

                      {/* CE / IVDR */}
                      {product.ceIvdrStatus?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            CE / IVDR Status
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.ceIvdrStatus}
                          </p>
                        </div>
                      )}

                      {/* IVD CLASSIFICATION */}
                      {product.ivdClassification?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            IVD Classification
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.ivdClassification}
                          </p>
                        </div>
                      )}

                      {/* ANALYTICAL SENSITIVITY */}
                      {product.analyticalSensitivity?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Analytical Sensitivity
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.analyticalSensitivity}
                          </p>
                        </div>
                      )}

                      {/* ANALYTICAL SPECIFICITY */}
                      {product.analyticalSpecificity?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Analytical Specificity
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.analyticalSpecificity}
                          </p>
                        </div>
                      )}

                      {/* DETECTION RANGE */}
                      {product.detectionRange?.trim() && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Detection / Measuring Range
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.detectionRange}
                          </p>
                        </div>
                      )}

                      {/* INSTRUMENT COMPATIBILITY */}
                      {product.instrumentCompatibility?.trim() && (
                        <div className="md:col-span-2 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Instrument / Analyzer Compatibility
                          </p>
                          <p className="text-sm font-semibold text-slate-800">
                            {product.instrumentCompatibility}
                          </p>
                        </div>
                      )}

                      {/* REAGENT COMPONENTS */}
                      {product.reagentComponents?.trim() && (
                        <div className="md:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Reagent Components
                          </p>
                          <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                            {product.reagentComponents}
                          </p>
                        </div>
                      )}

                      {/* CALIBRATOR / CONTROL */}
                      {product.calibratorControl?.trim() && (
                        <div className="md:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                          <p className="text-xs font-medium text-slate-500 mb-1">
                            Calibrator / Control
                          </p>
                          <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                            {product.calibratorControl}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}
            {/* =========================
    LAB TEST / DIAGNOSTIC SERVICE
========================= */}

            {product.category === "Lab-Tests" && [
              product.testName,
              product.shortName,
              product.testCategory,
              product.testCode,
              product.clinicalSpecialty,
              product.targetDiseaseCondition,
              product.sampleType,
              product.specimen,
              product.sampleVolume,
              product.sampleCollectionInstructions,
              product.sampleStabilityHandling,
              product.fastingRequirement,
              product.testMethod,
              product.testPrinciple,
              product.testingPlatformAnalyzer,
              product.referenceRangeCutoff,
              product.unit,
              product.resultType,
              product.turnaroundTime,
              product.homeSampleCollection,
              product.sampleCollectionSchedule,
              product.specialInstructions,
              product.reportDelivery,
              product.partnerLaboratory,
              product.branchLocation,
              product.partnerLabTestCode,
              product.partnerLabPrice,
              product.sebaloySellingPrice,
              product.homeCollectionCharge,
              product.discountPromotionalPrice,
              product.whyThisTest,
              product.whenRecommended,
              product.clinicalSignificance,
              product.sampleRequirements,
            ].some((value) =>
              value !== undefined &&
              value !== null &&
              String(value).trim() !== ""
            ) && (

                <div className="mt-6 border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">

                  {/* HEADER */}
                  <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <span className="text-xl">🧪</span>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-slate-800">
                          Diagnostic Service Information
                        </h2>

                        <p className="text-xs text-slate-500 mt-0.5">
                          Test, specimen, methodology and service information
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="p-5 space-y-6">

                    {/* =========================
          TEST IDENTITY
      ========================== */}

                    {[
                      product.testName,
                      product.shortName,
                      product.testCategory,
                      product.testCode,
                      product.clinicalSpecialty,
                      product.targetDiseaseCondition,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Test Identity
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {product.testName?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Test Name
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testName}
                                </p>
                              </div>
                            )}

                            {product.shortName?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Short Name
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.shortName}
                                </p>
                              </div>
                            )}

                            {product.testCategory?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Test Category
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testCategory}
                                </p>
                              </div>
                            )}

                            {product.testCode?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Test Code
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testCode}
                                </p>
                              </div>
                            )}

                            {product.clinicalSpecialty?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Clinical Specialty
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.clinicalSpecialty}
                                </p>
                              </div>
                            )}

                            {product.targetDiseaseCondition?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Target Disease / Condition
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.targetDiseaseCondition}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    {/* =========================
          SPECIMEN & COLLECTION
      ========================== */}

                    {[
                      product.sampleType,
                      product.specimen,
                      product.sampleVolume,
                      product.sampleCollectionInstructions,
                      product.sampleStabilityHandling,
                      product.fastingRequirement,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Specimen & Collection
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {product.sampleType?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Type
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.sampleType}
                                </p>
                              </div>
                            )}

                            {product.specimen?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Specimen
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.specimen}
                                </p>
                              </div>
                            )}

                            {product.sampleVolume?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Volume
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.sampleVolume}
                                </p>
                              </div>
                            )}

                            {product.fastingRequirement?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Fasting Requirement
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.fastingRequirement}
                                </p>
                              </div>
                            )}

                            {product.sampleCollectionInstructions?.trim() && (
                              <div className="md:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Collection Instructions
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.sampleCollectionInstructions}
                                </p>
                              </div>
                            )}

                            {product.sampleStabilityHandling?.trim() && (
                              <div className="md:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Stability / Handling
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.sampleStabilityHandling}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    {/* =========================
          METHODOLOGY
      ========================== */}

                    {[
                      product.testMethod,
                      product.testPrinciple,
                      product.testingPlatformAnalyzer,
                      product.referenceRangeCutoff,
                      product.unit,
                      product.resultType,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Methodology
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {product.testMethod?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Test Method
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testMethod}
                                </p>
                              </div>
                            )}

                            {product.testPrinciple?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Test Principle
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testPrinciple}
                                </p>
                              </div>
                            )}

                            {product.testingPlatformAnalyzer?.trim() && (
                              <div className="md:col-span-2 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Testing Platform / Analyzer
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.testingPlatformAnalyzer}
                                </p>
                              </div>
                            )}

                            {product.referenceRangeCutoff?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Reference Range / Cut-off
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.referenceRangeCutoff}
                                </p>
                              </div>
                            )}

                            {product.unit?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Unit
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.unit}
                                </p>
                              </div>
                            )}

                            {product.resultType?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Result Type
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.resultType}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    {/* =========================
          SERVICE
      ========================== */}

                    {[
                      product.turnaroundTime,
                      product.homeSampleCollection,
                      product.sampleCollectionSchedule,
                      product.specialInstructions,
                      product.reportDelivery,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Service
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {product.turnaroundTime?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Turnaround Time (TAT)
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.turnaroundTime}
                                </p>
                              </div>
                            )}

                            {product.homeSampleCollection?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Home Sample Collection
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.homeSampleCollection}
                                </p>
                              </div>
                            )}

                            {product.sampleCollectionSchedule?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Collection Schedule
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.sampleCollectionSchedule}
                                </p>
                              </div>
                            )}

                            {product.reportDelivery?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Report Delivery
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.reportDelivery}
                                </p>
                              </div>
                            )}

                            {product.specialInstructions?.trim() && (
                              <div className="md:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Special Instructions
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.specialInstructions}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    {/* =========================
          PARTNER LABORATORY
      ========================== */}

                    {[
                      product.partnerLaboratory,
                      product.branchLocation,
                      product.partnerLabTestCode,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Partner Laboratory
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {product.partnerLaboratory?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Partner Laboratory
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.partnerLaboratory}
                                </p>
                              </div>
                            )}

                            {product.branchLocation?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Branch / Location
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.branchLocation}
                                </p>
                              </div>
                            )}

                            {product.partnerLabTestCode?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Partner Lab Test Code
                                </p>
                                <p className="text-sm font-semibold text-slate-800">
                                  {product.partnerLabTestCode}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                    {/* =========================
          CLINICAL INFORMATION
      ========================== */}

                    {[
                      product.whyThisTest,
                      product.whenRecommended,
                      product.clinicalSignificance,
                      product.sampleRequirements,
                    ].some((value) =>
                      value !== undefined &&
                      value !== null &&
                      String(value).trim() !== ""
                    ) && (

                        <div>
                          <h3 className="text-base font-bold text-slate-800 mb-3">
                            Clinical Information
                          </h3>

                          <div className="space-y-3">

                            {product.whyThisTest?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Why This Test?
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.whyThisTest}
                                </p>
                              </div>
                            )}

                            {product.whenRecommended?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  When is it Recommended?
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.whenRecommended}
                                </p>
                              </div>
                            )}

                            {product.clinicalSignificance?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Clinical Significance
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.clinicalSignificance}
                                </p>
                              </div>
                            )}

                            {product.sampleRequirements?.trim() && (
                              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                <p className="text-xs font-medium text-slate-500 mb-1">
                                  Sample Requirements
                                </p>
                                <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">
                                  {product.sampleRequirements}
                                </p>
                              </div>
                            )}

                          </div>
                        </div>
                      )}

                  </div>
                </div>
              )}
            {product.category === "Lab-Tests" ? (
              <>
                {/* LAB TEST SERVICE BOOKING CARD */}
                <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">

                  <p className="text-sm font-medium text-slate-500 mb-2">
                    Test Price
                  </p>

                  {(() => {
                    const basePrice = Number(product.price || 0);
                    const discountPercent = Number(product.discount || 0);

                    const discountedPrice =
                      discountPercent > 0
                        ? Math.round(
                          basePrice -
                          (basePrice * discountPercent) / 100
                        )
                        : basePrice;

                    const savings = basePrice - discountedPrice;

                    return (
                      <>
                        {/* Final Price */}
                        <p className="text-3xl font-bold text-blue-600">
                          ৳ {discountedPrice.toLocaleString()}
                        </p>

                        {/* Original Price + Discount */}
                        {discountPercent > 0 && (
                          <div className="flex items-center gap-2 mt-2">

                            <span className="text-sm text-slate-400 line-through">
                              ৳ {basePrice.toLocaleString()}
                            </span>

                            <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                              {discountPercent}% OFF
                            </span>

                          </div>
                        )}

                        {/* You Save */}
                        {discountPercent > 0 && savings > 0 && (
                          <p className="text-sm text-green-600 font-medium mt-1">
                            You Save ৳ {savings.toLocaleString()}
                          </p>
                        )}
                      </>
                    );
                  })()}

                  {/* Test Information */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-slate-600">
                      🧪 Professional Testing
                    </p>

                    <p className="text-sm text-slate-600">
                      🏥 Verified Laboratory
                    </p>

                    {product.homeSampleCollection && (
                      <p className="text-sm text-slate-600">
                        🏠 Home Collection Available
                      </p>
                    )}
                  </div>
                  {/* Book Test */}
                  <button
                    onClick={() => {
                      router.push(`/product/${product.id}/book`);
                    }}
                    className="w-full mt-5 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
                  >
                    🧪 Book Test
                  </button>
                </div>

                {/* SERVICE INFORMATION */}
                <div className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5">
                  <h3 className="font-bold text-slate-800 mb-3">
                    Diagnostic Service
                  </h3>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>✓ Partner laboratory support</p>

                    {product.partnerLaboratory && (
                      <p>
                        ✓ Laboratory: {product.partnerLaboratory}
                      </p>
                    )}

                    {product.reportDelivery && (
                      <p>
                        ✓ Report Delivery: {product.reportDelivery}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* NORMAL PRODUCT */}
                <PriceCard product={product} />

                <div className="mt-6">
                  <DeliveryCard />
                </div>
                {/* Mobile: Product Information comes after Buy/Price Card */}
                <div className="lg:hidden mt-6">
                  <ProductInfo product={product} />
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}