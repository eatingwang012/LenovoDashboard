import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Download, Plus, Filter } from "lucide-react";

interface EquipmentFiltersProps {
  selectedDepartment: string;
  selectedCategory: string;
  selectedStatus: string;
  onDepartmentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddEquipment: () => void;
  onExport: () => void;
}

export function EquipmentFilters({
  selectedDepartment,
  selectedCategory,
  selectedStatus,
  onDepartmentChange,
  onCategoryChange,
  onStatusChange,
  onAddEquipment,
  onExport,
}: EquipmentFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm">筛选条件:</span>
      </div>
      
      <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="部门" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有部门</SelectItem>
          <SelectItem value="IT">IT部门</SelectItem>
          <SelectItem value="RH">人力资源部</SelectItem>
          <SelectItem value="Communication">行政/公关部</SelectItem>
          <SelectItem value="Direction">核心管理层</SelectItem>
          <SelectItem value="Digitalisation">数字化部</SelectItem>
          <SelectItem value="G50">运营部</SelectItem>
          <SelectItem value="Suivi - Evaluation">审计部</SelectItem>
          <SelectItem value="Chaîne de Valeurs">研发中心</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="品类" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有品类</SelectItem>
          <SelectItem value="Écrans">显示器</SelectItem>
          <SelectItem value="Souris">鼠标</SelectItem>
          <SelectItem value="Chaises">办公椅</SelectItem>
          <SelectItem value="Tables">办公桌</SelectItem>
          <SelectItem value="Imprimantes">打印机</SelectItem>
          <SelectItem value="Claviers">键盘</SelectItem>
          <SelectItem value="Ordinateurs">计算机/笔记本</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="设备状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">所有状态</SelectItem>
          <SelectItem value="OK">正常 (OK)</SelectItem>
          <SelectItem value="À réparer">维修中</SelectItem>
          <SelectItem value="Manquant">缺失</SelectItem>
          <SelectItem value="En commande">采购中</SelectItem>
        </SelectContent>
      </Select>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" onClick={onExport} className="gap-2">
          <Download className="h-4 w-4" />
          导出数据
        </Button>
        <Button onClick={onAddEquipment} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          新增设备
        </Button>
      </div>
    </div>
  );
}
