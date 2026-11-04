"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign,
  FileCheck,
  CheckCircle2,
  X,
  Layers,
} from "lucide-react";
import { adminStore, type AdminProduct } from "@/lib/admin-store";
import { showAdminToast } from "@/components/admin/admin-toast";
import { formatPrice } from "@/lib/utils";

const PRODUCT_CATEGORIES = [
  "All Categories",
  "eBooks",
  "Templates",
  "AI Prompts",
  "Creator Resources",
];

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState<AdminProduct[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState<"eBooks" | "Templates" | "AI Prompts" | "Creator Resources">("eBooks");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState(499);
  const [formDiscountPrice, setFormDiscountPrice] = useState<number | string>(299);
  const [formFormat, setFormFormat] = useState("PDF");
  const [formFileSize, setFormFileSize] = useState("12 MB");
  const [formFilePath, setFormFilePath] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");

  useEffect(() => {
    setProductsList(adminStore.getProducts());
    setMounted(true);
  }, []);

  const refreshList = () => {
    setProductsList(adminStore.getProducts());
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingProduct) {
      const slug = generateSlug(val);
      setFormSlug(slug);
      setFormFilePath(`product-files/${slug}.zip`);
    }
  };

  const openNewModal = () => {
    setEditingProduct(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("eBooks");
    setFormShortDesc("");
    setFormDesc("");
    setFormPrice(499);
    setFormDiscountPrice(299);
    setFormFormat("ZIP");
    setFormFileSize("15 MB");
    setFormFilePath("product-files/asset.zip");
    setFormFeatured(false);
    setFormStatus("published");
    setIsModalOpen(true);
  };

  const openEditModal = (p: AdminProduct) => {
    setEditingProduct(p);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormCategory(p.category);
    setFormShortDesc(p.shortDescription || "");
    setFormDesc(p.description || "");
    setFormPrice(p.price);
    setFormDiscountPrice(p.discountPrice !== undefined ? p.discountPrice : "");
    setFormFormat(p.fileFormat || "ZIP");
    setFormFileSize(p.fileSize || "15 MB");
    setFormFilePath(p.filePath || `product-files/${p.slug}.zip`);
    setFormFeatured(!!p.featured);
    setFormStatus(p.status === "draft" ? "draft" : "published");
    setIsModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formTitle.trim()) {
      showAdminToast("Please provide a product title.", "error");
      return;
    }

    const finalSlug = formSlug.trim() || generateSlug(formTitle);

    adminStore.saveProduct({
      id: editingProduct?.id,
      title: formTitle.trim(),
      slug: finalSlug,
      category: formCategory,
      shortDescription: formShortDesc.trim(),
      description: formDesc.trim() || formShortDesc.trim(),
      price: Number(formPrice) || 0,
      discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
      fileFormat: formFormat,
      fileSize: formFileSize,
      filePath: formFilePath,
      featured: formFeatured,
      status: formStatus,
    });

    refreshList();
    setIsModalOpen(false);
    showAdminToast(
      editingProduct
        ? `Product "${formTitle}" updated successfully!`
        : `Product "${formTitle}" added to catalog!`
    );
  };

  const handleDeleteProduct = (id: string) => {
    adminStore.deleteProduct(id);
    refreshList();
    setDeleteConfirmId(null);
    showAdminToast("Product removed from catalog.", "info");
  };

  const handleToggleStatus = (id: string) => {
    const updated = adminStore.toggleProductStatus(id);
    if (updated) {
      refreshList();
      showAdminToast(`Product status toggled to ${updated.status}.`);
    }
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ? true : p.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ? true : p.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [productsList, searchQuery, categoryFilter, statusFilter]);

  const totalProducts = productsList.length;
  const publishedCount = productsList.filter((p) => p.status === "published").length;
  const catalogValue = productsList.reduce((acc, p) => acc + (p.discountPrice || p.price), 0);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Loading Product Suite...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-black tracking-tight">
              Product Catalog & Entitlements
            </h1>
            <span className="text-[11px] font-mono bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
              {totalProducts} Products
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Manage your digital downloads, templates, prompt packs, pricing, and private storage delivery paths.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Total Inventory
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {totalProducts}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Published Live
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2 flex items-center justify-between">
            <span>{publishedCount}</span>
            <span className="text-xs font-mono font-bold bg-neutral-100 text-black px-2 py-1 rounded">
              Active Store
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Catalog Total Value
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {formatPrice(catalogValue)}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products by title, description, or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all"
            />
          </div>

          <div className="shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              statusFilter === "all"
                ? "bg-black text-white"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100"
            }`}
          >
            All Products ({productsList.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              statusFilter === "published"
                ? "bg-black text-white"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              statusFilter === "draft"
                ? "bg-black text-white"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100"
            }`}
          >
            Drafts ({productsList.length - publishedCount})
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-black">
              No products found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No products match your current search or category filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-[10px] uppercase font-bold text-neutral-500 border-b border-neutral-200 tracking-wider">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Offer</th>
                  <th className="p-4">Delivery File</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800">
                {filteredProducts.map((p) => {
                  const isPublished = p.status === "published";
                  return (
                    <tr key={p.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
                            {p.title.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-black text-sm flex items-center gap-1.5">
                              {p.title}
                              {p.featured && (
                                <span className="text-[9px] bg-neutral-100 border border-neutral-300 px-1.5 py-0.2 rounded font-mono uppercase">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-neutral-500 font-mono truncate max-w-xs">
                              /products/{p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-[11px] bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                          {p.category}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-extrabold text-sm text-black">
                          {formatPrice(p.discountPrice || p.price)}
                        </div>
                        {p.discountPrice && (
                          <div className="text-[10px] text-neutral-400 line-through">
                            {formatPrice(p.price)}
                          </div>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-600">
                          <FileCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <span className="truncate max-w-[140px]" title={p.filePath || ""}>
                            {p.fileFormat} • {p.fileSize}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            isPublished
                              ? "bg-black text-white border-black"
                              : "bg-neutral-100 text-neutral-600 border-neutral-300"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="p-4 text-right space-x-1.5">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          className="inline-block p-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition-colors"
                          title="View on Store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleToggleStatus(p.id)}
                          className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-neutral-200 rounded-lg text-neutral-700 hover:border-black hover:text-black transition-colors cursor-pointer"
                        >
                          {isPublished ? "Draft" : "Publish"}
                        </button>

                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-black hover:border-neutral-400 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200">
            <h3 className="font-heading font-black text-lg text-black">
              Confirm Product Removal
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Are you sure you want to delete this product from your inventory? Existing customer download entitlements may be impacted.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div>
                <h2 className="font-heading font-black text-xl text-black">
                  {editingProduct ? "Edit Product" : "New Digital Asset"}
                </h2>
                <p className="text-xs text-neutral-500">
                  Configure asset catalog metadata, pricing, secure bucket file path, and format.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI Prompt Engineering Playbook"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-mono border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors bg-neutral-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors cursor-pointer bg-white"
                  >
                    <option value="eBooks">eBooks</option>
                    <option value="Templates">Templates</option>
                    <option value="AI Prompts">AI Prompts</option>
                    <option value="Creator Resources">Creator Resources</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={formDiscountPrice}
                    onChange={(e) => setFormDiscountPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Short Value Proposition
                </label>
                <textarea
                  rows={2}
                  placeholder="1-2 sentences explaining exactly what problem this product solves."
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    File Format
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PDF, Notion, ZIP"
                    value={formFormat}
                    onChange={(e) => setFormFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Asset File Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 18 MB"
                    value={formFileSize}
                    onChange={(e) => setFormFileSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "published" | "draft")}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl focus:outline-none focus:border-black cursor-pointer bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Private Storage Delivery Path (Supabase Bucket)
                </label>
                <input
                  type="text"
                  placeholder="product-files/ai-prompt-engineering.zip"
                  value={formFilePath}
                  onChange={(e) => setFormFilePath(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-neutral-200 rounded-xl focus:outline-none focus:border-black bg-neutral-50/50"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Path inside your private Supabase storage bucket used to generate 15-minute signed download URLs upon verified order payment.
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-0 cursor-pointer"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-neutral-800 cursor-pointer">
                  Feature this product on Homepage & Store hero banner
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-neutral-200 flex justify-end gap-3 bg-neutral-50/50">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 border border-neutral-200 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProduct}
                className="px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              >
                {editingProduct ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
