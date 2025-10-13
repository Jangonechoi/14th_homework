/**
 * URL 경로 관리 시스템
 *
 * 모든 URL 경로를 중앙에서 관리하며, 다이나믹 라우팅을 지원합니다.
 * Link 컴포넌트에서 사용할 수 있도록 설계되었습니다.
 */

// 접근 권한 타입
export type AccessType = "PUBLIC" | "AUTHENTICATED";

// 레이아웃 요소 가시성 인터페이스
export interface LayoutVisibility {
  header: boolean;
  logo: boolean;
  darkModeToggle: boolean;
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// URL 메타데이터 인터페이스
export interface UrlMeta {
  path: string;
  accessType: AccessType;
  visibility: LayoutVisibility;
}

// URL 경로 키 타입
export type UrlKey =
  | "LOGIN"
  | "SIGNUP"
  | "DIARIES"
  | "DIARY_DETAIL"
  | "PICTURES";

// URL 경로 상수
export const URLS: Record<UrlKey, UrlMeta> = {
  LOGIN: {
    path: "/auth/login",
    accessType: "PUBLIC",
    visibility: {
      header: false,
      logo: false,
      darkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  SIGNUP: {
    path: "/auth/signup",
    accessType: "PUBLIC",
    visibility: {
      header: false,
      logo: false,
      darkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  DIARIES: {
    path: "/diaries",
    accessType: "PUBLIC",
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  DIARY_DETAIL: {
    path: "/diaries/[id]",
    accessType: "AUTHENTICATED",
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  PICTURES: {
    path: "/pictures",
    accessType: "PUBLIC",
    visibility: {
      header: true,
      logo: true,
      darkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

// 유틸리티: URL 키 배열
export const URL_KEYS = Object.keys(URLS) as UrlKey[];

// 유틸리티: 다이나믹 경로 생성 함수
export const getDiaryDetailUrl = (id: string | number): string => {
  return `/diaries/${id}`;
};

// 유틸리티: 경로로 URL 메타데이터 가져오기
export const getUrlMetaByPath = (path: string): UrlMeta | undefined => {
  return Object.values(URLS).find((url) => {
    // 다이나믹 라우트 패턴 매칭 ([id] -> [^/]+)
    const pattern = url.path.replace(/\[.*?\]/g, "[^/]+");
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(path);
  });
};

// 유틸리티: 특정 URL의 접근 권한 확인
export const isAuthenticationRequired = (urlKey: UrlKey): boolean => {
  return URLS[urlKey].accessType === "AUTHENTICATED";
};

// 유틸리티: 레이아웃 요소 가시성 가져오기
export const getLayoutVisibility = (urlKey: UrlKey): LayoutVisibility => {
  return URLS[urlKey].visibility;
};

// 타입 가드: URL 키인지 확인
export const isUrlKey = (value: unknown): value is UrlKey => {
  return typeof value === "string" && value in URLS;
};

// 타입 가드: 접근 타입 확인
export const isAccessType = (value: unknown): value is AccessType => {
  return value === "PUBLIC" || value === "AUTHENTICATED";
};

export default URLS;
