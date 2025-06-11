
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
import WebsiteCopy from "./pages/WebsiteCopy";
import AdCopy from "./pages/AdCopy";
import EmailSequences from "./pages/EmailSequences";
import SocialContent from "./pages/SocialContent";

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/website-copy" element={<WebsiteCopy />} />
          <Route path="/ad-copy" element={<AdCopy />} />
          <Route path="/email-sequences" element={<EmailSequences />} />
          <Route path="/social-content" element={<SocialContent />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
