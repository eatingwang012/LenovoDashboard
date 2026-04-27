import { useState } from "react";
import { 
  TrendingUp, 
  BarChart3, 
  Users,
  PieChart,
  Zap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "./components/ui/sidebar";
import { Header } from "./components/Header";
import { ShipmentLandscapeView } from "./components/ShipmentLandscapeView";
import { MarketShareView } from "./components/MarketShareView";
import { ProductDataView } from "./components/ProductDataView";
import { ConsumerInsightsView } from "./components/ConsumerInsightsView";
import { MarketOutlookView } from "./components/MarketOutlookView";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const menuItems = [
  { icon: TrendingUp, label: "Shipment Landscape", id: "shipmentlandscape" },
  { icon: PieChart, label: "Market Share", id: "market-share" },
  { icon: BarChart3, label: "Product Data", id: "product-data" },
  { icon: Users, label: "Consumer Insights", id: "consumer-insights" },
  { icon: Zap, label: "Market Dynamics", id: "market-outlook" },
];

export default function App() {
  const [activeView, setActiveView] = useState("shipmentlandscape");

  const renderContent = () => {
    switch (activeView) {
      case "shipmentlandscape":
        return <ShipmentLandscapeView />;
      case "market-share":
        return <MarketShareView />;
      case "product-data":
        return <ProductDataView />;
      case "consumer-insights":
        return <ConsumerInsightsView />;
      case "market-outlook":
        return <MarketOutlookView />;
      default:
        return <ShipmentLandscapeView />;
    }
  };

  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex h-screen w-full overflow-hidden bg-gray-50">
          {/* Sidebar */}
          <Sidebar className="border-r bg-white">
            <SidebarContent>
              <div className="px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600">
                    <span className="font-bold text-white text-lg">L</span>
                  </div>
                  <div>
                    <h1 className="font-bold text-lg">Lenovo</h1>
                    <p className="text-xs text-muted-foreground">Laptop Analytics</p>
                  </div>
                </div>
              </div>

              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                          className="w-full"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">
              {renderContent()}
            </main>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </SidebarProvider>
  );
}
