import { Pipe, PipeTransform, Type } from '@angular/core';



@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
  transform(array: any[], query: string): any[] {
    if (!array) return [];  // Kiểm tra null hoặc undefined
    if (!query) return array;  // Nếu không có query, trả về mảng gốc
    query = query.toLowerCase();
    return array.filter((row: { name: string }) => 
      row.name.toLowerCase().includes(query)
    );
  }
}