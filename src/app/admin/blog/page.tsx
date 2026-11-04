"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  Tag,
  X,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
  Code,
  Sparkles,
} from "lucide-react";
import { adminStore, type AdminBlogPost } from "@/lib/admin-store";
import { showAdminToast } from "@/components/admin/admin-toast";

const CATEGORIES = [
  "All Categories",
  "AI Video Generation",
  "WordPress",
  "Web Development",
  "UI/UX Design",
  "Digital Marketing",
  "Creator Economy",
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Modal / Editor State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("AI Video Generation");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [formTagInput, setFormTagInput] = useState("");
  const [formReadingTime, setFormReadingTime] = useState(5);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

  // Load posts
  useEffect(() => {
    setPosts(adminStore.getPosts());
    setMounted(true);
  }, []);

  const refreshPosts = () => {
    setPosts(adminStore.getPosts());
  };

  // Helper to slugify
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      setFormSlug(generateSlug(val));
    }
  };

  const openNewPostModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("AI Video Generation");
    setFormExcerpt("");
    setFormContent(
      "## Overview\n\nWrite your engaging breakdown here...\n\n### Key Principles\n\n- Point 1\n- Point 2\n\n### Summary\n\nConclusion of the guide."
    );
    setFormTags(["AI", "Tutorial"]);
    setFormReadingTime(5);
    setFormStatus("published");
    setEditorTab("write");
    setIsEditorOpen(true);
  };

  const openEditPostModal = (post: AdminBlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormTags(post.tags || []);
    setFormReadingTime(post.readingTime || 5);
    setFormStatus(post.status === "draft" ? "draft" : "published");
    setEditorTab("write");
    setIsEditorOpen(true);
  };

  const handleAddTag = () => {
    const trimmed = formTagInput.trim().replace(/^#/, "");
    if (trimmed && !formTags.includes(trimmed)) {
      setFormTags([...formTags, trimmed]);
      setFormTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter((t) => t !== tagToRemove));
  };

  // Insert markdown helper
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("post-content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formContent;
    const selected = text.substring(start, end) || "text";
    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormContent(newContent);

    // Auto update reading time estimate
    const words = newContent.trim().split(/\s+/).length;
    setFormReadingTime(Math.max(1, Math.ceil(words / 200)));
  };

  const handleSavePost = (statusOverride?: "published" | "draft") => {
    if (!formTitle.trim()) {
      showAdminToast("Please provide an article title.", "error");
      return;
    }
    const finalSlug = formSlug.trim() || generateSlug(formTitle);
    const finalStatus = statusOverride || formStatus;

    adminStore.savePost({
      id: editingPost?.id,
      title: formTitle.trim(),
      slug: finalSlug,
      category: formCategory,
      excerpt: formExcerpt.trim() || formTitle.trim(),
      content: formContent,
      tags: formTags,
      readingTime: Number(formReadingTime) || 5,
      status: finalStatus,
    });

    refreshPosts();
    setIsEditorOpen(false);
    showAdminToast(
      editingPost
        ? `Article "${formTitle}" updated successfully!`
        : `Article "${formTitle}" created as ${finalStatus}!`
    );
  };

  const handleDeletePost = (slug: string) => {
    adminStore.deletePost(slug);
    refreshPosts();
    setDeleteConfirmSlug(null);
    showAdminToast("Article deleted permanently.", "info");
  };

  const handleToggleStatus = (slug: string) => {
    const updated = adminStore.togglePostStatus(slug);
    if (updated) {
      refreshPosts();
      showAdminToast(`Article status changed to ${updated.status}.`);
    }
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus =
        statusFilter === "all" ? true : post.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ? true : post.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, searchQuery, statusFilter, categoryFilter]);

  // Statistics
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === "published").length;
  const draftPosts = posts.filter((p) => p.status === "draft").length;

  if (!mounted) {
    return (
      <div className="py-20 text-center text-sm font-semibold text-neutral-500 animate-pulse">
        Initializing Blog Engine...
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
              Blog & Content Engine
            </h1>
            <span className="text-[11px] font-mono bg-black text-white px-2.5 py-0.5 rounded-full font-bold">
              {totalPosts} Posts
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Author, publish, edit, and curate technical tutorials and strategic guides.
          </p>
        </div>

        <button
          onClick={openNewPostModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Total Articles
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {totalPosts}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Published Live
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2 flex items-center justify-between">
            <span>{publishedPosts}</span>
            <span className="text-xs font-mono font-bold bg-neutral-100 text-black px-2 py-1 rounded">
              Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Drafts in Progress
          </div>
          <div className="text-3xl font-black font-heading text-black mt-2">
            {draftPosts}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search articles by title, excerpt, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="shrink-0">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl bg-neutral-50/60 focus:bg-white focus:outline-none focus:border-black transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
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
            All ({posts.length})
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              statusFilter === "published"
                ? "bg-black text-white"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100"
            }`}
          >
            Published ({publishedPosts})
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              statusFilter === "draft"
                ? "bg-black text-white"
                : "text-neutral-500 hover:text-black hover:bg-neutral-100"
            }`}
          >
            Drafts ({draftPosts})
          </button>
        </div>
      </div>

      {/* Articles Listing */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-black">
              No matching articles found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search terms or filter settings, or click &quot;Write New Article&quot; to author a post.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredPosts.map((article) => {
              const isPublished = article.status === "published";
              return (
                <div
                  key={article.slug}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/80 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    {/* Category & Status Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          isPublished
                            ? "bg-black text-white border-black"
                            : "bg-neutral-100 text-neutral-600 border-neutral-300"
                        }`}
                      >
                        {article.status}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-200">
                        {article.category}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        {article.date}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {article.readingTime} min read
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-heading font-bold text-base sm:text-lg text-black leading-snug">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-neutral-500 line-clamp-2 max-w-3xl leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {article.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-2 self-start md:self-center shrink-0 pt-2 md:pt-0">
                    {/* View Live Article */}
                    <Link
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      className="p-2.5 rounded-lg border border-neutral-200 text-neutral-600 hover:text-black hover:border-black transition-colors"
                      title="Preview on Live Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Toggle Status */}
                    <button
                      onClick={() => handleToggleStatus(article.slug)}
                      className="px-3 py-2 rounded-lg border border-neutral-200 text-[11px] font-bold uppercase tracking-wider text-neutral-700 hover:border-black hover:text-black transition-colors cursor-pointer"
                      title="Toggle Draft / Published"
                    >
                      {isPublished ? "Set Draft" : "Publish"}
                    </button>

                    {/* Edit Article */}
                    <button
                      onClick={() => openEditPostModal(article)}
                      className="p-2.5 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Delete Article */}
                    <button
                      onClick={() => setDeleteConfirmSlug(article.slug)}
                      className="p-2.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-black hover:border-neutral-400 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmSlug && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-heading font-black text-lg text-black">
              Confirm Delete
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Are you sure you want to permanently delete this article? This action removes it from the blog catalog and cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setDeleteConfirmSlug(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePost(deleteConfirmSlug)}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Article Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
              <div>
                <h2 className="font-heading font-black text-xl text-black">
                  {editingPost ? "Edit Publication" : "Draft New Article"}
                </h2>
                <p className="text-xs text-neutral-500">
                  Compose content, set categories, configure SEO tags, and publish instantly.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-neutral-400 hover:text-black rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js 16 Production Architecture & Supabase Optimization"
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-mono border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors bg-neutral-50"
                  />
                </div>
              </div>

              {/* Category & Reading Time */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors cursor-pointer bg-white"
                  >
                    {CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Est. Read Time (min)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formReadingTime}
                    onChange={(e) => setFormReadingTime(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-neutral-200 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as "published" | "draft")}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors cursor-pointer bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Summary / Excerpt (Meta Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="A concise 2-sentence executive summary that displays in cards and Google Search results."
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-medium border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Topic Tags
                </label>
                <div className="flex flex-wrap items-center gap-2 p-2 border border-neutral-200 rounded-xl bg-neutral-50/50">
                  {formTags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-black border border-neutral-300 px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-neutral-400 hover:text-black cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                    <input
                      type="text"
                      placeholder="Add tag and press Enter..."
                      value={formTagInput}
                      onChange={(e) => setFormTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="text-xs px-2 py-1 bg-transparent focus:outline-none flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="text-[10px] uppercase font-bold text-neutral-600 bg-neutral-200 px-2 py-1 rounded cursor-pointer hover:bg-neutral-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Markdown Content & Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                        editorTab === "write"
                          ? "bg-white text-black shadow-xs font-extrabold"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      Write (Markdown)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                        editorTab === "preview"
                          ? "bg-white text-black shadow-xs font-extrabold"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      Live Formatted Preview
                    </button>
                  </div>

                  {editorTab === "write" && (
                    <div className="hidden sm:flex items-center gap-1 text-neutral-500">
                      <button
                        type="button"
                        onClick={() => insertMarkdown("**", "**")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("*", "*")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n## ", "\n")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n### ", "\n")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Heading 3"
                      >
                        <Heading3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n- ", "\n")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("\n> ", "\n")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Blockquote"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdown("```typescript\n", "\n```")}
                        className="p-1.5 hover:text-black hover:bg-neutral-100 rounded"
                        title="Code Block"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {editorTab === "write" ? (
                  <textarea
                    id="post-content-editor"
                    rows={14}
                    placeholder="Compose your article in Markdown..."
                    value={formContent}
                    onChange={(e) => {
                      setFormContent(e.target.value);
                      const words = e.target.value.trim().split(/\s+/).length;
                      setFormReadingTime(Math.max(1, Math.ceil(words / 200)));
                    }}
                    className="w-full p-4 font-mono text-xs leading-relaxed border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition-colors bg-neutral-50/30"
                  />
                ) : (
                  <div className="border border-neutral-200 rounded-xl p-6 min-h-[320px] bg-neutral-50/40 text-neutral-900 overflow-y-auto space-y-4">
                    <h1 className="text-2xl font-black font-heading text-black pb-2 border-b border-neutral-200">
                      {formTitle || "Untitled Article"}
                    </h1>
                    <div className="text-xs font-semibold text-neutral-500 flex gap-4">
                      <span>{formCategory}</span>
                      <span>•</span>
                      <span>{formReadingTime} min read</span>
                    </div>
                    <div className="prose prose-neutral max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {formContent || "(No content yet. Switch to Write tab to add body copy.)"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50/50">
              <div className="text-xs text-neutral-500 font-medium">
                URL: <span className="font-mono text-black font-bold">/blog/{formSlug || "your-slug"}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="w-1/2 sm:w-auto px-4 py-2.5 border border-neutral-200 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black hover:border-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost("draft")}
                  className="w-1/2 sm:w-auto px-4 py-2.5 border border-neutral-300 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSavePost("published")}
                  className="w-full sm:w-auto px-6 py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
