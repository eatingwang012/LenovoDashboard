import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Equipment } from "./EquipmentTable";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  Package, 
  Clock, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface AssignmentHistory {
  id: string;
  employee: {
    name: string;
    role: string;
    avatar: string;
  };
  department: string;
  startDate: string;
  endDate?: string;
  reason?: string;
  status: "active" | "completed";
}

interface EquipmentDetails extends Equipment {
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  warranty: string;
  location: string;
  supplier: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  assignmentHistory: AssignmentHistory[];
}

interface EquipmentDetailsDialogProps {
  equipment: EquipmentDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getStatusColor(status: Equipment["status"]) {
  switch (status) {
    case "OK":
      return "bg-green-100 text-green-700 border-green-200";
    case "À réparer":
      return "bg-red-100 text-red-700 border-red-200";
    case "Manquant":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "En commande":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    "Écrans": "bg-purple-100 text-purple-700 border-purple-200",
    "Souris": "bg-blue-100 text-blue-700 border-blue-200",
    "Chaises": "bg-orange-100 text-orange-700 border-orange-200",
    "Tables": "bg-teal-100 text-teal-700 border-teal-200",
    "Imprimantes": "bg-pink-100 text-pink-700 border-pink-200",
    "Claviers": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Ordinateurs": "bg-cyan-100 text-cyan-700 border-cyan-200",
  };
  return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
}

export function EquipmentDetailsDialog({
  equipment,
  open,
  onOpenChange,
}: EquipmentDetailsDialogProps) {
  if (!equipment) return null;

  const stockPercentage = (equipment.quantity / equipment.minThreshold) * 100;
  const isLowStock = stockPercentage < 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{equipment.name}</DialogTitle>
              <DialogDescription className="mt-2">
                Référence: {equipment.serialNumber}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={getCategoryColor(equipment.category)}>
                {equipment.category}
              </Badge>
              <Badge variant="outline" className={getStatusColor(equipment.status)}>
                {equipment.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Stock disponible</p>
                    <h3 className="mt-1">{equipment.quantity} unités</h3>
                    <Progress 
                      value={Math.min(stockPercentage, 100)} 
                      className={`mt-2 h-2 ${isLowStock ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Seuil minimum: {equipment.minThreshold}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Valeur totale</p>
                    <h3 className="mt-1">{(equipment.purchasePrice * equipment.quantity).toLocaleString('fr-FR')} €</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prix unitaire: {equipment.purchasePrice.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Détails de l'équipement */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-4">Détails de l'équipement</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date d'achat</p>
                    <p className="text-sm mt-0.5">{equipment.purchaseDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Garantie</p>
                    <p className="text-sm mt-0.5">{equipment.warranty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Localisation</p>
                    <p className="text-sm mt-0.5">{equipment.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fournisseur</p>
                    <p className="text-sm mt-0.5">{equipment.supplier}</p>
                  </div>
                </div>
              </div>

              {equipment.lastMaintenance && (
                <>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dernière maintenance</p>
                        <p className="text-sm mt-0.5">{equipment.lastMaintenance}</p>
                      </div>
                    </div>
                    {equipment.nextMaintenance && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Prochaine maintenance</p>
                          <p className="text-sm mt-0.5">{equipment.nextMaintenance}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Responsable actuel */}
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-4">Responsable actuel</h4>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={equipment.responsible.avatar} />
                  <AvatarFallback>{equipment.responsible.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4>{equipment.responsible.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{equipment.responsible.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {equipment.department}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Assigné actuellement
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique d'assignation */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4>Historique d'assignation</h4>
                <Badge variant="outline" className="text-xs">
                  {equipment.assignmentHistory.length} assignations
                </Badge>
              </div>
              
              <div className="space-y-4">
                {equipment.assignmentHistory.map((assignment, index) => (
                  <div key={assignment.id}>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={assignment.employee.avatar} />
                          <AvatarFallback>{assignment.employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {assignment.status === "active" && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm">{assignment.employee.name}</h4>
                            <p className="text-sm text-muted-foreground">{assignment.employee.role}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={assignment.status === "active" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {assignment.status === "active" ? "Actif" : "Terminé"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {assignment.department}
                          </Badge>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            {assignment.startDate}
                            {assignment.endDate && (
                              <>
                                <ArrowRight className="h-3 w-3 mx-1" />
                                {assignment.endDate}
                              </>
                            )}
                            {assignment.status === "active" && (
                              <>
                                <ArrowRight className="h-3 w-3 mx-1" />
                                <span className="text-green-600">Aujourd'hui</span>
                              </>
                            )}
                          </span>
                        </div>
                        
                        {assignment.reason && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {assignment.reason}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {index < equipment.assignmentHistory.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
