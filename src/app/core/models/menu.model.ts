import internal from "stream";

/**
 * Domain Menu: Thông tin menu về lĩnh vực
 */
export interface DomainMenu {
    id: string;
    phanHeID: string;
    dienGiai: string;
    link: string;
    image: string;
    linhVucID: string;
    nhom: string;
    isDelete:boolean;
    nguoi_Cap_Nhat: string;
    ngay_Cap_Nhat: Date;
    // Thêm các thuộc tính khác nếu cần
  }
  /**
 * Software Menu: Thông tin menu về phần mềm.
 * Mỗi Software Menu thuộc về một Domain Menu (qua thuộc tính domainId)
 */
export interface SoftwareMenu {
  id: number;
  phanHeID: string;
  dienGiai: string;
  link: string;
  image: string;
  linhVucID: string;
  nhom: string;
  isDelete: boolean;
  nguoiCapNhat: string;
  ngayCapNhat: Date;
  }
  /**
 * Function Menu: Thông tin menu chức năng của phần mềm.
 * Mỗi Function Menu thuộc về một Software Menu (qua thuộc tính softwareId)
 */


  export interface FunctionMenu {
    id: number;
    title: string;
    type: 'item' | 'collapse' | 'group';
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
    externals?: boolean;
    badge?: {
      title?: string;
      type?: string;
    };
    children?: FunctionMenu[];
    parent?: number;
  }
  