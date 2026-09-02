"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductList from "../../components/admin/ProductList";
import OrdersSection from "../../components/admin/OrdersSection";
import {
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import KpiPill from "../../components/KpiPill";
import StatCard from "../../components/admin/StatCard";
import DashboardHeader from "../../components/admin/DashboardHeader";
import InventoryStats from "../../components/admin/InventoryStats";
import OrderWorkflow from "../../components/admin/OrderWorkflow";
import MedicineFields from "@/app/components/admin/CategoryFields/MedicineFields";
import BabyMomFields from "../../components/admin/CategoryFields/BabyMomFields";
import HealthcareFields from "../../components/admin/CategoryFields/HealthcareFields";
import PersonalCareFields from "@/app/components/admin/CategoryFields/PersonalCareFields";
import MedicalDeviceFields from "../../components/admin/CategoryFields/MedicalDeviceFields";
import LabTestFields from "@/app/components/admin/CategoryFields/LabTestFields";
import AnimalFeedAdditives from "../../components/admin/CategoryFields/AnimalFeedAdditives";
import BusinessStats from "../../components/admin/BusinessStats";
import RecentOrders from "../../components/admin/RecentOrdersTemp";
import {
  addDoc,
  collection,
  deleteDoc,
  orderBy,
  query,
  doc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "@/lib/firebase";
console.log("Dashboard Loaded");

export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [testType, setTestType] = useState("");
  const [sampleType, setSampleType] = useState("");
  const [preparation, setPreparation] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [itemType, setItemType] = useState<"product" | "lab_test">("product");
  const [company, setCompany] = useState("");
  const [genericName, setGenericName] = useState("");
  const [strength, setStrength] = useState("");
  const [size, setSize] = useState("");
  const [stripsPerBox, setStripsPerBox] = useState("");
  const [tabletsPerStrip, setTabletsPerStrip] = useState("");
  const [unitType, setUnitType] = useState("Tablet");
  const [discount, setDiscount] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [productType, setProductType] = useState("");
  const [keyIngredients, setKeyIngredients] = useState("");
  const [skinHairType, setSkinHairType] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [benefits, setBenefits] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [model, setModel] = useState("");
  const [warranty, setWarranty] = useState("");
  const [pharmacology, setPharmacology] = useState("");
  const [indication, setIndication] = useState("");
  const [dosage, setDosage] = useState("");
  const [administration, setAdministration] = useState("");
  const [sideEffects, setSideEffects] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [pregnancyLactation, setPregnancyLactation] = useState("");
  const [drugInteraction, setDrugInteraction] = useState("");
  const [storageInfo, setStorageInfo] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [specifications, setSpecifications] = useState("");

  // =========================
  // MEDICAL DEVICE / IVD FIELDS
  // =========================

  const [kitType, setKitType] = useState("");
  const [numberOfTests, setNumberOfTests] = useState("");
  const [reagentComponents, setReagentComponents] = useState("");
  const [calibratorControl, setCalibratorControl] = useState("");

  const [analyticalSensitivity, setAnalyticalSensitivity] = useState("");
  const [analyticalSpecificity, setAnalyticalSpecificity] = useState("");
  const [detectionRange, setDetectionRange] = useState("");

  const [ceIvdrStatus, setCeIvdrStatus] = useState("");
  const [ivdClassification, setIvdClassification] = useState("");
  const [instrumentCompatibility, setInstrumentCompatibility] = useState("");
  const [testCategory, setTestCategory] = useState("");
  const [testName, setTestName] = useState("");
  const [shortName, setShortName] = useState("");
  const [testCode, setTestCode] = useState("");
  const [clinicalSpecialty, setClinicalSpecialty] = useState("");
  const [targetDiseaseCondition, setTargetDiseaseCondition] = useState("");

  const [specimen, setSpecimen] = useState("");
  const [sampleVolume, setSampleVolume] = useState("");
  const [sampleCollectionInstructions, setSampleCollectionInstructions] = useState("");
  const [sampleStabilityHandling, setSampleStabilityHandling] = useState("");
  const [fastingRequirement, setFastingRequirement] = useState("");

  const [testMethod, setTestMethod] = useState("");
  const [testPrinciple, setTestPrinciple] = useState("");
  const [testingPlatformAnalyzer, setTestingPlatformAnalyzer] = useState("");
  const [referenceRangeCutoff, setReferenceRangeCutoff] = useState("");
  const [unit, setUnit] = useState("");
  const [resultType, setResultType] = useState("");

  const [turnaroundTime, setTurnaroundTime] = useState("");
  const [homeSampleCollection, setHomeSampleCollection] = useState("");
  const [sampleCollectionSchedule, setSampleCollectionSchedule] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [reportDelivery, setReportDelivery] = useState("");
  const [partnerLaboratory, setPartnerLaboratory] = useState("");
  const [branchLocation, setBranchLocation] = useState("");
  const [partnerLabTestCode, setPartnerLabTestCode] = useState("");

  const [partnerLabPrice, setPartnerLabPrice] = useState("");
  const [sebaloySellingPrice, setSebaloySellingPrice] = useState("");
  const [homeCollectionCharge, setHomeCollectionCharge] = useState("");
  const [discountPromotionalPrice, setDiscountPromotionalPrice] = useState("");

  const [whyThisTest, setWhyThisTest] = useState("");
  const [whenRecommended, setWhenRecommended] = useState("");
  const [clinicalSignificance, setClinicalSignificance] = useState("");
  const [sampleRequirements, setSampleRequirements] = useState("");
  const [activeIngredient, setActiveIngredient] = useState("");
  const [activeContent, setActiveContent] = useState("");
  const [casNumber, setCasNumber] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState("");
  const [targetAnimal, setTargetAnimal] = useState("");
  const [applicationPurpose, setApplicationPurpose] = useState("");
  const [inclusionRate, setInclusionRate] = useState("");
  const [physicalForm, setPhysicalForm] = useState("");
  const [storageConditions, setStorageConditions] = useState("");
  const [imageFile, setImageFile] =
    useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [existingImages, setExistingImages] = useState<string[]>([]);


  const [csvFile, setCsvFile] =
    useState<File | null>(null); const [categories, setCategories] = useState<any[]>([]);
  const selectedCategory = categories.find(
    (cat: any) => cat.name === category
  );
  const isLabTestCategory =
    selectedCategory?.name?.toLowerCase().includes("lab test") ||
    selectedCategory?.slug?.toLowerCase().includes("lab-test") ||
    selectedCategory?.id === "lab-test";
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));

        const categoryData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((category: any) => category.status !== false)
          .sort(
            (a: any, b: any) =>
              Number(a.sortOrder ?? 999) - Number(b.sortOrder ?? 999)
          );

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const [productFilter, setProductFilter] = useState<"all" | "low" | "out">("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showDiagnosticBookings, setShowDiagnosticBookings] =
    useState(false);
  const orderSectionRef = useRef<HTMLDivElement>(null);
  const [showProducts, setShowProducts] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const filteredProducts = products.filter((product: any) => {
    const matchSearch =
      product.name?.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.company?.toLowerCase().includes(searchProduct.toLowerCase()) ||
      product.genericName?.toLowerCase().includes(searchProduct.toLowerCase());

    const matchFilter =
      productFilter === "all"
        ? true
        : productFilter === "low"
          ? Number(product.stock) > 0 && Number(product.stock) <= 10
          : Number(product.stock) === 0;

    return matchSearch && matchFilter;
  });
  console.log("Products:", products);
  console.log("Filtered:", filteredProducts);
  const handleCsvImport = async () => {
    if (!csvFile) {
      alert("Please select a CSV file");
      return;
    }

    const text = await csvFile.text();
    const rows = text.split("\n").slice(1);

    for (const row of rows) {
      if (!row.trim()) continue;

      const [
        name,
        genericName,
        strength,
        company,
        category,
        stripsPerBox,
        tabletsPerStrip,
        unitType,
        discount,
        imageUrl,
        price,
        stock,
      ] = row.split(",");
      await addDoc(collection(db, "products"), {
        name: name?.trim(),
        genericName: genericName?.trim(),
        strength: strength?.trim(),
        company: company?.trim(),
        category: category?.trim(),
        description: description?.trim(),
        features: features?.trim(),
        specifications: specifications?.trim(),

        pharmacology: pharmacology?.trim(),
        indication: indication?.trim(),
        dosage: dosage?.trim(),
        administration: administration?.trim(),
        sideEffects: sideEffects?.trim(),
        precautions: precautions?.trim(),
        pregnancyLactation: pregnancyLactation?.trim(),
        drugInteraction: drugInteraction?.trim(),
        storageInfo: storageInfo?.trim(),

        stripsPerBox: stripsPerBox?.trim(),
        tabletsPerStrip: tabletsPerStrip?.trim(),
        unitType: unitType?.trim(),

        discount: Number(discount || 0),
        imageUrl: imageUrl?.trim(),

        featured: false,

        price: Number(price),
        stock: Number(stock),

        createdAt: new Date(),
      });
    }

    alert("CSV Import Completed");
  }; const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  const deleteSelectedProducts = async () => {
    if (selectedProducts.length === 0) return;

    const confirmed = confirm(
      `Delete ${selectedProducts.length} products?`
    );

    if (!confirmed) return;

    for (const id of selectedProducts) {
      await deleteDoc(doc(db, "products", id));
    }

    setProducts((prev) =>
      prev.filter(
        (product) => !selectedProducts.includes(product.id)
      )
    );

    setSelectedProducts([]);
  };
  const [editingId, setEditingId] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [testBookings, setTestBookings] = useState<any[]>([]);
  const [searchOrder, setSearchOrder] = useState("");
  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const processingOrders = orders.filter(
    (o) => o.status === "processing"
  ).length;
  const shippedOrders = orders.filter(
    (o) => o.status === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "delivered"
  ).length;

  const totalSales = orders

    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const today = new Date();

  const todaySales = orders
    .filter((o) => {
      if (o.status !== "delivered" || !o.createdAt) return false;

      const d = o.createdAt.toDate();

      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const monthSales = orders
    .filter((o) => {
      if (o.status !== "delivered" || !o.createdAt) return false;

      const d = o.createdAt.toDate();

      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalTestBookings = testBookings.length;

  const pendingTestBookings = testBookings.filter(
    (booking: any) => booking.status === "pending"
  ).length;

  const confirmedTestBookings = testBookings.filter(
    (booking: any) => booking.status === "confirmed"
  ).length;

  const completedTestBookings = testBookings.filter(
    (booking: any) => booking.status === "completed"
  ).length;
  const lowStockProducts = products.filter(
    (product: any) =>
      Number(product.stock) > 0 &&
      Number(product.stock) <= 10
  ); const outOfStockProducts = products.filter(
    (product: any) => Number(product.stock) === 0
  );
  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product: any) => Number(product.stock) > 0
  ).length;
  const recentOrders = [...orders]
    .sort(
      (a: any, b: any) =>
        b.createdAt?.seconds - a.createdAt?.seconds
    )
    .slice(0, 5);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const productSectionRef = useRef<HTMLDivElement>(null);
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter(
        (order: any) => order.status === selectedStatus
      );
  const logout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "orders")
      );

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      data.sort(
        (a: any, b: any) =>
          b.createdAt?.seconds - a.createdAt?.seconds
      );
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTestBookings = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "testBookings")
      );

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      data.sort(
        (a: any, b: any) =>
          b.createdAt?.seconds - a.createdAt?.seconds
      );

      setTestBookings(data);
    } catch (error) {
      console.error("Failed to fetch test bookings:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          router.push("/admin/login");
          return;
        }

        fetchProducts();
        fetchOrders();
        fetchTestBookings();
      }
    );

    return () => unsubscribe();
  }, []);
  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setCompany("");
    setProductType("");
    setKeyIngredients("");
    setSkinHairType("");
    setCountryOfOrigin("");
    setBenefits("");
    setHowToUse("");
    setIngredients("");
    setShelfLife("");
    setGenericName("");
    setStrength("");
    setSize("");
    setBrand("");
    setModel("");
    setWarranty("");

    // Clear packaging fields
    setStripsPerBox("");
    setTabletsPerStrip("");
    // =========================
    // Clear Lab Test fields
    // =========================

    setTestName("");
    setShortName("");
    setTestCategory("");
    setTestCode("");
    setClinicalSpecialty("");
    setTargetDiseaseCondition("");

    setSampleType("");
    setSpecimen("");
    setSampleVolume("");
    setSampleCollectionInstructions("");
    setSampleStabilityHandling("");
    setFastingRequirement("");

    setTestMethod("");
    setTestPrinciple("");
    setTestingPlatformAnalyzer("");
    setReferenceRangeCutoff("");
    setUnit("");
    setResultType("");

    setTurnaroundTime("");
    setHomeSampleCollection("");
    setSampleCollectionSchedule("");
    setSpecialInstructions("");
    setReportDelivery("");

    setPartnerLaboratory("");
    setBranchLocation("");
    setPartnerLabTestCode("");

    setPartnerLabPrice("");
    setSebaloySellingPrice("");
    setHomeCollectionCharge("");
    setDiscountPromotionalPrice("");

    setWhyThisTest("");
    setWhenRecommended("");
    setClinicalSignificance("");
    setSampleRequirements("");
    // =========================
    // Clear Animal Feed fields
    // =========================

    setActiveIngredient("");
    setActiveContent("");
    setCasNumber("");
    setChemicalFormula("");
    setTargetAnimal("");
    setApplicationPurpose("");
    setInclusionRate("");
    setPhysicalForm("");
    setStorageConditions("");
    setUnitType("Tablet");
    setDiscount("0");

    setFeatured(false);
    setImageUrl("");
    setImageFile(null);
    setImageFiles([]);
    setExistingImages([]);
    setEditingId("");

    setPharmacology("");
    setIndication("");
    setDosage("");
    setAdministration("");
    setSideEffects("");
    setPrecautions("");
    setPregnancyLactation("");
    setDrugInteraction("");
    setStorageInfo("");

    setDescription("");
    setFeatures("");
    setSpecifications("");
  };
  const saveProduct = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const isLabTest =
      category?.toLowerCase().replace(/[^a-z]/g, "") === "labtests";

    try {
      // Prevent duplicate product/test creation
      if (!editingId) {
        const normalizedName = name.trim().toLowerCase();
        const normalizedCategory = category.trim().toLowerCase();

        const existingProductsSnapshot = await getDocs(
          collection(db, "products")
        );

        const duplicateExists = existingProductsSnapshot.docs.some(
          (item) => {
            const data = item.data();

            return (
              data.name?.trim().toLowerCase() === normalizedName &&
              data.category?.trim().toLowerCase() === normalizedCategory
            );
          }
        );

        if (duplicateExists) {
          alert(
            `This ${category === "Lab-Tests" ? "test" : "product"
            } already exists!`
          );
          return;
        }
      }

      let currentImageUrl = imageUrl || "";

      // Upload Main Product Image

      if (imageFile) {
        console.log("Selected main image:", imageFile.name);

        const imageRef = ref(
          storage,
          `products/${Date.now()}-${imageFile.name}`
        );

        console.log("Uploading main image...");

        await uploadBytes(imageRef, imageFile);

        currentImageUrl =
          await getDownloadURL(imageRef);

        console.log("Main Image URL:", currentImageUrl);
      }

      // Upload Additional Product Images
      let additionalImageUrls: string[] = [];

      if (imageFiles.length > 0) {
        console.log(
          "Uploading additional images:",
          imageFiles.length
        );

        additionalImageUrls = await Promise.all(
          imageFiles.map(async (file, index) => {
            const imageRef = ref(
              storage,
              `products/${Date.now()}-${index}-${file.name}`
            );

            await uploadBytes(imageRef, file);

            return await getDownloadURL(imageRef);
          })
        );

        console.log(
          "Additional Image URLs:",
          additionalImageUrls
        );
      } if (editingId) {
        const updateData: any = {
          name,
          genericName,
          strength,
          size,
          brand,
          productType,
          keyIngredients,
          skinHairType,
          countryOfOrigin,
          benefits,
          howToUse,
          ingredients,
          shelfLife,
          images: [
            ...(currentImageUrl
              ? [currentImageUrl]
              : existingImages.slice(0, 1)),

            ...existingImages.slice(1),

            ...additionalImageUrls,
          ].filter(Boolean),
          category,
          price: Number(price),
          ...(isLabTest ? {} : { stock: Number(stock) }),
          company,
          stripsPerBox,
          tabletsPerStrip,
          unitType,
          discount: Number(discount) || 0,
          featured,
          description,
          features,
          specifications,

          pharmacology,
          indication,
          dosage,
          administration,
          sideEffects,
          precautions,
          pregnancyLactation,
          drugInteraction,
          storageInfo,
          activeIngredient,
          activeContent,
          casNumber,
          chemicalFormula,
          targetAnimal,
          applicationPurpose,
          inclusionRate,
          physicalForm,
          storageConditions,
          kitType,
          numberOfTests,
          reagentComponents,
          calibratorControl,
          analyticalSensitivity,
          analyticalSpecificity,
          detectionRange,
          ceIvdrStatus,
          ivdClassification,
          instrumentCompatibility,
          // =========================
          // LAB TEST / DIAGNOSTIC SERVICE
          // =========================

          testName,
          shortName,
          testCategory,
          testCode,
          clinicalSpecialty,
          targetDiseaseCondition,

          sampleType,
          specimen,
          sampleVolume,
          sampleCollectionInstructions,
          sampleStabilityHandling,
          fastingRequirement,

          testMethod,
          testPrinciple,
          testingPlatformAnalyzer,
          referenceRangeCutoff,
          unit,
          resultType,

          turnaroundTime,
          homeSampleCollection,
          sampleCollectionSchedule,
          specialInstructions,
          reportDelivery,

          partnerLaboratory,
          branchLocation,
          partnerLabTestCode,

          partnerLabPrice: Number(partnerLabPrice) || 0,
          sebaloySellingPrice: Number(sebaloySellingPrice) || 0,
          homeCollectionCharge: Number(homeCollectionCharge) || 0,
          discountPromotionalPrice:
            Number(discountPromotionalPrice) || 0,

          whyThisTest,
          whenRecommended,
          clinicalSignificance,
          sampleRequirements,
        };

        if (currentImageUrl) {
          updateData.imageUrl = currentImageUrl;
        }
        await updateDoc(
          doc(db, "products", editingId),
          updateData
        );

        alert("Product Updated");
      } else {
        await addDoc(
          collection(db, "products"),
          {
            name,
            strength,
            size,
            brand,
            productType,
            keyIngredients,
            skinHairType,
            countryOfOrigin,
            benefits,
            howToUse,
            ingredients,
            shelfLife,
            model,
            warranty,

            category,
            company,
            genericName,
            stripsPerBox,
            tabletsPerStrip,
            unitType,
            description,
            features,
            specifications,

            price: Number(price),
            ...(isLabTest ? {} : { stock: Number(stock) }),
            discount: Number(discount) || 0, featured,
            images: [
              currentImageUrl,
              ...additionalImageUrls,
            ].filter(Boolean),
            imageUrl: currentImageUrl,
            activeIngredient,
            activeContent,
            casNumber,
            chemicalFormula,
            targetAnimal,
            applicationPurpose,
            inclusionRate,
            physicalForm,
            storageConditions,
            kitType,
            numberOfTests,
            reagentComponents,
            calibratorControl,
            analyticalSensitivity,
            analyticalSpecificity,
            detectionRange,
            ceIvdrStatus,
            ivdClassification,
            instrumentCompatibility,
            // =========================
            // LAB TEST / DIAGNOSTIC SERVICE
            // =========================

            testName,
            shortName,
            testCategory,
            testCode,
            clinicalSpecialty,
            targetDiseaseCondition,

            sampleType,
            specimen,
            sampleVolume,
            sampleCollectionInstructions,
            sampleStabilityHandling,
            fastingRequirement,

            testMethod,
            testPrinciple,
            testingPlatformAnalyzer,
            referenceRangeCutoff,
            unit,
            resultType,

            turnaroundTime,
            homeSampleCollection,
            sampleCollectionSchedule,
            specialInstructions,
            reportDelivery,

            partnerLaboratory,
            branchLocation,
            partnerLabTestCode,

            partnerLabPrice: Number(partnerLabPrice) || 0,
            sebaloySellingPrice: Number(sebaloySellingPrice) || 0,
            homeCollectionCharge: Number(homeCollectionCharge) || 0,
            discountPromotionalPrice:
              Number(discountPromotionalPrice) || 0,

            whyThisTest,
            whenRecommended,
            clinicalSignificance,
            sampleRequirements,
            createdAt: Timestamp.fromDate(new Date()),

          }
        ); alert("Product Added");
      }

      resetForm();
      fetchProducts();

    } catch (error: any) {
      console.error(error);

      alert(error.message);
    }
  };

  const editProduct = (product: any) => {
    setEditingId(product.id);
    setName(product.name);
    setExistingImages(
      Array.isArray(product.images)
        ? product.images
        : product.imageUrl
          ? [product.imageUrl]
          : []
    );

    setImageFiles([]);
    setImageFile(null);
    setCategory(product.category);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setDiscount(String(product.discount || 0));
    setFeatured(product.featured || false);
    setImageUrl(product.imageUrl || "");
    setCompany(product.company || "");
    setBrand(product.brand || "");
    setSize(product.size || "");
    setStripsPerBox(String(product.stripsPerBox || ""));
    setProductType(product.productType || "");
    setKeyIngredients(product.keyIngredients || "");
    setSkinHairType(product.skinHairType || "");
    setCountryOfOrigin(product.countryOfOrigin || "");
    setBenefits(product.benefits || "");
    setHowToUse(product.howToUse || "");
    setIngredients(product.ingredients || "");
    setShelfLife(product.shelfLife || "");
    setTabletsPerStrip(String(product.tabletsPerStrip || ""));
    setUnitType(product.unitType || "");
    setStrength(product.strength || "");
    setGenericName(product.genericName || "");
    setDescription(product.description || "");
    setFeatures(product.features || "");
    setSpecifications(product.specifications || "");

    setPharmacology(product.pharmacology || "");
    // =========================
    // MEDICAL DEVICE FIELDS
    // =========================
    setModel(product.model || "");
    setWarranty(product.warranty || "");

    // =========================
    // LAB TEST / DIAGNOSTIC SERVICE
    // =========================

    setTestName(product.testName || "");
    setShortName(product.shortName || "");
    setTestCategory(product.testCategory || "");
    setTestCode(product.testCode || "");
    setClinicalSpecialty(product.clinicalSpecialty || "");
    setTargetDiseaseCondition(product.targetDiseaseCondition || "");

    setSampleType(product.sampleType || "");
    setSpecimen(product.specimen || "");
    setSampleVolume(product.sampleVolume || "");
    setSampleCollectionInstructions(
      product.sampleCollectionInstructions || ""
    );
    setSampleStabilityHandling(
      product.sampleStabilityHandling || ""
    );
    setFastingRequirement(product.fastingRequirement || "");

    setTestMethod(product.testMethod || "");
    setTestPrinciple(product.testPrinciple || "");
    setTestingPlatformAnalyzer(
      product.testingPlatformAnalyzer || ""
    );
    setReferenceRangeCutoff(
      product.referenceRangeCutoff || ""
    );
    setUnit(product.unit || "");
    setResultType(product.resultType || "");

    setTurnaroundTime(product.turnaroundTime || "");
    setHomeSampleCollection(
      product.homeSampleCollection || ""
    );
    setSampleCollectionSchedule(
      product.sampleCollectionSchedule || ""
    );
    setSpecialInstructions(
      product.specialInstructions || ""
    );
    setReportDelivery(product.reportDelivery || "");

    setPartnerLaboratory(
      product.partnerLaboratory || ""
    );
    setBranchLocation(product.branchLocation || "");
    setPartnerLabTestCode(
      product.partnerLabTestCode || ""
    );

    setPartnerLabPrice(
      product.partnerLabPrice || ""
    );
    setSebaloySellingPrice(
      product.sebaloySellingPrice || ""
    );
    setHomeCollectionCharge(
      product.homeCollectionCharge || ""
    );
    setDiscountPromotionalPrice(
      product.discountPromotionalPrice || ""
    );

    setWhyThisTest(product.whyThisTest || "");
    setWhenRecommended(
      product.whenRecommended || ""
    );
    setClinicalSignificance(
      product.clinicalSignificance || ""
    );
    setSampleRequirements(
      product.sampleRequirements || ""
    );
    setIndication(product.indication || "");
    setDosage(product.dosage || "");
    setAdministration(product.administration || "");
    setSideEffects(product.sideEffects || "");
    setPrecautions(product.precautions || "");
    setPregnancyLactation(product.pregnancyLactation || "");
    setDrugInteraction(product.drugInteraction || "");
    setStorageInfo(product.storageInfo || "");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const deleteOrder = async (id: string) => {
    const ok = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "orders", id));

      setOrders((prev) =>
        prev.filter((order) => order.id !== id)
      );

      alert("Order deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };
  const updateOrderStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await updateDoc(
        doc(db, "orders", id),
        {
          status,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Status update failed");
    }
  };

  const deleteProduct = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {
      await deleteDoc(
        doc(db, "products", id)
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };
  const updateTestBookingStatus = async (
    bookingId: string,
    newStatus: string
  ) => {
    try {
      await updateDoc(doc(db, "testBookings", bookingId), {
        status: newStatus,
      });

      setTestBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update booking status");
    }
  };
  const deleteTestBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "testBookings", bookingId));

      setTestBookings((prev) =>
        prev.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting test booking:", error);
      alert("Failed to delete booking");
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <DashboardHeader onLogout={logout} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Sales"
          value={`৳${totalSales.toLocaleString()}`}
          color="bg-green-500"
        />

        <StatCard
          title="Orders"
          value={String(totalOrders)}
          color="bg-blue-500"
        />

        <StatCard
          title="Products"
          value={String(totalProducts)}
          color="bg-purple-500"
        />

        <StatCard
          title="Low Stock"
          value={String(lowStockProducts.length)}
          color="bg-red-500"
        />
      </div>
      <div className="space-y-6">
        <OrderWorkflow
          pendingOrders={pendingOrders}
          processingOrders={processingOrders}
          shippedOrders={shippedOrders}
          deliveredOrders={deliveredOrders}
          onPendingClick={() => {
            setSelectedStatus("pending");
            setShowOrders(true);
            orderSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onProcessingClick={() => {
            setSelectedStatus("processing");
            setShowOrders(true);
            orderSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onShippedClick={() => {
            setSelectedStatus("shipped");
            setShowOrders(true);
            orderSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}

          onDeliveredClick={() => {
            setSelectedStatus("delivered");
            setShowOrders(true);
            orderSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />

        <BusinessStats
          todaySales={todaySales}
          monthSales={monthSales}
          onSalesClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          onOrdersClick={() => {
            setSelectedStatus("");
            setShowOrders(true);

            orderSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
        <InventoryStats
          totalProducts={totalProducts}
          lowStockProducts={lowStockProducts.length}
          outOfStockProducts={outOfStockProducts.length}
          activeProducts={activeProducts}
          onTotalProductsClick={() => {
            setProductFilter("all");
            setShowProducts(true);
            productSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onLowStockClick={() => {
            setProductFilter("low");
            setShowProducts(true);
            productSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onOutOfStockClick={() => {
            setProductFilter("out");
            setShowProducts(true);
            productSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          onActiveProductsClick={() => {
            setProductFilter("all");
            setShowProducts(true);
            productSectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">
            🧪 Diagnostic Test Bookings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {totalTestBookings}
              </p>
            </div>

            <div className="border border-yellow-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Pending
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {pendingTestBookings}
              </p>
            </div>

            <div className="border border-purple-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Confirmed
              </p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {confirmedTestBookings}
              </p>
            </div>

            <div className="border border-green-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Completed
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {completedTestBookings}
              </p>
            </div>
          </div>
        </div>
        {/* =========================
    RECENT DIAGNOSTIC BOOKINGS
========================= */}
        <div className="mt-6 bg-white border rounded-2xl overflow-hidden">

          {/* Header */}
          <button
            type="button"
            onClick={() => setShowDiagnosticBookings(!showDiagnosticBookings)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {showDiagnosticBookings ? "➖" : "➕"}
              </span>

              <div className="text-left">
                <h2 className="text-lg font-bold text-slate-800">
                  🧪 Recent Diagnostic Bookings
                  <span className="ml-2 text-sm text-blue-600">
                    {testBookings.length}
                  </span>
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Latest diagnostic test booking requests
                </p>
              </div>
            </div>
          </button>

          {/* Booking Table */}
          {showDiagnosticBookings && (
            <div className="border-t overflow-x-auto">

              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3">Patient</th>
                    <th className="text-left px-4 py-3">Mobile</th>
                    <th className="text-left px-4 py-3">Age / Gender</th>
                    <th className="text-left px-4 py-3">Test Date</th>
                    <th className="text-left px-4 py-3">Collection</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {testBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No diagnostic test bookings found.
                      </td>
                    </tr>
                  ) : (
                    testBookings.slice(0, 10).map(
                      (booking: any, index: number) => (
                        <tr
                          key={booking.id}
                          className="border-b last:border-b-0 hover:bg-slate-50"
                        >
                          {/* Patient */}
                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-800">
                              {booking.patientName || "N/A"}
                            </p>
                            <p className="text-xs text-slate-400">
                              Sebaloy ID: {booking.sebaloyBookingId || "N/A"}
                            </p>                         
                             </td>

                          {/* Mobile */}
                          <td className="px-4 py-3">
                            {booking.mobile || "N/A"}
                          </td>

                          {/* Age / Gender */}
                          <td className="px-4 py-3">
                            {booking.age || "N/A"}
                            {booking.gender
                              ? ` / ${booking.gender}`
                              : ""}
                          </td>

                          {/* Test Date */}
                          <td className="px-4 py-3">
                            {booking.bookingDate || "N/A"}
                          </td>

                          {/* Collection */}
                          <td className="px-4 py-3">
                            {booking.homeCollection
                              ? "🏠 Home Collection"
                              : "🏥 Laboratory Visit"}
                          </td>
                          {/* Status */}
                          <td className="px-4 py-3">
                            <select
                              value={booking.status || "pending"}
                              onChange={(e) =>
                                updateTestBookingStatus(
                                  booking.id,
                                  e.target.value
                                )
                              }
                              className={`px-3 py-2 rounded-lg text-sm font-semibold border cursor-pointer outline-none
      ${booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  : booking.status === "confirmed"
                                    ? "bg-blue-100 text-blue-700 border-blue-200"
                                    : booking.status === "completed"
                                      ? "bg-green-100 text-green-700 border-green-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => deleteTestBooking(booking.id)}
                              className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>

            </div>
          )}
        </div>

        {/* Recent Orders */}
        <RecentOrders orders={recentOrders} />
        {/* CSV Import */}

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setCsvFile(e.target.files?.[0] || null)
          }
          className="mb-4 border p-2 rounded"
        />

        <button
          type="button"
          onClick={handleCsvImport}
          className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
        >
          Import CSV
        </button>
        <OrdersSection
          showOrders={showOrders}
          setShowOrders={setShowOrders}
          searchOrder={searchOrder}
          setSearchOrder={setSearchOrder}
          filteredOrders={filteredOrders}
          updateOrderStatus={updateOrderStatus}
          deleteOrder={deleteOrder}
        />

        <div
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-4 mb-4 flex items-center justify-between cursor-pointer transition-all duration-300 shadow-sm"
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            📦 Add Product
          </h2>

          <span className="text-3xl font-light">
            {showAddProduct ? "−" : "+"}
          </span>
        </div>
        {
          showAddProduct && (
            <form
              onSubmit={saveProduct}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold">
                {editingId
                  ? "Edit Product"
                  : "Add Product"}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Name - Hidden for Lab Tests */}
                {category !== "Lab-Tests" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3"
                      required
                    />
                  </div>
                )}
                {category === "Medicine" && (
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
                )}
                {category === "Lab Test" && (
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">
                      Test Information
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Test Type
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Molecular Test, Blood Test"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Sample Type
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Blood, Serum, Urine"
                          className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {category === "Baby & Mom Care" && (
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

                )}
                {category === "Healthcare" && (
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
                )}
                {category === "Personal Care" && (
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
                )}
                {/* =========================
                  MEDICAL DEVICES
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
========================== */}

                {category?.toLowerCase().replace(/[^a-z]/g, "") === "labtests" && (
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
                )}
                {/* =========================
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    value={category}
                    onChange={(e) => {
                      const newCategory = e.target.value;

                      setCategory(newCategory);

                      // Clear category-specific fields
                      setBrand("");
                      setSize("");
                      setStrength("");
                      setCompany("");
                      setProductType("");
                      setKeyIngredients("");
                      setSkinHairType("");
                      setCountryOfOrigin("");
                      setBenefits("");
                      setHowToUse("");
                      setIngredients("");
                      setShelfLife("");

                      // Clear Medicine-specific fields
                      setGenericName("");
                      setPharmacology("");
                      setIndication("");
                      setDosage("");
                      setAdministration("");
                      setSideEffects("");
                      setPrecautions("");
                      setPregnancyLactation("");
                      setDrugInteraction("");
                      setStorageInfo("");

                      // Clear packaging fields
                      setStripsPerBox("");
                      setTabletsPerStrip("");
                    }}
                    className="w-full border p-3 rounded-lg"
                  >
                    <option value="">Select Category</option>

                    {categories
                      .filter((cat: any) => cat.status === true)
                      .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
                      .map((cat: any) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="w-full border p-3 rounded-lg"
                  >
                    <option value="">Select Unit Type</option>

                    {selectedCategory?.unitTypes?.map((unit: string) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  placeholder={category === "Lab-Tests" ? "Test Price" : "Price"}
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  className="w-full border p-3 rounded"
                  required
                />
                {category !== "Lab-Tests" && (
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value)
                    }
                    className="w-full border p-3 rounded"
                    required
                  />
                )}
                <input
                  type="number"
                  placeholder="Discount %"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border p-3 rounded"
                  required
                />
                <div className="flex items-center gap-3">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5"
                  />

                  <label htmlFor="featured" className="font-medium">
                    <label htmlFor="featured" className="font-medium">
                      {category === "Lab-Tests" ? "⭐ Featured Test" : "⭐ Featured Product"}
                    </label>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder={category === "Lab-Tests" ? "Test Image URL" : "Image URL"}
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border p-3 rounded"
                />

                {/* Main Product Image */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {category === "Lab-Tests"
                      ? "Test / Service Image"
                      : "Main Product Image"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(
                        e.target.files?.[0] || null
                      )
                    }
                    className="w-full border p-3 rounded"
                  />
                </div>

                {/* Additional Product Images */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Product Images
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || []);

                      setImageFiles((prev) => [
                        ...prev,
                        ...newFiles,
                      ]);

                      e.target.value = "";
                    }}
                    className="w-full border p-3 rounded"
                  />

                  {imageFiles.length > 0 && (
                    <p className="text-sm text-slate-500 mt-2">
                      {imageFiles.length} additional image
                      {imageFiles.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded"
              >
                {editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </form>
          )
        }
        <div
          ref={productSectionRef}
          onClick={() => setShowProducts(!showProducts)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 py-4 mb-3 mt-8 flex justify-between items-center cursor-pointer"
        >
          <h2 className="text-xl font-bold">
            📦 Product List
          </h2>

          <span className="text-2xl font-bold">
            {showProducts ? "−" : "+"}
          </span>
        </div>

        {
          showProducts && (
            <>
              <ProductList
                filteredProducts={filteredProducts}
                lowStockProducts={lowStockProducts}
                searchProduct={searchProduct}
                setSearchProduct={setSearchProduct}
                selectedProducts={selectedProducts}
                toggleProductSelection={toggleProductSelection}
                deleteSelectedProducts={deleteSelectedProducts}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
              />
            </>
          )}
      </div>
    </div >
  );
}