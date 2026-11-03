"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { getProductBySlug, type Product } from "@/lib/products-data";
import { ShieldCheck, Download, Lock, CheckCircle2 } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const directProductSlug = searchParams.get("product");
  const { items, clearCart } = useCartStore();

  const [checkoutItems, setCheckoutItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentGateway, setPaymentGateway] = useState<"razorpay" | "stripe">("razorpay");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (directProductSlug) {
      const p = getProductBySlug(directProductSlug);
      if (p) {
        setCheckoutItems([{ product: p, quantity: 1 }]);
        return;
      }
    }
    setCheckoutItems(items);
  }, [directProductSlug, items]);

  const totalAmount = checkoutItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderNum = `NK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setOrderNumber(generatedOrderNum);
      setOrderCompleted(true);
      setIsProcessing(false);
      clearCart();
    }, 1200);
  };

  if (orderCompleted) {
    return (
      <div className="py-20 sm:py-28">
        <Container size="narrow">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-14 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-black text-xs font-bold uppercase tracking-wider mb-4">
              Order #{orderNumber}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Payment Confirmed
            </h1>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-lg mx-auto">
              Thank you, <strong>{name}</strong>. Your payment has been verified. Download credentials and tax receipts have been sent to <strong>{email}</strong>.
            </p>

            {/* Instant Download Access */}
            <div className="mt-10 p-6 sm:p-8 bg-neutral-50 border border-neutral-200 rounded-2xl text-left space-y-4">
              <h3 className="font-heading font-black uppercase text-xs tracking-widest text-black flex items-center gap-2">
                <Download className="w-4 h-4 text-black" />
                Instant Secure Download Links
              </h3>
              <div className="space-y-3">
                {checkoutItems.map((item) => (
                  <div key={item.product.id} className="p-4 bg-white rounded-xl border border-neutral-200 flex items-center justify-between">
                    <div>
                      <div className="font-heading font-black uppercase text-sm text-black">
                        {item.product.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        Format: {item.product.fileFormat} • Size: {item.product.fileSize}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => alert(`Starting encrypted download for: ${item.product.title}`)}
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <Link href="/products">
                <Button variant="outline" size="md">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="secondary" size="md">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <Section background="white">
      <Container>
        {checkoutItems.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">
              No items selected for checkout
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Please choose a digital product from our catalog before checking out.
            </p>
            <div className="mt-6">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
            {/* Left Form */}
            <form onSubmit={handleCompletePayment} className="lg:col-span-7 space-y-8">
              <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                <h3 className="font-heading font-black uppercase text-base tracking-widest text-black mb-6">
                  1. Customer Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                      Full Name *
                    </label>
                    <Input
                      placeholder="Narinder Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-neutral-300 focus:border-black focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                      Email Address (For File Delivery) *
                    </label>
                    <Input
                      type="email"
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-neutral-300 focus:border-black focus:ring-black"
                      required
                    />
                    <p className="text-xs text-neutral-400 mt-1">
                      Download links and order invoices will be sent to this address.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Gateway Selector */}
              <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-xs">
                <h3 className="font-heading font-black uppercase text-base tracking-widest text-black mb-6">
                  2. Select Payment Method
                </h3>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentGateway === "razorpay"
                        ? "border-black bg-neutral-100"
                        : "border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "razorpay"}
                        onChange={() => setPaymentGateway("razorpay")}
                        className="text-black focus:ring-black"
                      />
                      <div>
                        <div className="font-heading font-bold text-sm text-black">
                          Razorpay (India — UPI, Cards, NetBanking)
                        </div>
                        <div className="text-xs text-neutral-500">
                          Instant Google Pay, PhonePe, Paytm, or Credit/Debit Card
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-neutral-300 bg-white text-black">
                      INR Preferred
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentGateway === "stripe"
                        ? "border-black bg-neutral-100"
                        : "border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === "stripe"}
                        onChange={() => setPaymentGateway("stripe")}
                        className="text-black focus:ring-black"
                      />
                      <div>
                        <div className="font-heading font-bold text-sm text-black">
                          Stripe (International Cards & Apple Pay)
                        </div>
                        <div className="text-xs text-neutral-500">
                          Supports Visa, MasterCard, Amex, Apple Pay worldwide
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-neutral-300 bg-white text-black">
                      Global
                    </span>
                  </label>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 text-black focus:ring-black rounded"
                      required
                    />
                    <span>
                      I agree to the{" "}
                      <Link href="/terms" className="text-black underline font-bold" target="_blank">
                        Terms of Service
                      </Link>{" "}
                      and acknowledge the{" "}
                      <Link href="/refund-policy" className="text-black underline font-bold" target="_blank">
                        Refund Policy
                      </Link>{" "}
                      for digital goods.
                    </span>
                  </label>
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isProcessing}
                    disabled={!agreeTerms}
                    className="w-full text-xs font-bold uppercase tracking-widest"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Pay {formatPrice(totalAmount)} & Download
                  </Button>
                </div>
              </div>
            </form>

            {/* Right Summary */}
            <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 rounded-3xl p-8">
              <h3 className="font-heading font-black uppercase text-base tracking-widest text-black mb-6">
                Your Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start text-sm pb-4 border-b border-neutral-200">
                    <div>
                      <div className="font-black uppercase text-xs tracking-tight text-black">
                        {item.product.title}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        Qty: {item.quantity} • {item.product.fileFormat}
                      </div>
                    </div>
                    <span className="font-black text-sm text-black">
                      {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pb-4 border-b border-neutral-200 uppercase font-bold text-neutral-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black">{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Fulfillment</span>
                  <span className="text-black">Instant Free</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-baseline mb-8">
                <span className="font-heading font-black uppercase text-base text-black">
                  Total Due
                </span>
                <span className="font-heading font-black text-3xl text-black">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-2">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-black">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified 256-Bit Protection</span>
                </div>
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-black">
                  <Download className="w-4 h-4" />
                  <span>Time-Limited Encrypted URLs</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
          <Container>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Secure Checkout
            </h1>
            <p className="mt-2 text-xs uppercase tracking-wider text-neutral-400 font-bold">
              Complete your payment to receive instantaneous digital access.
            </p>
          </Container>
        </section>

        <Suspense fallback={<div className="p-12 text-center text-xs uppercase tracking-wider text-neutral-400">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
