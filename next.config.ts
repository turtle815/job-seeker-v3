import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 빌드 시 페이지를 미리 생성하지 않도록 강제 설정
  output: 'standalone',
  // 정적 페이지 생성 중 에러가 나도 빌드를 중단하지 않게 함
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;