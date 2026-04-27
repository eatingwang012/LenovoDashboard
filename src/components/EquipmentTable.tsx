import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface Equipment {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  department: string;
  responsible: {
    name: string;
    role: string;
    avatar: string;
  };
  status: "OK" | "À réparer" | "Manquant" | "En commande";
}

interface EquipmentTableProps {
  equipment: Equipment[];
  onViewDetails: (equipment: Equipment) => void;
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

export function EquipmentTable({ equipment, onViewDetails }: EquipmentTableProps) {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>设备名称</TableHead>
            <TableHead>品类</TableHead>
            <TableHead>数量 / 库存</TableHead>
            <TableHead>部门</TableHead>
            <TableHead>负责人</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => {
            const stockPercentage = (item.quantity / item.minThreshold) * 100;
            const isLowStock = stockPercentage < 100;
            
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    {isLowStock && item.status === "OK" && (
                      <span className="text-xs text-orange-600 mt-1 font-medium">⚠ 低库存警告</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getCategoryColor(item.category)}>
                    {item.category === "Écrans" ? "显示器" : 
                     item.category === "Souris" ? "鼠标" :
                     item.category === "Chaises" ? "电脑椅" :
                     item.category === "Tables" ? "办公桌" :
                     item.category === "Imprimantes" ? "打印机" :
                     item.category === "Claviers" ? "键盘" :
                     item.category === "Ordinateurs" ? "计算机" : item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{item.quantity}</span>
                      <span className="text-xs text-muted-foreground">/ 阈值 {item.minThreshold}</span>
                    </div>
                    <Progress 
                      value={Math.min(stockPercentage, 100)} 
                      className={`h-1.5 ${isLowStock ? '[&>div]:bg-orange-500' : '[&>div]:bg-green-500'}`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{item.department}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.responsible.avatar} />
                      <AvatarFallback>{item.responsible.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.responsible.name}</span>
                      <span className="text-xs text-muted-foreground">{item.responsible.role}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {item.status === "OK" ? "正常" : 
                     item.status === "À réparer" ? "维修中" :
                     item.status === "Manquant" ? "缺失" :
                     item.status === "En commande" ? "订购中" : item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(item)}>查看详情</DropdownMenuItem>
                      <DropdownMenuItem>编辑设备</DropdownMenuItem>
                      <DropdownMenuItem>指派负责人</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">删除设备</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
