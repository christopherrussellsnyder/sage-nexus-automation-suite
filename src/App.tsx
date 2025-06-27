import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";
import AdCopy from "./pages/AdCopy";
import EmailSequences from "./pages/EmailSequences";
import SocialContent from "./pages/SocialContent";
import WebsiteCopy from "./pages/WebsiteCopy";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Pricing from "./pages/Pricing";
import NurtureSequences from '@/pages/NurtureSequences';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ad-copy" element={<AdCopy />} />
            <Route path="/email-sequences" element={<EmailSequences />} />
            <Route path="/social-content" element={<SocialContent />} />
            <Route path="/website-copy" element={<WebsiteCopy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/nurture-sequences" element={<NurtureSequences />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
