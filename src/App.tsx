
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import PremiumHome from "./screens/PremiumHome";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Onboarding from "./screens/Onboarding";
import DayScreen from "./screens/DayScreen";
import RitualScreen from "./screens/RitualScreen";
import MeditationScreen from "./screens/MeditationScreen";
import PlannerScreen from "./screens/PlannerScreen";
import DiaryScreen from "./screens/DiaryScreen";
import MessageScreen from "./screens/MessageScreen";
import ShopScreen from "./screens/ShopScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/premium" element={<PremiumHome />}/>
                <Route path="/day/:dayNumber" element={<DayScreen />}/>
                <Route path="/ritual" element={<RitualScreen />}/>
                <Route path="/meditation" element={<MeditationScreen />}/>
                <Route path="/planner" element={<PlannerScreen />}/>
                <Route path="/diary" element={<DiaryScreen />}/>
                <Route path="/messages" element={<MessageScreen />}/>
                <Route path="/shop" element={<ShopScreen />}/>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
