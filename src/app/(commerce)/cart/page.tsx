"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Cart Header */}
        <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
          <Container>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Your Shopping Cart
            </h1>
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Review your items before proceeding to instant digital checkout.
            </p>
          </Container>
        </section>

        <Section background="white">
          <Container>
            {items.length === 0 ? (
              <div className="text-center py-20 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 text-black flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Discover practical guides, AI prompt packs, and production-ready web templates.
                </p>
                <div className="mt-8">
                  <Link href="/products">
                    <Button variant="primary" size="lg">
                      Browse Digital Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Cart Items List */}
                <div className="lg:col-span-8 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-6 rounded-2xl border border-neutral-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 border border-neutral-800">
                          <span className="text-xs font-bold uppercase tracking-widest">
                            {item.product.category.substring(0, 3)}
                          </span>
                        </div>
                        <div>
                          <Link href={`/products/${item.product.slug}`} className="font-heading font-black uppercase text-base text-black hover:underline transition-colors">
                            {item.product.title}
                          </Link>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            Format: {item.product.fileFormat}
                          </div>
                          <div className="text-base font-black text-black mt-1">
                            {formatPrice(item.product.discountPrice || item.product.price)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Delete */}
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-center border border-neutral-300 rounded-full bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-black hover:bg-neutral-200 rounded-l-full cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-black hover:bg-neutral-200 rounded-r-full cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={clearCart}
                      className="text-xs uppercase tracking-wider text-neutral-400 hover:text-black underline cursor-pointer"
                    >
                      Clear entire cart
                    </button>
                    <Link href="/products" className="text-xs font-bold uppercase tracking-wider text-black hover:underline">
                      Continue Shopping →
                    </Link>
                  </div>
                </div>

                {/* Order Summary Box */}
                <div className="lg:col-span-4 bg-neutral-50 border border-neutral-200 rounded-3xl p-8">
                  <h3 className="font-heading font-black uppercase text-base tracking-widest text-black mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm border-b border-neutral-200 pb-6">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Instant Digital Delivery</span>
                      <span className="font-bold text-black">FREE</span>
                    </div>
                  </div>

                  <div className="py-6 flex justify-between items-baseline">
                    <span className="font-heading font-black uppercase text-base text-black">Total Due</span>
                    <span className="font-heading font-black text-2xl text-black">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button variant="primary" size="lg" className="w-full text-xs font-bold uppercase tracking-wider">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>256-bit Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
