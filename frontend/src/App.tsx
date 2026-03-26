import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import SellerProtected from "./components/SellerProtected.tsx";
import AdminProtected from "./components/AdminProtected.tsx";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/seller/register" element={<Auth />} />
                <Route path="/how-it-works" element={<Index />} />
                <Route path="/profile" element={<CustomerProfile />} />
                <Route path="/seller/dashboard" element={
                  <SellerProtected>
                    <SellerDashboard />
                  </SellerProtected>
                } />
                <Route path="/admin" element={
                  <AdminProtected>
                    <AdminDashboard />
                  </AdminProtected>
                } />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
