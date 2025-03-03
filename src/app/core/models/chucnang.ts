export interface Chucnang {
    id: number;
    title: string;
    type: string;
    icon: string;
    hidden: boolean;
    url: string;
    classes: string;
    externals: boolean;
    target: boolean;
    breadcrumbs: boolean;
    badgeTitle: string;
    badgeType: string;
    parentId: number;
    isDelete: boolean;
    nguoiCapNhat: string;
    ngayCapNhat: Date; // Giữ nguyên dạng chuỗi ISO 8601
    phanHeID: string;
  }
  