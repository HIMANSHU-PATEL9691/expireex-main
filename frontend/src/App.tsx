// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "@/context/CartContext";
// import Index from "./pages/Index";
// import Browse from "./pages/Browse";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Auth from "./pages/Auth";
// import SellerDashboard from "./pages/SellerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import NotFound from "./pages/NotFound";
// import ScrollToTop from "./components/ScrollToTop"; // adjust path if needed

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <CartProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//          <ScrollToTop />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/browse" element={<Browse />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/seller/dashboard" element={<SellerDashboard />} />
//             <Route path="/seller/register" element={<Auth />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/how-it-works" element={<Index />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";

import Index from "./pages/Index";
import Browse from "./pages/Browse";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin"; // ✅ IMPORTANT
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();


// 🔐 ADMIN PROTECTED ROUTE
const AdminProtected = ({ children }: any) => {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />

          <Routes>

            {/* 🌐 PUBLIC ROUTES */}
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/seller/register" element={<Auth />} />

            {/* 🏪 SELLER */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />

            {/* 👨‍💼 ADMIN FLOW */}
            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            />

            {/* OTHER */}
            <Route path="/how-it-works" element={<Index />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;